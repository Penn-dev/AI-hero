---
title: "用 Vercel AI SDK 从 PDF 中提取结构化数据"
slug: "structured-data-from-pdfs-with-vercel-ai-sdk"
type: "post"
description: "学习如何借助 Vercel AI SDK 和 Zod schema，从 PDF 发票中提取结构化数据，以便自动处理并存入数据库。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-08T09:38:39.939Z"
---

从非结构化内容中提取结构化数据，是大语言模型（LLM）最有价值的应用场景之一。

这个例子会把任意文件交给 LLM，让它替我们分析文件内容。

这里使用的是一份 PDF 发票：我们把 PDF 传给模型，它会从中提取所需的结构化数据。

这样一来，你系统中的各种文档就能变成可存入数据库、可查询、可搜索的数据。

### 创建 Schema

既然要处理结构化数据，先创建一个 `Zod` schema 来定义我们需要的数据格式。

```ts
import { z } from "zod";

const schema = z
  .object({
    total: z
      .number()
      .describe("The total amount of the invoice."),
    currency: z
      .string()
      .describe("The currency of the total amount."),
    invoiceNumber: z
      .string()
      .describe("The invoice number."),
    companyAddress: z
      .string()
      .describe(
        "The address of the company or person issuing the invoice.",
      ),
    companyName: z
      .string()
      .describe(
        "The name of the company issuing the invoice.",
      ),
    invoiceeAddress: z
      .string()
      .describe(
        "The address of the company or person receiving the invoice.",
      ),
  })
  .describe("The extracted data from the invoice.");
```

这个 schema 包含的字段不少：发票总额、币种、发票号码、开票方地址、开票方名称，以及收票方地址。

你可能已经见过类似写法，但这里有一个值得注意的细节：我为每个字段都尽量补上了说明。这样做能让 LLM 更清楚每个字段应该提取什么内容，从而提高结果正确的机会。

### 从发票中提取数据

<Scrollycoding>

# !!steps

先创建一个 `extractDataFromInvoice` 函数。在函数内部，把 schema 和一段简短的系统提示词（system prompt）传给 `generateObject`。

这个函数接收 `invoicePath`，也就是本机文件系统中某份 PDF 的路径。

```ts ! example.ts
import { generateObject } from "ai";

export const extractDataFromInvoice = async (
  invoicePath: string,
) => {
  await generateObject({
    model,
    system:
      `You will receive an invoice. ` +
      `Please extract the data from the invoice.`,
    schema,
  });
};
```

中文理解版（学习辅助）：这段英文提示词的意思是：“你将收到一份发票，请从发票中提取数据。”它告诉模型任务目标，但不会改变代码中实际发送给模型的英文内容。

# !!steps

前面的图片示例使用了 `messages` 数组。PDF 也可以用同样的方式传入，只是这次内容类型要从 `image` 改为 `file`。

这里使用 `readFileSync` 读取文件系统中的原始二进制数据，再直接传给 AI SDK。

```ts ! example.ts
import { readFileSync } from "fs";
import { generateObject } from "ai";

export const extractDataFromInvoice = async (
  invoicePath: string,
) => {
  await generateObject({
    model,
    system:
      `You will receive an invoice. ` +
      `Please extract the data from the invoice.`,
    schema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: readFileSync(invoicePath),
          },
        ],
      },
    ],
  });
};
```

中文理解版（学习辅助）：提示词仍然是“你将收到一份发票，请从发票中提取数据”。新增的 `messages` 部分则负责把 PDF 文件本身交给模型。

# !!steps

还需要传入 MIME 类型，告诉 LLM 它收到的是什么文件。模型也许能通过文件的魔数（magic numbers，文件开头用于识别格式的字节）自己判断出来，不过明确写出类型会更稳妥。

```ts ! example.ts
import { readFileSync } from "fs";
import { generateObject } from "ai";

export const extractDataFromInvoice = async (
  invoicePath: string,
) => {
  await generateObject({
    model,
    system:
      `You will receive an invoice. ` +
      `Please extract the data from the invoice.`,
    schema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: readFileSync(invoicePath),
            mimeType: "application/pdf",
          },
        ],
      },
    ],
  });
};
```

中文理解版（学习辅助）：提示词的意思不变；`mimeType: "application/pdf"` 明确告诉程序，这个文件是一份 PDF。

# !!steps

最后把对象返回出去，这样调用函数时就能拿到我们预期的结构化结果。

```ts ! example.ts
import { readFileSync } from "fs";
import { generateObject } from "ai";

export const extractDataFromInvoice = async (
  invoicePath: string,
) => {
  const { object } = await generateObject({
    model,
    system:
      `You will receive an invoice. ` +
      `Please extract the data from the invoice.`,
    schema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: readFileSync(invoicePath),
            mimeType: "application/pdf",
          },
        ],
      },
    ],
  });

  return object;
};
```

中文理解版（学习辅助）：模型仍会收到同一条“读取发票并提取数据”的英文指令。`return object` 则把它按 schema 整理好的结果交还给调用这个函数的代码。

</Scrollycoding>

### 运行示例

现在实际试一试。我这里准备了一份虚构发票的 PDF，把它传进去，看看结果如何。

```ts
const result = await extractDataFromInvoice(
  "./invoice.pdf",
);

console.dir(result, { depth: null });
```

如你所见，我们拿到了这张发票中需要的数据。

这个例子结合了两个前面学过的能力：把任意文件传给 Vercel AI SDK，以及使用结构化数据。两者配合起来非常实用。

### 中文学习辅助：术语小词典

- **大语言模型（LLM）**：一种能理解和生成文本、并可根据文件内容完成分析任务的 AI 模型。
- **非结构化数据**：没有固定字段或表格格式的信息，例如一段文字、PDF 文档或图片。
- **结构化数据**：按照预先规定的字段组织的信息，例如“总额、币种、发票号码”这样的数据表记录。
- **Schema**：数据格式的说明书，用来规定结果应该包含哪些字段，以及每个字段是什么类型。
- **Zod**：JavaScript/TypeScript 中常用的数据校验工具，可用来定义和检查 schema。
- **Vercel AI SDK**：帮助开发者把 AI 模型接入 JavaScript/TypeScript 应用的一套工具。
- **系统提示词（system prompt）**：在任务开始时给模型的总体指令，用来说明它应该扮演什么角色、完成什么任务。
- **MIME 类型**：标识文件格式的标准名称；例如 `application/pdf` 表示 PDF 文件。
