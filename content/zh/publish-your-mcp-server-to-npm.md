---
title: "把 MCP 服务器发布到 NPM"
slug: "publish-your-mcp-server-to-npm"
type: "post"
description: "用 Node.js 将 MCP 服务器发布到 NPM，让其他人通过简单命令运行它并取得更新。"
tags:
  - connect-tools-mcp
updatedAt: "2025-03-12T11:08:57.628Z"
---

MCP 的设计有一个很大的好处：你可以利用免费可用的工具，轻松分发 MCP 服务器。

这次，我们要把[之前写的简单 MCP 服务器（中文）](/mcp-server-from-a-single-typescript-file)（[英文原文](https://www.aihero.dev/mcp-server-from-a-single-typescript-file)）发布到 NPM。

完成后，任何安装了 [Node](https://nodejs.org/en) 的人都能立即通过 `npx` 运行它。我们可以发布更新，用户也会自动获得这些更新。

我们会按照我之前在 Total TypeScript 上写的[如何创建 NPM 软件包](https://www.totaltypescript.com/how-to-create-an-npm-package)一文中的建议来做。

译注：NPM 是分发软件包的平台，Node.js 是运行 JavaScript 的环境。本篇保留 2025 年 3 月原文中的命令和版本；代码未实际构建、发布或运行，不能据此认定所列步骤已经包含全部环境准备。

## 基本原理

用户会通过 `npx` 运行我们的 MCP 服务器。这个工具随 Node.js 提供，可以运行 NPM 上的软件包。

他们会执行这条命令：

```bash
npx -y @mattpocockuk/mcp-server-example@latest
```

它会：

1. 将软件包的最新版本下载到全局缓存，`@latest` 标签指定最新版本。
2. 跳过首次运行软件包时通常出现的确认消息，`-y` 参数控制这一点。
3. 运行软件包中 `package.json` 指定的文件。

也就是说，你不必先安装软件包，就能运行它。

需要注意，这样做也有风险。如果软件包来自不可信的来源，应该始终先检查源代码。

## 配置服务器

服务器和传输对象都放在同一个 `main.ts` 文件里。用户运行我们的服务器时，执行的就是这个文件。

我们要在文件最上方加一行 shebang。

这是一种特殊的首行，用来告诉操作系统怎样运行文件。这里，我们指定用 Node.js 执行它。

```ts
#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Weather Service",
  version: "1.0.0",
});

server.tool(
  "getWeather",
  {
    city: z.string(),
  },
  async ({ city }) => {
    return {
      content: [
        {
          type: "text",
          text: `The weather in ${city} is sunny!`,
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

译注：原例中的天气工具固定返回晴天，不会真正调用天气服务。它展示的是服务器结构和发布方式。

## `package.json`

我们需要一个 `package.json` 文件来描述软件包。内容如下：

```json
{
  "name": "@mattpocockuk/mcp-server-example",
  "version": "0.0.1",
  "description": "An example of a MCP server",
  "bin": {
    "mcp-server-example": "./dist/main.js"
  },
  "files": ["dist"],
  "type": "module",
  "scripts": {
    "build": "tsc",
    "ci": "npm run build",
    "prepublishOnly": "npm run ci"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.7.0"
  }
}
```

注意，如果把它复制粘贴进自己的 `package.json`，需要先删除注释。

译注：上面这份原例实际上没有注释；“删除注释”这句按原文保留。此外，示例代码导入了 Zod，构建命令还会用到 TypeScript，但这个依赖列表只列出 MCP SDK。原文没有给出完整安装说明，本次没有补造一套已经验证可用的依赖配置。

### `package.json#bin`

这个文件中最重要的部分是 `bin` 字段，它告诉 `npx`，运行 MCP 服务器时应该执行哪个文件。具体逻辑在[这份文档](https://docs.npmjs.com/cli/v8/commands/npx)中有说明，关键的一段是：

如果软件包的 `bin` 字段在 `package.json` 中只有一个条目，……就会使用那个命令。

所以，只要 `bin` 字段中只有一个条目，不管它叫什么，`npx` 都会运行该条目指定的文件。这里的命令名称是 `mcp-server-example`。

```json
{
  "bin": {
    "mcp-server-example": "./dist/main.js"
  },
}
```

要运行的文件是 `./dist/main.js`，它会由 TypeScript 构建生成。

译注：这里保留的是原文配置片段，包含结尾逗号，不能把它当作无需整理即可直接使用的完整 JSON 文件。

## TypeScript

TypeScript 负责把 `.ts` 文件转换成 Node 能运行的 `.js` 文件。

先添加一个 `tsconfig.json`：

```json
{
  "compilerOptions": {
    /* Base Options: */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "verbatimModuleSyntax": true,

    /* Strictness */
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    "module": "NodeNext",
    "outDir": "dist",

    "lib": ["ES2022"]
  }
}
```

它告诉 TypeScript 怎样构建项目。最重要的部分是 `outDir` 字段，决定构建产物存放在哪个目录。因此，`main.ts` 会变成 `dist/main.js`。

## 发布软件包

要发布软件包，需要运行以下命令：

```bash
npm publish --access public
```

这会把软件包发布到 NPM。`--access public` 表示任何人都可以安装它。

你可能遇到以下错误：

- 如果还没登录，需要先运行 `npm login`。
- 如果软件包名称已被占用，需要换一个名字。

解决这些问题后，软件包就发布成功了！

译注：这是会向 NPM 公开发布内容的操作说明，不是本次已经执行的动作。包名也应使用你有权发布的名称。

## 试一试

可以运行下面的命令来测试：

```bash
npx -y @mattpocockuk/mcp-server-example@latest
```

它会运行软件包的最新版本。你也可以把 `@latest` 改成 `@1.0.0`，或其他想运行的版本号，来指定具体版本。

有点奇怪的是，终端里不会显示任何内容，因为服务器正监视 stdin，等待命令输入。

你可以尝试把它连接到 Cursor 这样的 MCP 服务器，然后询问所在城市的天气。

译注：上一句保留了原文把 Cursor 称为 “MCP server” 的说法；同系列架构文章把 Cursor 列为宿主，这里用词不一致。本例的意图是让支持 MCP 的应用连接刚发布的服务器。天气仍是原代码的固定示例，不是实测查询结果。

## 总结

这篇文章展示了把 MCP 服务器发布到 NPM 有多方便。这样，任何安装了 Node.js 的人都能用一条命令运行你的服务器。

这是一种很有力的分发方式，可以把 MCP 服务器交给所有想使用它的人。
