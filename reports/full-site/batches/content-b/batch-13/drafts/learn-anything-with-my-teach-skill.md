---
title: "用我的 /teach 技能学习任何东西"
slug: "learn-anything-with-my-teach-skill"
type: "post"
description: "使用 Claude Code 的 /teach 技能，为语言、编程或其他技能创建个性化 AI 课程，并通过互动练习学习。"
updatedAt: "2026-06-08T16:45:34.558Z"
---

[`/teach` 技能](https://github.com/mattpocock/skills/tree/main/skills/productivity/teach)让 Claude 成为你的私人老师，帮助你学习任何东西。它不只是随便生成一些课，而是先理解你的目标，适应你的水平，再量身制作课程。

这个技能会记录学习任务、寻找优质资源、生成带音频和测验的互动课程，并保存学习进度，让它始终知道你学到哪一步。

**在实时课程中这样学习**

训练营使用的正是这套工作流。加入下一期 AI Coding for Real Engineers 的候补名单。

[加入候补名单：英文原站入口](https://www.aihero.dev/cohorts/ai-coding-for-real-engineers-m0k0w)

> 译注：上面完整保留原课程推广卡片的内容与目标，改为静态链接，未核验候补名单现状。下面是原文步骤，不代表本次已安装技能或生成课程；音频、测验、资源质量和个性化效果也未实际验证。

## 完成步骤

### 建立学习项目

- [ ] 为学习项目创建一个新目录

```txt
mkdir learning-french
cd learning-french
```

- [ ] 在代码编辑器中打开该目录，原文推荐 VS Code

```txt
code .
```

### 安装 /teach 技能

- [ ] 确认系统已安装 Node.js

如果还没有 Node，可以[从 nodejs.org 下载](https://nodejs.org/en/download)。

- [ ] 打开编辑器的集成终端，运行技能安装命令

```txt
npx skills@latest add mattpocock/skills
```

- [ ] 出现选择提示时，选择 `/teach` 技能

用上下方向键移动，再按 `space` 选择。

- [ ] 选择 Claude Code 作为智能体

同样使用方向键与空格键选择。

- [ ] 选择安装到当前项目，即项目作用域

- [ ] 选择符号链接安装方式

- [ ] 询问是否安装 “find skills” 技能时，选择不安装

### 必要时修正智能体目录

如果安装后创建的是 `.agents` 目录，而不是 `.claude`，就需要建立符号链接，让两个目录名指向同一位置。

- [ ] 在终端运行符号链接命令

```txt
ln -s .agents .claude
```

这样 Claude Code 和其他智能体就能读取同一个目录，改动也会同时反映出来。

> 译注：这是原文的目录布局方案，不是对所有安装环境的通用修复。命令假定当前目录正确，且目标路径未被已有文件或目录占用；运行前应先检查，不要覆盖现有配置。原文未提供 Windows 等不同环境的替代步骤。

### 用 /teach 创建第一课

- [ ] 在项目目录中打开 Claude Code 或自己选择的智能体

- [ ] 请智能体教你某件事

例如：`teach me French`、`teach me React hooks`，或者 `teach me how to make sourdough bread`。

中文版 Prompt（学习辅助，法语示例）：

```text
教我法语。
```

中文版 Prompt（学习辅助，React 示例）：

```text
教我 React Hooks。
```

中文版 Prompt（学习辅助，面包示例）：

```text
教我怎样制作酸种面包。
```

智能体会问一些澄清问题：

- 你为什么想学这个
- 目前是什么水平
- 怎样才算达到目标
- 你喜欢怎样学习

回答尽量具体。细节越充分，个性化课程就越贴合你的需要。

![Claude 围绕法语学习目标提出澄清问题。](https://res.cloudinary.com/total-typescript/image/upload/v1780936890/ai-hero-images/qe4ytzhikcjq2hzcuzhw.png)

- [ ] 查看智能体创建的文件

它会在项目中生成几类文件：

- `MISSION.md`：学习目标与背景
- `RESOURCES.md`：针对目标筛选过的资源
- `reference/glossary.html`：可以边学边补充的速查表
- `lessons/`：带音频和测验的互动 HTML 课程
- `learning-records/`：进度记录

- [ ] 打开并完成第一课

在浏览器中打开课程文件，智能体会告诉你要运行什么命令，然后完成互动内容。许多课程带有点击即可播放的音频按钮，以及即时反馈的测验。

![浏览器中的互动法语课程，包含点击播放音频的按钮和测验题。](https://res.cloudinary.com/total-typescript/image/upload/v1780936891/ai-hero-images/hcwm9jbwvfodztditzfa.png)

### 继续学习

- [ ] 告诉智能体第一课学得怎么样，并请它准备下一课

回到 Claude Code，说说学到了什么、哪里不清楚，或者接下来想重点学习什么。就像与一位了解你全部进度的真实老师交流一样。

随着学习推进，智能体会继续创建新课、更新学习记录，并补充参考资料。

> 译注：固定来源没有实际生成的 HTML 课程、音频文件或题库；本文保留工作流与两张原图，不补造缺失的学习材料。
