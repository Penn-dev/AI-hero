import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
const root=resolve(import.meta.dirname,'../..');
const common='content/pilots/flow-validation/inputs/common/';
const read=p=>readFile(resolve(root,p),'utf8');
const json=async p=>JSON.parse(await read(p));
const assert=(ok,msg)=>{if(!ok)throw Error(msg);};
export function schemaCheck(value,schema,path='$'){
 if(schema.anyOf){assert(schema.anyOf.some(s=>{try{schemaCheck(value,s,path);return true;}catch{return false;}}),`${path}: no allowed shape`);return;}
 if(schema.enum)assert(schema.enum.includes(value),`${path}: enum`);
 const type=value===null?'null':Array.isArray(value)?'array':typeof value;
 const fits=t=>t==='integer'?Number.isInteger(value):t===type;
 if(schema.type)assert([schema.type].flat().some(fits),`${path}: type`);
 if(schema.minLength)assert(value.length>=schema.minLength,`${path}: empty`);
 if(schema.minimum!==undefined)assert(value>=schema.minimum,`${path}: below minimum`);
 if(type==='array')for(const [i,v]of value.entries())schemaCheck(v,schema.items,`${path}[${i}]`);
 if(type==='object'){
  for(const k of schema.required??[])assert(Object.hasOwn(value,k),`${path}: missing ${k}`);
  for(const [k,v]of Object.entries(value)){if(schema.properties?.[k])schemaCheck(v,schema.properties[k],`${path}.${k}`);else if(schema.additionalProperties===false)throw Error(`${path}: extra ${k}`);else if(typeof schema.additionalProperties==='object')schemaCheck(v,schema.additionalProperties,`${path}.${k}`);}
 }
}
function parts(raw){const m=raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);assert(m,'Missing frontmatter');return {meta:m[1],body:raw.slice(m[0].length)};}
function ast(raw){const nodes=unified().use(remarkParse).use(remarkGfm).use(remarkMdx).parse(raw);const result={code:[],inline:[],links:[]};function visit(n){if(n.type==='code')result.code.push(raw.slice(n.position.start.offset,n.position.end.offset));if(n.type==='inlineCode')result.inline.push(n.value);if(['link','image'].includes(n.type))result.links.push(n.url);n.children?.forEach(visit);}visit(nodes);return result;}
export function checkBody(source,body){
 const a=parts(source),b=parts(body),sa=ast(a.body),sb=ast(b.body);
 for(const key of ['slug','type','updatedAt']){const rx=new RegExp(`^${key}:.*$`,'m');assert(a.meta.match(rx)?.[0]===b.meta.match(rx)?.[0],`Frontmatter changed ${key}`);}
 const tags=s=>s.match(/^tags:\s*\n(?:[ \t]+-.*\n?)*/m)?.[0]??'';assert(tags(a.meta)===tags(b.meta),'Tags changed');
 assert(JSON.stringify(sa.code)===JSON.stringify(sb.code),'Original fenced examples changed');
 assert(JSON.stringify(sa.inline)===JSON.stringify(sb.inline),'Original inline code changed');
 const available=[...sb.links];for(const link of sa.links){const i=available.indexOf(link);assert(i>=0,`Original learning link missing ${link}`);available.splice(i,1);}
 for(const line of a.body.split('\n').filter(s=>/^".+"$/.test(s)))assert(b.body.includes(line),'Original natural language example missing');
 assert(!body.includes('## 中文学习辅助：术语小词典'),'Glossary must be separate');
}
export async function validateStage(route,stage){
 assert(['A','B'].includes(route)&&['draft','edited'].includes(stage),'Exact route/stage required');
 const contract=await json(common+'contract.json');const dir=`content/pilots/flow-validation/${route}/${stage}/`;
 const record=await json(dir+'stage.json');schemaCheck(record,await json(common+'stage.schema.json'));
 assert(record.route===route&&record.stage===stage,'Record ownership mismatch');
 assert(record.model===(stage==='draft'?'gpt-5.6-terra':'gpt-5.6-sol'),'Recorded model mismatch');
 assert(JSON.stringify(record.articles.map(a=>a.key))===JSON.stringify(contract.order),'Article order/coverage mismatch');
 const usage=record.usage;for(const k of ['input','cachedInput','output','reasoning','total','failures','retries'])assert(usage[k]===null||usage[k]>=0,'Negative usage');
 if(usage.input!==null&&usage.output!==null&&usage.total!==null)assert(usage.total===usage.input+usage.output,'Double-counted usage');
 if(usage.cachedInput!==null&&usage.input!==null)assert(usage.cachedInput<=usage.input,'Cached input subset');
 if(usage.reasoning!==null&&usage.output!==null)assert(usage.reasoning<=usage.output,'Reasoning subset');
 for(const s of contract.samples){
  const r=record.articles.find(a=>a.key===s.key);
  assert(JSON.stringify(r.quality.map(q=>q.dimension))===JSON.stringify(contract.qualityDimensions),'Quality dimensions/order mismatch');
  if(s.status==='HOLD'){
   assert(r.status==='HOLD','HOLD sample executed');
   for(const suffix of ['.md','.learning.json']){let exists=true;try{await access(resolve(root,dir+s.key+suffix));}catch{exists=false;}assert(!exists,'Unexpected HOLD article output');}
   continue;
  }
  const body=await read(dir+s.key+'.md'),source=await read(s.file),a=await json(dir+s.key+'.learning.json');
  checkBody(source,body);schemaCheck(a,await json(common+'learning.schema.json'));
  assert(a.articleId===s.id&&a.kind===s.kind,'Article identity mismatch');
  assert(s.kind==='dictionary'?a.check===null:a.check!==null,'Type-specific completion check');
  const ids=a.glossary.map(g=>g.id);assert(new Set(ids).size===ids.length,'Duplicate glossary IDs');
  assert(a.prerequisiteIds.every(id=>ids.includes(id)),'Unknown prerequisite');
  for(const e of a.explanations){const {start,end}=e.afterSource;const lines=source.split(/\r?\n/);assert(end>=start&&end<=lines.length,'Explanation source range');const anchor=lines.slice(start-1,end).join('\n');assert(anchor.trim()&&body.includes(anchor),'Explanation anchor must be original preserved block or example');}
 }
 return {status:'PASS',route,stage,semanticApproval:false,limits:'Checks structure, original examples/links, metadata, anchors and bookkeeping; no translation, teaching, runtime or final-page approval.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)console.log(JSON.stringify(await validateStage(process.argv[2],process.argv[3]),null,2));
