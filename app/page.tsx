import Link from 'next/link';

const skillGroups = [
  { number: '01', title: '开始使用', description: '只需设置一次，然后熟悉整套工作方式。', skills: ['/setup-matt-pocock-skills', '/ask-matt'] },
  { number: '02', title: '主流程', description: '从想法到交付的核心路径，按顺序执行。', skills: ['/grill-with-docs', '/to-spec', '/to-tickets', '/implement'] },
  { number: '03', title: '问题塑形', description: '探索开放问题，形成能进入主流程的决定。', skills: ['/wayfinder', '/prototype', '/research'] },
];

const learningTracks = [
  { eyebrow: '理解 LLM 如何思考', question: '当我向模型发出提示时，实际发生了什么？', lessons: ['什么是 LLM？', '什么是上下文窗口？', '什么是 Token？'] },
  { eyebrow: '配置你的智能体', question: '如何让它按照我的工作方式运行？', lessons: ['AGENTS.md 完整指南', '计划模式入门', '不要运行 Claude /init'] },
  { eyebrow: '交付可靠代码', question: '怎样交付我愿意署名负责的代码？', lessons: ['用智能体进行测试驱动开发', '改进代码库架构', '建立 AI 编码反馈循环'] },
];

export default function Home() {
  return (
    <main>
      <div className="announcement"><span>新</span>AI 编码速成课程现已发布<span aria-hidden="true">↗</span></div>
      <header className="site-header shell">
        <Link className="brand" href="/" aria-label="AI Hero 中文版首页" prefetch={false}>AI<span>Hero</span></Link>
        <nav aria-label="主导航"><a href="#start">从这里开始</a><a href="#skills">Skills</a><a href="#learn">课程</a></nav>
        <a className="search-link" href="#learn">搜索 <kbd>⌘ K</kbd></a>
      </header>

      <section className="hero shell" id="start">
        <p className="eyebrow">真正的 AI 工程 · MATT POCOCK</p>
        <h1>工程基本功没有过时。<br /><em>它是你最大的优势。</em></h1>
        <p className="hero-copy">AI Hero 是一套与编码智能体协作的工程流程：从一个想法出发，直到代码完成、接受审查并真正交付。</p>
        <div className="hero-actions">
          <a className="primary-action" href="#skills">浏览全部 Skills <span aria-hidden="true">→</span></a>
          <a className="secondary-action" href="#learn">查看学习路线</a>
        </div>
      </section>

      <section className="stats shell" aria-label="学习数据">
        <div><strong>112,800+</strong><span>正在学习的开发者</span></div>
        <div><strong>8,500+</strong><span>参加过训练营</span></div>
        <div><strong>25</strong><span>免费 Skills</span></div>
      </section>

      <section className="manifesto shell">
        <p className="eyebrow">AI 让写代码更快，也让坏代码更昂贵</p>
        <h2>糟糕的代码，从未像今天这样代价高昂。</h2>
        <div>
          <p>Claude Code、Codex 等编码智能体交付代码的速度已经超过任何人类。但如果缺少谨慎引导，它们也会让代码库越来越差。</p>
          <p>当你能够设计出智能体易于理解的代码库，就能真正获得这个新时代的红利。AI Hero 面向每一位在意交付质量的工程师。</p>
        </div>
      </section>

      <section className="skills-section" id="skills">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow">可直接安装的工程流程</p><h2>一套真实的工程方法，封装成 Skills</h2></div>
            <p>每个 Skill 都可以免费使用。你可以从任意位置开始，大多数人会先走主流程。</p>
          </div>
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.number}>
                <span className="skill-number">{group.number}</span><h3>{group.title}</h3><p>{group.description}</p>
                <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                <a href="#learn">从这里开始 <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="learn-section shell" id="learn">
        <div className="section-heading compact"><div><p className="eyebrow">你现在想做什么？</p><h2>诚实地选择你真正缺少的那一步。</h2></div></div>
        <div className="track-list">
          {learningTracks.map((track, index) => (
            <article className="track" key={track.eyebrow}>
              <span className="track-index">0{index + 1}</span>
              <div><p className="eyebrow">{track.eyebrow}</p><h3>{track.question}</h3></div>
              <ul>{track.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul>
              <span className="track-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <footer><div className="shell footer-inner"><Link className="brand" href="/" prefetch={false}>AI<span>Hero</span></Link><p>面向好奇的专业开发者的 AI 工程教程 · 中文本地化学习版</p><a href="https://www.aihero.dev/" target="_blank" rel="noreferrer">访问英文原站 ↗</a></div></footer>
    </main>
  );
}
