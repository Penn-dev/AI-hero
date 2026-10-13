---
title: "用 Vercel AI SDK 构建图片替代文本生成器"
slug: "describe-images-with-vercel-ai-sdk"
type: "post"
description: "学习用 Vercel AI SDK 为本地图片或网络图片生成替代文本。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-08T08:43:53.036Z"
---

AI SDK 还内置支持向 LLM 传入图片和文件。

模型可以查看图片或文件，再对它们进行处理。这是一个很强大的功能。

并非所有 LLM 都支持这件事，但对于支持的模型，AI SDK 也允许你这样调用。

这次，我们要让 LLM 为传入的图片生成替代文本，也就是 alt text。

它可以用在网站上，帮助无法看到图片的人理解图片里有什么。

译注：替代文本是用文字说明图片内容，常供屏幕阅读器或图片无法显示时使用。本次没有读取或上传示例图片，也未调用模型。原文未给出完整模型配置、锁定依赖和本地 fireworks.jpg 文件，下面的演示结果均属于原作者。

<Scrollycoding>

# !!steps

我们使用一段很简单的系统提示词：

```ts ! example.ts
const systemPrompt =
  `You will receive an image. ` +
  `Please create an alt text for the image. ` +
  `Be concise. ` +
  `Use adjectives only when necessary. ` +
  `Do not pass 160 characters. ` +
  `Use simple language. `;
```

中文 Prompt（译注）：

```text
你将收到一张图片。
请为这张图片编写替代文本。
保持简洁。
只在必要时使用形容词。
不要超过 160 个字符。
使用简单的语言。
```

# !!steps

然后，创建一个叫 `describeImage` 的函数，接收本机文件系统中的图片路径。

```ts ! example.ts
import { generateText } from "ai";

const systemPrompt =
  `You will receive an image. ` +
  `Please create an alt text for the image. ` +
  `Be concise. ` +
  `Use adjectives only when necessary. ` +
  `Do not pass 160 characters. ` +
  `Use simple language. `;

export const describeImage = async (
  imagePath: string,
) => {
  const { text } = await generateText({
    model,
    system: systemPrompt,
  });

  return text;
};
```

中文 Prompt（译注）：

```text
你将收到一张图片。
请为这张图片编写替代文本。
保持简洁。
只在必要时使用形容词。
不要超过 160 个字符。
使用简单的语言。
```

</Scrollycoding>

看起来不错，但函数内部还没有用到 `imagePath`。

不能直接把图片路径当提示词传入。我们要先把图片读进内存，再交给 `generateText`。

<Scrollycoding>

# !!steps

用 Node.js 的 `readFileSync` 把图片读进内存。

它会把图片保存为 `Uint8Array`，也就是组成图片的原始字节数据。

```ts ! example.ts
import { readFileSync } from "fs";
import { generateText } from "ai";

export const describeImage = async (
  imagePath: string,
) => {
  const imageAsUint8Array = readFileSync(imagePath);
  const { text } = await generateText({
    model,
    system: systemPrompt,
  });

  return text;
};
```

# !!steps

当然，如果想用非阻塞 I/O，也可以使用 `readFile`，它来自 `fs.promises`。但这个例子使用 `readFileSync` 就够了。

```ts ! example.ts
import { readFile } from "fs/promises";
import { generateText } from "ai";

export const describeImage = async (
  imagePath: string,
) => {
  const imageAsUint8Array = await readFile(imagePath);
  const { text } = await generateText({
    model,
    system: systemPrompt,
  });

  return text;
};
```

译注：I/O 指输入输出操作，例如读取文件。非阻塞方式让程序可以在等待文件读取时处理其他工作；这里的同步和异步版本都按原文保留。

# !!steps

现在可以把 `Uint8Array` 传给 `generateText` 了。但不能把它直接当提示词，必须放进 `messages` 数组。

格式与之前的聊天历史一样，不过这次的 `content` 是由不同消息部分组成的数组。

我们传入的消息部分类型是 `image`，再把 `Uint8Array` 放进 `image` 属性。

```ts ! example.ts
import { readFileSync } from "fs";
import { generateText } from "ai";

export const describeImage = async (
  imagePath: string,
) => {
  const imageAsUint8Array = readFileSync(imagePath);
  const { text } = await generateText({
    model,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: imageAsUint8Array,
          },
        ],
      },
    ],
  });

  return text;
};
```

</Scrollycoding>

来运行看看。我有一张烟花图片，把它传进去，看看会发生什么。

```ts
const description = await describeImage(
  "./fireworks.jpg",
);

console.log(description);
```

我们得到了一段很好的描述：

```bash
Colorful fireworks display over a city skyline at night, with bursts of red, white, and blue reflections on the water. Spectators watch from the shoreline.
```

中文理解（学习辅助）：

```text
夜晚，城市天际线上方绽放着多彩烟花，红、白、蓝色的光映在水面上。观众站在岸边观看。
```

总结一下：先把图片读进内存，再直接传给 `generateText`，通过 `messages` 数组提供图片，最后得到图片描述。很不错。

## 从 URL 读取

刚才的方法适用于图片已经在内存里的情况。如果手里只有一个图片 URL 呢？

有个很方便的捷径：直接把 URL 传给 AI SDK。

```ts
import { generateText } from "ai";

export const describeImage = async (
  imageUrl: string,
) => {
  const { text } = await generateText({
    model,
    system:
      `You will receive an image. ` +
      `Please create an alt text for the image. ` +
      `Be concise. ` +
      `Use adjectives only when necessary. ` +
      `Do not pass 160 characters. ` +
      `Use simple language. `,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: new URL(imageUrl),
          },
        ],
      },
    ],
  });

  return text;
};
```

中文 Prompt（译注）：

```text
你将收到一张图片。
请为这张图片编写替代文本。
保持简洁。
只在必要时使用形容词。
不要超过 160 个字符。
使用简单的语言。
```

用 `new URL` 包装这个地址，就是告诉 AI SDK，这是一个需要发给 LLM 的网络 URL。

来测试一下。我在 GitHub 上放了一张教堂图片，想让它描述这张图：

```ts
const description = await describeImage(
  "https://github.com/ai-hero-dev/ai-hero/blob/main/internal/assets/image.jpg?raw=true",
);

console.log(description);
```

运行后，URL 会传给 LLM。LLM 随后下载并查看图片，再返回描述。

```bash
Lake Bled in Slovenia with church on small peninsula and castle on cliff, surrounded by mountains. Calm water reflects buildings and autumn trees.
```

中文理解（学习辅助）：

```text
斯洛文尼亚的布莱德湖，小半岛上有一座教堂，悬崖上有一座城堡，四周群山环绕。平静的水面映出建筑和秋天的树木。
```

译注：这两段中文完整对应原文给出的英文模型输出，并不是本次看图后的独立判断。URL 下载和图片读取在具体服务中的实现、以及描述是否符合图片，本次都未验证。

处理已经托管在网上的图片时，这是一条很方便的捷径。
