---
title: "通过 stdout 提供 MCP 服务器"
slug: "mcp-server-from-a-single-typescript-file"
type: "post"
description: "用一个 TypeScript 文件搭建 MCP 服务器，将它连接到 Claude Code 并运行脚本。"
updatedAt: "2025-03-07T13:30:48.028Z"
---

我来展示一种最简单的 MCP 服务器搭建方法。

我们会创建一个 MCP 服务器，把它连接到 Claude Code，再用它运行我们想运行的脚本。

整个过程只需要一个 TypeScript 文件，不需要构建步骤。

开始吧。

译注：构建通常指把源代码转换成运行环境能够执行的文件。这里会用 tsx 直接运行 TypeScript。原文没有提供完整的依赖安装步骤、锁定版本或运行环境，本次也没有实际运行这些代码。下文关于 Claude Code 功能和命令的说法按 2025 年 3 月原文保留。

## 服务器

先创建一个 `main.ts` 文件。

我们要初始化一个 `McpServer`：

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "Weather Service",
  version: "1.0.0",
});
```

这个 MCP 服务器来自 `@modelcontextprotocol/sdk` 软件包。

<Scrollycoding>

# !!steps

接下来，给服务器添加一个工具。首先定义工具名称 `getWeather`。

```ts ! example.ts
server.tool("getWeather");
```

# !!steps

然后，定义工具运行时需要接收哪些参数。这里我们只需要城市名，它是一个字符串，用 Zod 来描述。

```ts ! example.ts
import { z } from "zod";

server.tool("getWeather", { city: z.string() });
```

# !!steps

最后，添加一个只在工具被调用时才执行的回调函数。我们返回一个由内容对象组成的数组，这里返回的是文本，内容是那个地方天气晴朗。

如果要做成真正的天气查询功能，就应该在这个函数里调用天气 API。

```ts ! example.ts
import { z } from "zod";

server.tool(
  "getWeather",
  { city: z.string() },
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
```

</Scrollycoding>

译注：Zod 用来描述和校验数据；字符串就是文本。回调函数是预先交给程序、在特定事件发生时再执行的一段代码。原例固定返回 “The weather in … is sunny!”，意思是“……的天气晴朗！”，并没有实际查询天气。

服务器本身已经写好了，但我们还需要一种方式，让 Claude Code 能与它通信。

Claude Code 会运行这个文件，并通过 stdin 与它通信。

为此，我们可以使用 `StdioServerTransport`，它来自 `@modelcontextprotocol/sdk`。

先创建传输对象，再让服务器连接到它。

```ts
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const transport = new StdioServerTransport();
await server.connect(transport);
```

译注：stdin 是标准输入，stdout 是标准输出。客户端向服务器的标准输入发送消息，再从标准输出接收服务器的消息；传输对象负责处理这条通信通道。

## 连接到 Claude Code

现在，在 Claude Code 中运行 `claude mcp add`。它会开启一段交互式对话，让你选择想连接的服务器。

目前 Claude Code 只支持 `stdio` 传输，也就是我们正在使用的方式。

我在上方视频中演示了交互步骤，不过你也可以用一条命令完成：

```sh
claude mcp add "weather-example" npx tsx "/path-to-the-file.ts"
```

这会告诉 Claude，要运行这个文件，就调用 `npx tsx /path-to-the-file.ts`。

`npx` 可以运行来自 `npm` 的脚本。`tsx` 是一种很好用的方法，可以不经过构建步骤直接运行 TypeScript 文件。最后再传入文件路径。

这样，我们应该就能运行 `claude`，让它与 MCP 服务器通信了。具体演示可以看上方视频。

译注：命令中的文件路径需要换成你自己的实际文件路径。固定来源提到了“上方视频”，但没有给出视频地址或文字稿，因此这里只保留[本篇原站入口](https://www.aihero.dev/mcp-server-from-a-single-typescript-file)，不虚构视频或演示结果。“只支持 stdio”同样是原文写作时的说法，未核实当前版本。

## 为什么这很有用？

它让我们不必配置构建流程或另外搭建服务器，就能把任意 TypeScript 函数连接到 Claude Code。

这是自定义 Claude Code 的一种很有力的方式，也适用于 Cursor、Windsurf 等其他 MCP 宿主。

随着越来越多桌面应用开始集成 MCP，这会成为一种很有用的扩展方式，为它们加入自定义能力。
