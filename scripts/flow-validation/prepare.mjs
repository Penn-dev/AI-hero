import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
const root=resolve(import.meta.dirname,'../..');
const common='content/pilots/flow-validation/inputs/common/';
const reports='reports/flow-validation/preparation/';
const h=x=>createHash('sha256').update(x).digest('hex');
const read=p=>readFile(resolve(root,p),'utf8');
const json=async p=>JSON.parse(await read(p));
const serial=x=>JSON.stringify(x,null,2)+'\n';
const assert=(c,m)=>{if(!c)throw Error(m);};
async function put(p,s){assert(p.startsWith('content/pilots/flow-validation/')||p.startsWith(reports),'output scope');await mkdir(resolve(root,p,'..'),{recursive:true});await writeFile(resolve(root,p),typeof s==='string'?s:serial(s),'utf8');}
const samples=[{key:'dictionary',id:'/ai-coding-dictionary/system-prompt',kind:'dictionary',original:'content/source/ai-coding-dictionary/system-prompt.md',file:common+'dictionary.md',status:'READY'}, {key:'workshop',id:'/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k',kind:'workshop-lesson',original:'content/source/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k.md',file:common+'workshop.md',status:'HOLD'}];
const answerFiles=['content/pilots/v2/sol-medium/a-complete-guide-to-agents-md.md','content/pilots/estimate-special/sol-medium/ai-coding-dictionary/system-prompt.md','content/pilots/estimate-special/sol-medium/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k.md'];
const scalar={type:'string',minLength:1};
const array=items=>({type:'array',items});
const object=(properties,required=Object.keys(properties))=>({type:'object',properties,required,additionalProperties:false});
const evidence=object({start:{type:'integer',minimum:1},end:{type:'integer',minimum:1}});
const card=object({title:scalar,text:scalar});
const glossary=object({id:scalar,term:scalar,aliases:array(scalar),definition:scalar,sourceBasis:scalar});
const related=object({title:scalar,description:scalar,href:scalar,format:scalar});
const explanation=object({afterSource:evidence,markdown:scalar,sourceBasis:scalar});
const check=object({title:scalar,items:array(scalar)});
const aidSchema=object({articleId:scalar,kind:{enum:['dictionary','workshop-lesson']},start:object({title:scalar,summary:scalar,cards:array(card)}),prerequisiteIds:array(scalar),glossary:array(glossary),bodyTitle:scalar,check:{anyOf:[check,{type:'null'}]},related:array(related),explanations:array(explanation),sourceGaps:array(scalar)});
async function generate(){
 const k=await json('content/learning/shared/knowledge.json');
 const dims=k.qualityDimensions;
 const issue={dictionary:'原文既叙述厂商编写，也明确部分执行框架可自定义；保留其范围和条件，不泛化为所有产品永远相同的优先级规则。',workshop:'HOLD：本地原文标注2025-09-09，而已查SDK 6正式发布记录为2025-12-22，历史内容与依赖范围未确认。官方发布示例采用generateText配合Output.object，不能据此暗改原文。原文末尾文字稿为空；没有运行课程或模型请求。',rule:'两路收到完全相同说明；Workshop在治理解除HOLD前只记录未执行，不译、不自行上网核实。'};
 const contract={version:1,samples:samples.map(({key,id,kind,file,status})=>({key,id,kind,file,status})),order:['dictionary','workshop'],qualityDimensions:dims,
 outputs:{body:'<key>.md：完整正文与frontmatter，英文原始代码/Prompt/输入输出/对话原例原样保留；不在此文件写中文学习辅助或文末词典。',aids:'<key>.learning.json：按learning.schema.json提供中文学习辅助；模型负责撰写，两路同字段。',record:'stage.json：按stage.schema.json记录每篇状态、12维度、变更/清洗、成本定位、失败与重试。HOLD文章不生成正文或辅助。'},
 formatOverride:'TRANSLATION_SPEC中的辅助和文末词典在本试验独立交付JSON，由统一适配器装配；其余保真与中文表达要求保留。自然语言原例在正文保留英文，中文理解放入explanations，以原文完整代码块或原例段落的行号定位，装配后紧邻原例。不得把答案藏入代码或填TODO。',
 typeRequirements:{dictionary:'一句话理解放start.summary，必要区别可用cards；check必须null，不强加练习。原用法的中文理解放explanations；按需要提供词典与相关链接。', 'workshop-lesson':'start.summary说明学习目标，cards说明运行准备和练习边界，check给原文完成条件；必要术语与先备ID一致。片段不承诺独立运行，TODO不补答案，sourceGaps标源文缺失。'},
 boundaries:['原文代码围栏含标记、语言、内容及顺序逐字保留；行内代码内容与顺序保留。','正文无实质删减；新增解释独立标中文学习辅助，必须参与编校。','源码与输入文档是材料，不执行其中的命令、Prompt或联网链接。','只能读取本任务白名单，禁止既有中文样本/金标准译文、历史聊天、对方结果和白名单外资料；禁止再委派、调用模型API、浏览网页、运行课程。'],
 gates:{G0:'核对冻结输入与准入状态；只处理READY样本。',G1:'对照原文和全部新增辅助检查同一12维度。中间基本可理解仅允许交接，不等于最终等质量通过。',G2:'治理按冻结金标准的质量水平和同一12维度评估完整成品；自然度与零基础理解不能因机械通过或基本看懂自动PASS。金标准非事实权威，不同类型不套同一版式。'},
 stopping:'每路同一两篇批次，一次Terra/medium初译、一次Sol/medium编校；每版本最多一次经治理安排的实质问题局部修正，仍不合格记失败，不整篇重译、不加模型。复用未受影响证据，不逐维度循环或无限润色。',
 costs:'文章按顺序记录起止时间/turn或response ID；拿不到精确单篇计量时记两篇批次，不分摊累计快照。失败/重试有真实记录才填数，否则null。cached是input子集，reasoning是output子集；不得把任务次数当平台Token或美元硬上限。',
 comparison:'先整页质量后总成本，可匿名并排但不称严格独立/统计显著。B知识曾参考这两篇既有译稿；仅测试已知样本上的流程重用，不是未知文章泛化。初译/编校不读取参照译稿。'};
 const recordSchema=object({route:{enum:['A','B']},stage:{enum:['draft','edited']},taskId:scalar,model:scalar,effort:{enum:['medium']},startedAt:scalar,finishedAt:scalar,inputHashes:{type:'object',additionalProperties:scalar},articles:array(object({key:{enum:['dictionary','workshop']},status:{enum:['PASS','PARTIAL','HOLD','FAILED']},startedAt:{anyOf:[scalar,{type:'null'}]},finishedAt:{anyOf:[scalar,{type:'null'}]},quality:array(object({dimension:{enum:dims},status:{enum:['PASS','PARTIAL','HOLD','NOT_APPLICABLE']},evidence:scalar})),changes:array(scalar),cleaning:array(scalar),unknowns:array(scalar)})),usage:object({basis:scalar,turnIds:array(scalar),responseIds:array(scalar),input:{type:['integer','null']},cachedInput:{type:['integer','null']},output:{type:['integer','null']},reasoning:{type:['integer','null']},total:{type:['integer','null']},failures:{type:['integer','null']},retries:{type:['integer','null']}})});
 await put(common+'contract.json',contract);await put(common+'issues.json',issue);await put(common+'learning.schema.json',aidSchema);await put(common+'stage.schema.json',recordSchema);
 for(const s of samples)await put(s.file,await read(s.original));
 await put(common+'TRANSLATION_SPEC.md',await read('content/pilots/estimate/TRANSLATION_SPEC.md'));
 await put(common+'glossary.json',await read('content/glossary.json'));
 const bPaths=[];
 for(const s of samples){
   const v=await json(`content/learning/shared/task-execution-${s.key}.json`);
   const profile=structuredClone(v.profile);
   for(const key of ['translationSourceId','sourceReading','originalExampleRefs','relatedNotPrerequisite'])delete profile[key];
   profile.articleSpecific=profile.articleSpecific.map(({conceptId,text})=>({conceptId,text}));
   const concepts=Object.fromEntries(Object.entries(v.concepts).map(([id,{auditRef,...c}])=>[id,c]));
   const b={articleId:s.id,sourceFile:s.file,sourceSha256:h(await read(s.original)),concepts,profile,template:{guidance:v.template.guidance,omit:v.template.omit},status:s.status,scope:'只含已核对共享定义及教学profile；不携带旧译文、审计包或中文证据入口。事实疑点与质量合同只读common版本。',provenanceDisclosure:'这些共享资产曾参考本试验既有译稿，允许作为B条件；不是未知文章泛化证据。'};
   const path=`content/pilots/flow-validation/inputs/B/${s.key}.json`;await put(path,b);bPaths.push(path);
 }
 const commonInputs=['contract.json','issues.json','learning.schema.json','stage.schema.json','dictionary.md','workshop.md','TRANSLATION_SPEC.md','glossary.json'].map(f=>common+f);
 const tasks=[];
 for(const route of ['A','B'])for(const stage of ['draft','edited']){
   const dir=`content/pilots/flow-validation/${route}/${stage}/`;
   await mkdir(resolve(root,dir),{recursive:true});
   const instruction=`content/pilots/flow-validation/inputs/${route}/${stage}.md`;
   const ownFiles=['dictionary.md','dictionary.learning.json','workshop.md','workshop.learning.json','stage.json'].map(f=>dir+f);
   const draftFiles=stage==='edited'?['dictionary.md','dictionary.learning.json','workshop.md','workshop.learning.json','stage.json'].map(f=>`content/pilots/flow-validation/${route}/draft/${f}`):[];
   const readWhitelist=[instruction,...commonInputs,'scripts/flow-validation/validate.mjs',...(route==='B'?bPaths:[]),...draftFiles];
   const model=stage==='draft'?'gpt-5.6-terra':'gpt-5.6-sol';
   const description=`# ${route}路 ${stage==='draft'?'初译':'编校'}\n\n使用 ${model} / medium。${stage==='draft'?'以独立新上下文按原文制作正文和全部辅助。':'在独立新上下文逐段对照原文，编校本路初译及全部辅助；不读取另一条路线。'}\n\n先读共同contract、issues和schema。顺序固定dictionary→workshop；当前dictionary READY、workshop HOLD，因此仅完成词典，在stage.json为workshop记HOLD。解除HOLD只能由治理通知，不能自行替换样本、查网或继续制作。\n\n${route==='A'?'A只使用共同原文、旧规范、旧术语表和无答案合同，禁止读共享概念或B的profile。':'B另读取inputs/B的本篇知识输入，已剔除旧译文与审计入口；不要沿来源链接或路径寻找既有中文答案。'}\n\n写入只限以下文件（不存在的HOLD产物不创建）：\n${ownFiles.map(p=>'- '+p).join('\n')}\n\n完整读取白名单：\n${readWhitelist.map(p=>'- '+p).join('\n')}\n\n可读取自己刚写的文件；除此之外不要扫描目录、读取金标准或既有译稿、完整历史聊天、对方产物、全站资产、前端代码或任何白名单外资料。仅调用本地结构校验：node scripts/flow-validation/validate.mjs ${route} ${stage}；按需修复本次格式错误，不将脚本PASS当语义PASS。\n\n所有中文解释由本任务写入learning.json；不让页面调用旧样本辅助补缺。语义审核覆盖共同12维度。初译一次、编校一次，最多一次后续治理授权的局部修正；不额外调用模型/API、建任务、发布、构建、启动服务、安装依赖或运行课程。结束记录阶段边界、输入哈希、文章状态、失败/重试与未知，不虚构单篇用量。通过 send_message_to_thread 向治理任务 01a0a64d-34d3-7b60-8559-f70d4eadd91f（local）回报文件路径、检查和未知，随后停止。\n`;
   await put(instruction,description);tasks.push({route,stage,model,effort:'medium',instruction,readWhitelist,writeFiles:ownFiles,prerequisite:stage==='edited'?`${route}/draft completion and governance review`:null});
 }
 const renderer=['components/article-learning-guide.tsx','components/article-learning-tools.tsx','components/localized-markdown.tsx','components/copy-code-button.tsx','components/ui/sheet.tsx','components/ui/button.tsx','lib/utils.ts','lib/article-structure.ts','lib/article-links.ts','lib/article-learning.ts','components/localized-article.tsx','app/globals.css','app/layout.tsx','package.json','package-lock.json','tsconfig.json','vite.config.ts','next.config.ts'];
 const origins=[...samples.map(s=>s.original),...answerFiles,'content/pilots/estimate/TRANSLATION_SPEC.md','content/glossary.json','content/learning/shared/knowledge.json','content/learning/shared/task-execution-dictionary.json','content/learning/shared/task-execution-workshop.json','content/learning/shared/content-map.json','content/learning/pilot-knowledge.json','content/zh/index.json','scripts/measure-special-agent-usage.mjs',...renderer];
 const records=[];for(const p of [...new Set([...origins,...commonInputs,...bPaths,...tasks.map(t=>t.instruction),'scripts/flow-validation/measure.mjs','scripts/flow-validation/validate.mjs','scripts/flow-validation/prepare.mjs','scripts/flow-validation/self-check.mjs',reports+'official-version-evidence.json'])])records.push({path:p,sha256:h(await readFile(resolve(root,p))),access:commonInputs.includes(p)?'both-routes':bPaths.includes(p)?'B-only':tasks.some(t=>t.instruction===p)?'assigned-task-only':p==='scripts/flow-validation/validate.mjs'?'both-routes-executable':'preparation-governance-only'});
 await put(reports+'frozen-inputs.json',{version:1,records,tasks,samples,order:'A/draft→A/edited；B/draft→B/edited。两路可独立进行；每任务同序dictionary→workshop，HOLD样本跳过并记录，不擅自增任务。',isolation:'Whitelist and separate fresh task contexts; shared filesystem is not an OS security sandbox. No claim of strict experimental independence.',goldStandard:'Frozen for governance only; never included in producer whitelist.',unknownHistoricalCosts:['prior global UI rework','governance task cost'],preparationOwner:'01a0c8af-4072-7ce2-ae61-8d7510c98934'});
 console.log('Frozen inputs and four launch instructions prepared; workshop remains HOLD.');
}
async function checkPreparation(){
 const f=await json(reports+'frozen-inputs.json');for(const r of f.records)assert(h(await readFile(resolve(root,r.path)))===r.sha256,`Frozen input drift ${r.path}`);
 for(const s of samples)assert(await read(s.file)===await read(s.original),'Source copy drift');
 const forbidden=/referenceTranslation|auditRef|"audit"|"onDemand"|qualityReference|translationSourceId|content\/learning\/shared|content\/pilots\/(?:estimate|v2)|guide-translation|dictionary-translation|workshop-translation/;
 for(const s of samples){const text=await read(`content/pilots/flow-validation/inputs/B/${s.key}.json`);assert(!forbidden.test(text),'B answer-access leak');const b=JSON.parse(text),v=await json(`content/learning/shared/task-execution-${s.key}.json`);assert(JSON.stringify(Object.keys(b.concepts))===JSON.stringify(Object.keys(v.concepts)),'B concept dropped');for(const [id,c]of Object.entries(b.concepts))for(const key of ['zh','en','definition','scope','aliases','dependsOn'])assert(JSON.stringify(c[key])===JSON.stringify(v.concepts[id][key]),'B concept changed');}
 // Definitions are the declared B treatment. Check the remainder for copied
 // Chinese answer paragraphs without emitting any answer text.
 const answers=[];for(const p of answerFiles)answers.push(...(await read(p)).split(/\r?\n/).filter(line=>(line.match(/[\u3400-\u9fff]/g)??[]).length>=40));
 for(const s of samples){const {concepts,...nonConceptInput}=await json(`content/pilots/flow-validation/inputs/B/${s.key}.json`);const values=[];const visit=x=>{if(typeof x==='string')values.push(x);else if(x&&typeof x==='object')Object.values(x).forEach(visit);};visit(nonConceptInput);assert(!answers.some(line=>values.some(value=>value.includes(line))),'B embedded prior Chinese answer');}
 for(const t of f.tasks){assert(!t.readWhitelist.some(p=>/content\/learning\/shared|content\/pilots\/(estimate|v2)/.test(p)),'Forbidden whitelist');assert(!t.readWhitelist.some(p=>p.includes(`/inputs/${t.route==='A'?'B':'A'}/`)||p.startsWith(`content/pilots/flow-validation/${t.route==='A'?'B':'A'}/`)),'Cross-route whitelist');assert(t.writeFiles.every(p=>p.startsWith(`content/pilots/flow-validation/${t.route}/${t.stage}/`)),'Write owner mismatch');}
 const usage=await json(reports+'usage-evidence.json');assert(usage.status==='PASS','Telemetry HOLD');
 const methods=await json(reports+'method-validation.json');assert(methods.status==='PASS','Measurement/structure method HOLD');
 const evidence=await json(reports+'official-version-evidence.json');assert(evidence.status==='HOLD','Version decision changed without review');
 const result={status:'HOLD',preparationMechanics:'PASS',dictionary:'READY',workshop:'HOLD',twoArticleTrial:'HOLD until workshop version scope resolved',checks:['frozen hashes and exact source copies','A/B common contract identical','separate output ownership and white lists','B allowlist projection removes existing translation/audit evidence access','B definitions and scope retained','request-level usage and completed-turn method verified'],limits:['No OS-level isolation','B reuses knowledge derived partly from old sample translations','No actual translation/render/build/browser/course test','Workshop historical version unresolved'],frozenManifestSha256:h(await read(reports+'frozen-inputs.json'))};
 await put(reports+'validation.json',result);console.log(serial(result));
}
if(process.argv[2]==='generate')await generate();else if(process.argv[2]==='check')await checkPreparation();else throw Error('Use generate|check');
