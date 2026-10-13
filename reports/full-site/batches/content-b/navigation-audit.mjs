import fs from 'node:fs';
import {parseMarkdown,nodes} from '../../../../scripts/lib/page-content.mjs';
const manifest=JSON.parse(fs.readFileSync('content/source/manifest.json','utf8'));const known=new Map(manifest.pages.map(p=>[p.route,p]));
const root='reports/full-site/batches/content-b'; const findings=[];
const pathname=u=>{try{let x=new URL(u,'https://www.aihero.dev');return x.pathname==='/'?'/':x.pathname.replace(/\/$/,'')}catch{return null}};
for(const dir of fs.readdirSync(root).filter(x=>/^batch-\d+$/.test(x)).sort())for(const file of fs.readdirSync(`${root}/${dir}/configs`).sort()){
 const configPath=`${root}/${dir}/configs/${file}`;const c=JSON.parse(fs.readFileSync(configPath));const t=fs.readFileSync(c.chineseFile,'utf8');const tree=parseMarkdown(t);
 const links=nodes(tree,n=>n.type==='link');const local=new Set(links.filter(n=>n.url.startsWith('/')&&!n.url.startsWith('//')).map(n=>pathname(n.url)));
 const missing=new Map();for(const n of links){let u;try{u=new URL(n.url)}catch{continue}if(!['aihero.dev','www.aihero.dev'].includes(u.hostname))continue;let r=pathname(n.url);if(r===c.route||!known.has(r)||local.has(r))continue;if(!missing.has(r))missing.set(r,{route:r,url:n.url,localUrl:u.pathname+u.search+u.hash,label:nodes(n,x=>x.type==='text'||x.type==='inlineCode').map(x=>x.value).join('')});}
 if(missing.size)findings.push({batch:dir,route:c.route,configPath,draft:c.chineseFile,missing:[...missing.values()]});
}
console.log(JSON.stringify(findings,null,2));
