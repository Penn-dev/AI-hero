import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash, randomInt } from 'node:crypto';
const root=resolve(import.meta.dirname,'../..');
const report='reports/flow-validation/acceptance/';
const hash=x=>createHash('sha256').update(x).digest('hex');
const read=p=>readFile(resolve(root,p),'utf8');
const expected={
 A:['5a717b994fbf78fe18b1b2d2922c0767d5ffcab85883427090a1cdc781c6c09e','65ace7fd49e410bc5b58b17331d2995c2d07a469874b50903e0908fb0ddd9479','8e1a6756878557c4bb85acb816738dfe6b68dd7cf328f6c6926d84ab119139ad'],
 B:['0886f5e2d49fbe1ba9631d7c1e74547591a2f9ed058179a028684101d02a8fec','bac9aabc3ac716e457ced4228f45ab1472ff30facd0eaebd1d8b13c66ade8b91','a8031d13cfd6cfd99063d96067ddce70c528a3c7e55131f737a554ba85928012'],
};
await mkdir(resolve(root,report),{recursive:true});
let mapping;try{mapping=JSON.parse(await read(report+'route-mapping.private.json'));}catch(e){if(e.code!=='ENOENT')throw e;mapping=randomInt(2)?{X:'A',Y:'B'}:{X:'B',Y:'A'};await writeFile(resolve(root,report+'route-mapping.private.json'),JSON.stringify(mapping,null,2)+'\n');}
const source=await read('content/pilots/flow-validation/inputs/common/dictionary.md');
const sourceLines=source.split(/\r?\n/),pages={},checks=[];
for(const [label,route] of Object.entries(mapping)){
 const files=['dictionary.md','dictionary.learning.json','stage.json'];
 const texts=[];for(const [i,file]of files.entries()){const path=`content/pilots/flow-validation/${route}/edited/${file}`,text=await read(path);if(hash(text)!==expected[route][i])throw Error('Edited artifact hash drift');texts.push(text);checks.push({path,sha256:hash(text),unchanged:true});}
 const [raw,learning]=texts;const aid=JSON.parse(learning);
 const fm=raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);if(!fm)throw Error('Frontmatter missing');
 const field=name=>{const match=fm[1].match(new RegExp(`^${name}:\\s*(.+)$`,'m'));if(!match)throw Error(`Missing ${name}`);return JSON.parse(match[1]);};
 const originalBody=raw.slice(fm[0].length);let markdown=originalBody;
 const insertions=[];
 for(const e of aid.explanations){const {start,end}=e.afterSource;const anchor=sourceLines.slice(start-1,end).join('\n');const at=originalBody.indexOf(anchor);if(!anchor||at<0||at!==originalBody.lastIndexOf(anchor))throw Error('Missing/ambiguous explanation anchor');insertions.push({offset:at+anchor.length,text:'\n\n'+e.markdown});}
 if(new Set(insertions.map(e=>e.offset)).size!==insertions.length)throw Error('Duplicate explanation anchor');
 for(const i of [...insertions].sort((a,b)=>b.offset-a.offset))markdown=markdown.slice(0,i.offset)+i.text+markdown.slice(i.offset);
 let recovered=markdown;for(const i of insertions){const count=recovered.split(i.text).length-1;if(count!==1)throw Error('Explanation duplicate');recovered=recovered.replace(i.text,'');}if(recovered!==originalBody)throw Error('Body changed by assembly');
 if(aid.kind!=='dictionary'||aid.check!==null)throw Error('Dictionary only');
 pages[label]={label,title:field('title'),description:field('description'),updatedAt:field('updatedAt'),markdown,learning:aid};
}
const out='content/pilots/flow-validation/rendered/pages.json';await mkdir(resolve(root,out,'..'),{recursive:true});
const bytes=JSON.stringify(pages,null,2)+'\n';if(process.argv.includes('--check')){if(await read(out)!==bytes)throw Error('Rendered data drift');}else await writeFile(resolve(root,out),bytes,'utf8');
await writeFile(resolve(root,report+'assembly-validation.json'),JSON.stringify({status:'PASS',checks,renderedSha256:hash(bytes),anchors:'unique original ranges; inserted each explanation once; removing insertions recovers body exactly',semanticApproval:false,glossaryPolicy:'term/aliases/definition preserved without enrichment; missing aliases may limit inline discovery',workshop:'HOLD; no artifact read or produced'},null,2)+'\n');
console.log('Anonymous dictionary assembly and six edited hashes PASS; route mapping saved privately.');
