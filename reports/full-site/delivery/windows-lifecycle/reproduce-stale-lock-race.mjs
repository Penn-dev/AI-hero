import fs from 'node:fs';
import path from 'node:path';
import cp from 'node:child_process';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=path.dirname(new URL(import.meta.url).pathname);
const source=cp.execFileSync('git',['show','a367047032f52e36047f58d64fb2f394450a1c21:scripts/preview-start.mjs'],{cwd:'/workspace/shared/aihero-integration',encoding:'utf8'});
const acquire=source.slice(source.indexOf('function acquireStartLock()'),source.indexOf('\nfunction inspectPreview()'));
if(process.argv[2]==='child'){
 const id=process.argv[3],dir=process.argv[4],lockPath=path.join(dir,'preview-start.lock');
 const wait=p=>{const end=Date.now()+5000;while(!fs.existsSync(p)){if(Date.now()>end)throw Error('Barrier timeout '+p);Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,5);}};
 const instrumentedFs={...fs,rmSync(p){
   fs.writeFileSync(path.join(dir,id+'-read-stale'),'ready');
   wait(path.join(dir,id==='A'?'B-read-stale':'A-acquired'));
   fs.rmSync(p);
 }};
 const context={fs:instrumentedFs,lockPath,lockText:JSON.stringify({processId:process.pid,owner:id}),isProcessAlive:()=>false,Number,JSON,Error};
 vm.runInNewContext('let ownsLock=false;'+acquire+';acquireStartLock(); if(!ownsLock)throw Error("not owned");',context);
 fs.writeFileSync(path.join(dir,id+'-acquired'),'yes');
 console.log(JSON.stringify({owner:id,acquireReturned:true}));
}else{
 const dir=fs.mkdtempSync(path.join(root,'race-fixture-'));
 fs.writeFileSync(path.join(dir,'preview-start.lock'),JSON.stringify({processId:999999999,projectRoot:dir}));
 const results=await Promise.all(['A','B'].map(id=>new Promise(resolve=>{const c=cp.spawn(process.execPath,[new URL(import.meta.url).pathname,'child',id,dir]);let stdout='',stderr='';c.stdout.on('data',x=>stdout+=x);c.stderr.on('data',x=>stderr+=x);c.on('close',code=>resolve({id,code,stdout,stderr}));})));
 assert.ok(results.every(x=>x.code===0));
 const finalLock=JSON.parse(fs.readFileSync(path.join(dir,'preview-start.lock'),'utf8'));assert.equal(finalLock.owner,'B');
 const report={candidate:'a367047032f52e36047f58d64fb2f394450a1c21',method:'Exact fixed acquireStartLock function in two actual Node processes. Filesystem rmSync is paused at deterministic barriers solely to expose the valid A/B interleaving; no application process was started or killed.',results,finalLock,problem:'Both processes returned ownsLock=true; B removed the live lock A had just acquired.'};
 fs.writeFileSync(path.join(root,'stale-lock-race-red.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report,null,2));fs.rmSync(dir,{recursive:true,force:true});
}
