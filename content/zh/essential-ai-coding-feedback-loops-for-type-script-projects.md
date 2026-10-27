---
title: "TypeScript 项目必备的 AI 编程反馈循环"
slug: "essential-ai-coding-feedback-loops-for-type-script-projects"
type: "post"
description: "为 TypeScript 项目建立 AI 编程反馈循环，用类型检查、测试和提交前钩子帮助 AI 智能体正确完成工作。"
tags:
  - score-first-wins
  - level-up-your-workflow
updatedAt: "2026-01-16T11:51:36.113Z"
---

使用 AI 编程智能体时，尤其是让它独立工作时，你需要反馈循环，让 AI 能验证自己的工作。如果你采用离开键盘的 AFK 编程方式，比如 [Ralph Wiggum（原文）](https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum)，反馈循环就更重要了。也可阅读[中文 Ralph 技巧](/tips-for-ai-coding-with-ralph-wiggum)。

> 译注：本文保留原文配置片段与命令，没有在项目中执行安装、提交或测试。完整的 TypeScript、Vitest、Prettier 与依赖配置未在原文给出；复制前需要结合自己的项目补齐。原文混用 pnpm、npx 和 npm，此处不擅自改写。

## 1. 配置 TypeScript 和类型检查

[TypeScript](https://www.typescriptlang.org/) 基本上相当于给 AI 免费提供反馈。优先用它，而不是 JavaScript。

创建一个 `typecheck` 脚本，放进 `package.json`：

```json
{
  "scripts": {
    "typecheck": "tsc"
  }
}
```

TypeScript 能发现一些错误；如果没有它，AI 可能只有在浏览器里测试时才会发现这些问题。

## 2. 添加自动化测试

使用 [Vitest](https://vitest.dev/) 之类的测试框架来发现逻辑错误：

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

为核心功能编写基础单元测试，就能帮助 AI 不偏离目标。

## 3. 安装 Husky，配置提交前钩子

[Husky](https://typicode.github.io/husky/) 可以在每次提交前强制执行反馈检查。

安装并初始化 Husky：

```bash
pnpm install --save-dev husky
pnpm exec husky init
```

创建 `.husky/pre-commit` 文件，运行全部检查：

```bash
npx lint-staged
npm run typecheck
npm run test
```

只要有一步失败，提交就会被阻止，AI 也会收到错误信息。

另一个很有用的反馈循环，是让 LLM 能访问本地运行中的开发服务器，检查前端。[这个视频](https://www.youtube.com/watch?v=pSritFeoYFo)介绍了怎样设置。

> 译注：这里描述的是作者预期的钩子流程，并非本次验证结果。测试命令是否退出、失败是否正确终止钩子，都需要在所用版本和脚本环境中确认；例如交互式监听模式不一定适合提交前检查。

## 4. 配置自动代码格式化

结合使用 [lint-staged](https://github.com/lint-staged/lint-staged) 和 [Prettier](https://prettier.io/)，在提交前自动格式化代码。

安装 lint-staged：

```bash
pnpm install --save-dev lint-staged
```

配置 `.lintstagedrc`：

```json
{
  "*": "prettier --ignore-unknown --write"
}
```

这样会对所有暂存文件运行 Prettier，并自动重新暂存修改。AI 生成的代码也就能遵循你的格式规范。

这里还可以运行 [ESLint](https://eslint.org/)，它与 lint-staged 配合得很好。

## 为什么这对 AI 有效

AI 智能体不会因为重复而烦躁。代码没有通过类型检查或测试时，它就再试一次。因此，反馈循环，尤其是提交前钩子，对 AI 辅助开发非常有用。
