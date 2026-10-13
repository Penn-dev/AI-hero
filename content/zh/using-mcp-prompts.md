---
title: "使用 MCP 提示词"
slug: "using-mcp-prompts"
type: "post"
description: "用 MCP 服务器提供提示词模板，把常用工作流程变成用户可以调用的命令。"
updatedAt: "2025-03-10T14:53:59.194Z"
---

到目前为止，我们一直在讨论怎样给 MCP 服务器添加工具。

但我很少在网上看到有人讨论，MCP 服务器其实也能向用户提供提示词。

这样，你就能把 MCP 当作一个**提示词目录**。用户可以从中取用提示词，更快完成自己的目标。

我来展示**一个我很喜欢的提示词模板**，写这篇文章时我也用到了它。

译注：提示词模板是一段可复用的指令，其中可以留出文件路径等需要每次填写的信息。本篇保留 2025 年 3 月原文的 SDK 与 Claude Code 用法；没有实际连接服务器或运行示例。

## 代码

先从服务器和传输对象这些基础代码开始：

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "Prompt Directory",
  version: "1.0.0",
});

// ...more code in here

const transport = new StdioServerTransport();
await server.connect(transport);
```

这个服务器会提供一个叫 `cleanTranscription` 的提示词。我大多数文章都是先口述录制，再转成文字；这个提示词帮助我修正转录中的错误。

<Scrollycoding>

# !!steps

先给服务器添加一个 `prompt`。语法与 `tool` 非常相似，不过这次不用 `server.tool`，而是调用 `server.prompt`：

```ts ! example.ts
server.prompt("cleanTranscription");
```

# !!steps

接下来，添加一段描述，说明这个工具具体做什么。

```ts ! example.ts
server.prompt(
  "cleanTranscription",
  `Clean up a transcript file`,
);
```

# !!steps

它需要接收待整理文件的路径。我们用 Zod 来描述这个参数：

```ts ! example.ts
import { z } from "zod";

server.prompt(
  `cleanTranscription`,
  `Clean up a transcript file`,
  { path: z.string() },
);
```

# !!steps

最后，添加回调函数，返回提示词内容。返回值放在 messages 数组中，角色是 `user`，内容是一段文本。

```ts ! example.ts
import { z } from "zod";

server.prompt(
  `cleanTranscription`,
  `Clean up a transcript file`,
  { path: z.string() },
  async ({ path }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: getPrompt(path),
          },
        },
      ],
    };
  },
);
```

</Scrollycoding>

这样，我们就给 MCP 服务器添加了一个整理转录文本的提示词模板。

译注：Zod 用来描述和校验参数类型。这里的路径是字符串；回调函数在需要取得模板时执行。代码中的 “Clean up a transcript file” 意思是“整理一份转录文件”。

## 提示词

如果你感兴趣，下面就是我使用的提示词：

```ts
const getPrompt = (path: string) =>
  `
Clean up the transcript in the file at ${path}
Do not edit the words,
only the formatting and any incorrect transcriptions.
Turn long-form numbers to short-form:
One hundred and twenty-three -> 123
Three hundred thousand, four hundred and twenty-two -> 300,422
Add punctuation where necessary.
Wrap any references to code in backticks.
Include links as-is - do not modify links.

Common terms:
LLM-as-a-judge
ReAct
Reflexion
RAG
Vercel
`;
```

中文 Prompt（译注）：

```text
整理 ${path} 这个路径下文件中的转录文本。
不要改动用词，
只调整格式，并修正转录错误。
把文字形式的数字改成数字形式：
一百二十三 -> 123
三十万零四百二十二 -> 300,422
在需要的地方添加标点。
凡是提到代码的地方，都用反引号包起来。
链接按原样保留，不要修改链接。

常见术语：
LLM-as-a-judge
ReAct
Reflexion
RAG
Vercel
```

常见术语大约有两百个，为了简洁，我省略了其余部分。

译注：上面的中文版完整对应本页实际提供的英文提示词，保留路径占位符和术语拼写。原文未提供被省略的其余术语，因此这里也不补造完整词库。它是提示词文本，不能直接代替原 TypeScript 函数；实际使用时要提供文件路径。

## 演示

我们可以用[之前介绍的方法（中文）](/mcp-server-from-a-single-typescript-file)（[英文原文](https://www.aihero.dev/mcp-server-from-a-single-typescript-file)），从 Claude Code 连接这个服务器。

连接后，提示词模板会作为 Claude 内部可执行的命令提供。我们可以在 Claude Code 界面输入 `/cleanTranscription` 来使用它，自动补全里会显示这个提示词：

![Claude Code 中可见的 `/cleanTranscription`](http://res.cloudinary.com/total-typescript/image/upload/v1741618645/posts/post_k3ou7/ewbqn3782ztrpafxlmdf.png)

运行时，它会提示我们填写 `path` 参数：

![Claude Code 请求填写 `path` 变量](http://res.cloudinary.com/total-typescript/image/upload/v1741618644/posts/post_k3ou7/johh2yqdfn6jndtvrk0b.png)

随后，它就会对指定文件运行这个提示词。

译注：这两张图是原文的演示资源，不是本次运行所得的截图。安装依赖、客户端版本与文件权限等准备尚未验证。

## 总结

这个简单例子展示了怎样把 MCP 服务器当作提示词目录。你可以为用户提供一组提示词，用来引导 LLM 的行为。

它既是很有用的个人效率工具，也能把常见工作流程做成 MCP 客户端中的命令。
