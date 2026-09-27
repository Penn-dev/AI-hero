import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '../..');
const fields = ['input_tokens','cached_input_tokens','output_tokens','reasoning_output_tokens','total_tokens'];
const hash = x => createHash('sha256').update(x).digest('hex');
const equal = (a,b) => fields.every(f=>a?.[f]===b?.[f]);
const zero = () => Object.fromEntries(fields.map(f=>[f,0]));
function valid(u) { return u && fields.every(f=>Number.isSafeInteger(u[f])&&u[f]>=0) && u.cached_input_tokens<=u.input_tokens && u.reasoning_output_tokens<=u.output_tokens && u.total_tokens===u.input_tokens+u.output_tokens; }

// Only accounting events, context metadata, and turn boundaries are retained.
// Message and tool-output contents never enter the returned evidence.
export function collect(text, registration) {
  const turns = new Map(), seen = new Map(), errors = [];
  let sessionId, lastThreadTotal;
  const get = id => { if(!turns.has(id)) turns.set(id,{turnId:id,requests:[],usage:zero(),started:null,completed:null,model:null,effort:null,issues:[]}); return turns.get(id); };
  for (const [i,line] of text.split('\n').entries()) {
    if (!/"type"\s*:\s*"(?:session_meta|turn_context|token_usage_record|event_msg)"/.test(line)) continue;
    let e; try { e=JSON.parse(line); } catch { continue; }
    const p=e.payload;
    if(e.type==='session_meta') sessionId=p.id;
    if(e.type==='turn_context') Object.assign(get(p.turn_id),{model:p.model??null,effort:p.effort??null});
    if(e.type==='event_msg' && ['task_started','task_complete'].includes(p?.type)) get(p.turn_id)[p.type==='task_started'?'started':'completed']={line:i+1,timestamp:e.timestamp};
    if(e.type!=='token_usage_record') continue;
    if(p.thread_id!==registration.threadId || !p.turn_id || !p.response_id) {errors.push(`identity mismatch at ${i+1}`);continue;}
    const signature=JSON.stringify(p.usage);
    if(seen.has(p.response_id)) { if(seen.get(p.response_id)!==signature) errors.push(`conflicting duplicate ${p.response_id}`); continue; }
    seen.set(p.response_id,signature);
    const t=get(p.turn_id);
    if(!valid(p.usage)||!valid(p.turn_token_usage)||!valid(p.thread_token_usage)){t.issues.push(`invalid usage ${i+1}`);continue;}
    for(const f of fields)t.usage[f]+=p.usage[f];
    if(!equal(t.usage,p.turn_token_usage)) t.issues.push(`turn sum mismatch/reset/missing record at ${i+1}`);
    if(lastThreadTotal && fields.some(f=>p.thread_token_usage[f]<lastThreadTotal[f])) errors.push(`thread counter reset at ${i+1}`);
    lastThreadTotal=p.thread_token_usage;
    t.requests.push({responseId:p.response_id,line:i+1,timestamp:e.timestamp,usage:Object.fromEntries(fields.map(f=>[f,p.usage[f]])),recordSha256:hash(line)});
  }
  if(sessionId!==registration.threadId) errors.push('session identity mismatch');
  const rows=[...turns.values()].filter(t=>t.requests.length).map(t=>{
    const label=registration.turns?.[t.turnId]??{stage:'unmapped',batch:null};
    const end=t.requests.at(-1);
    const complete=!!t.started&&!!t.completed&&t.started.line<t.requests[0].line&&end.line<t.completed.line;
    return {...t,...label,threadId:registration.threadId,sourceAssetSnapshot:label.sourceAssetSnapshot??registration.sourceAssetSnapshot??null,assetLinkage:'retrospective stage association; request telemetry does not attest which file bytes were read',articleAllocation:'batch only unless explicitly separated into distinct turns',failures:null,retries:null,failureRetryNote:'usage records include metered responses; unmetered transport failures/retries unknown, supplement stage self-report',status:t.issues.length||errors.length?'HOLD':complete?'MEASURED_COMPLETED_TURN':'PARTIAL_ACTIVE_TURN',modelEffortVerified:!!t.model&&!!t.effort,acceptanceStatus:'usage verified only; content acceptance recorded separately'};
  });
  const sum=zero();for(const row of rows)for(const f of fields)sum[f]+=row.usage[f];
  if(lastThreadTotal&&!equal(sum,lastThreadTotal))errors.push('request sum differs from last thread cumulative counter');
  return {threadId:registration.threadId,status:errors.length||rows.some(r=>r.issues.length)?'HOLD':'PASS',errors,rows,recordCount:seen.size,lastObservedThreadUsage:lastThreadTotal??null,method:'deduplicated response usage; each running sum checked against turn cumulative, final sum checked against thread cumulative; cumulative snapshots never added',scope:'Local recorded usage, not billing reconciliation. No per-article split within a turn; no cross-reset subtraction.'};
}
async function main() {
  const registry=JSON.parse(await readFile(resolve(root,'reports/flow-validation/preparation/telemetry-registry.json'),'utf8'));
  const result={version:1,checkedAt:new Date().toISOString(),method: 'Extends existing measure-special-agent-usage.mjs final snapshot logic with per-response IDs and turn-boundary reconciliation.',sessions:[]};
  for(const registration of registry.registrations){const raw=await readFile(registration.rolloutPath,'utf8');result.sessions.push({...collect(raw,registration),rolloutPath:registration.rolloutPath,observedFileSha256:hash(raw)});}
  result.status=result.sessions.every(s=>s.status==='PASS'&&s.rows.some(r=>r.status==='MEASURED_COMPLETED_TURN'&&r.modelEffortVerified))?'PASS':'HOLD';
  if(process.argv.includes('--write'))await writeFile(resolve(root,'reports/flow-validation/preparation/usage-evidence.json'),JSON.stringify(result,null,2)+'\n','utf8');
  console.log(JSON.stringify(process.argv.includes('--full')?result:{status:result.status,sessions:result.sessions.map(s=>({threadId:s.threadId,status:s.status,rows:s.rows.map(({requests,...r})=>({...r,requestCount:requests.length}))}))},null,2));
}
if(import.meta.url===pathToFileURL(process.argv[1]).href)await main();
