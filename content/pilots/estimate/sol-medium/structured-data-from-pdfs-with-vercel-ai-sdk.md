---
title: "用 Vercel AI SDK 从 PDF 中提取结构化数据"
slug: "structured-data-from-pdfs-with-vercel-ai-sdk"
type: "post"
description: "学习如何使用 Vercel AI SDK 和 Zod Schema 从 PDF 发票中提取结构化数据，以便自动处理、存入数据库并进行查询。"
tags:
  - Vercel AI SDK
updatedAt: "2025-01-08T09:38:39.939Z"
---

从非结构化内容中提取结构化数据，是大语言模型（LLM）最实用的能力之一。

在这个例子中，我们会把一个文件交给 LLM，让它分析文件内容。

这里使用的是一份 PDF 发票。模型读取 PDF 后，会从中提取出我们指定的数据。

这样，你就能把系统里的文档转换成可存入数据库、可查询、可搜索的数据，不必再靠人工逐份整理。

### 创建 Schema

既然要得到结构化数据，我们先创建一个 `Zod` Schema，明确告诉程序和模型结果中应该有哪些字段。

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

这个 Schema 规定了六项数据：发票总额、币种、发票号码、开票方地址、开票方名称和收票方地址。

这类写法我们之前见过，不过这里有个细节值得留意：我尽可能为每个字段都写了英文说明。它们分别告诉模型要提取“发票总额”“总额使用的币种”“发票号码”“开票方地址”“开票方名称”和“收票方地址”。信息描述得越明确，LLM 正确提取数据的机会通常就越高。

### 从发票中提取数据

<Scrollycoding>

# !!steps

先创建一个 `extractDataFromInvoice` 函数。在函数内部，把 Schema 和一段简短的系统提示词传给 `generateObject`。

这个函数会接收 `invoicePath`，也就是 PDF 文件在本机文件系统中的路径。

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

中文理解版（学习辅助）：英文系统提示词的意思是：“你将收到一份发票，请从发票中提取数据。”代码仍然使用英文原文，这里只是帮助中文读者理解它的含义。

# !!steps

前面的图片示例使用了 `messages` 数组。PDF 也可以用同样的方式传入，不过这次要把内容类型设为 `file`，而不是 `image`。

这里使用 `readFileSync` 读取本机文件的原始二进制数据，再把这些数据直接交给 AI SDK。

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

中文理解版（学习辅助）：系统提示词仍然是“你将收到一份发票，请从发票中提取数据”。新增的消息内容负责把 PDF 文件本身交给模型。

# !!steps

我们还要传入 MIME 类型，明确告诉 LLM 它收到的是哪种文件。模型也许能读取文件开头用于识别格式的特殊字节（也叫“魔数”），自行判断文件类型，但直接写明类型更可靠。

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

中文理解版（学习辅助）：系统提示词的含义不变。新增的 MIME 类型声明则明确说明，这次传入的是 PDF 文件。

# !!steps

最后返回生成的对象。调用这个函数的其他代码就能拿到符合 Schema 的结构化结果。

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

中文理解版（学习辅助）：模型依然会收到同一条英文任务指令。模型按 Schema 整理好结果后，函数再把这个结果返回给调用它的代码。

</Scrollycoding>

### 运行示例

现在来实际运行一次。我准备了一份虚构的 PDF 发票，把它传入函数，看看提取结果。

```ts
const result = await extractDataFromInvoice(
  "./invoice.pdf",
);

console.dir(result, { depth: null });
```

运行后，我们会得到这份发票中需要的数据。

这个例子组合了前面学过的两项能力：把任意文件传给 Vercel AI SDK，以及让模型输出结构化数据。结合起来后，原本需要人工阅读和录入的文档，就可以交给程序自动处理。

## 中文学习辅助：术语小词典

- **大语言模型（LLM）**：能够理解和生成文本，也能根据文件内容完成分析任务的 AI 模型。
- **非结构化数据**：没有固定字段或表格格式的信息，例如普通文字、PDF 文档和图片。
- **结构化数据**：按照预先规定的字段组织的信息，例如包含“总额、币种、发票号码”的数据库记录。
- **Schema**：数据格式的“说明书”，规定结果应该包含哪些字段，以及每个字段采用什么数据类型。
- **Zod**：JavaScript 和 TypeScript 项目常用的数据校验工具，可以用它定义并检查 Schema。
- **Vercel AI SDK**：帮助开发者在 JavaScript 和 TypeScript 应用中接入 AI 模型的一套开发工具。
- **系统提示词（system prompt）**：任务开始时交给模型的总体指令，用来说明模型要完成什么任务。
- **MIME 类型**：用于标识文件格式的标准名称；本例用它告诉程序传入的是 PDF 文件。
- **二进制数据**：计算机直接读取的原始文件内容；这里指从 PDF 文件中读出的数据。
