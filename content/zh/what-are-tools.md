---
title: "什么是工具？"
slug: "what-are-tools"
type: "post"
description: "了解怎样向 LLM 定义工具、由模型选择工具，再由应用执行操作并返回结果。"
tags:
  - learn-how-llms-think
updatedAt: "2025-09-30T13:28:00.573Z"
---

向 LLM 提供工具，是通过系统提示词完成的。系统提示词也是对话历史中的一条消息，告诉 LLM 应该做什么；在这里，它还会说明可以调用哪些工具。

![向 LLM 提供工具](https://res.cloudinary.com/total-typescript/image/upload/v1759238358/ai-hero-images/xz3u7aekdbu6ujesvyup.png)

每个工具都要提供三项信息：

1. 工具名称，例如 `writeFile`。
2. 工具说明，例如 “Write a file to the file system”，意思是“向文件系统写入一个文件”。
3. 接收的参数及其类型，例如 `path` 和 `content`。

参数用 JSON Schema 描述，所以可以使用它支持的数据类型，比如对象、数组，以及其他复杂类型。

这些工具定义会被放进系统提示词中，你提供给系统提示词的其他信息则放在它们下面。这里没有什么特别复杂的机制，就是在系统提示词中加入工具定义。

译注：JSON Schema 是描述数据形状和要求的一套规则；path 表示路径，content 表示内容。本篇沿用原文对内部消息组织方式的讲解，具体 API 可能把工具定义作为单独参数提供，本次没有验证所有模型服务的内部排列方式。

## LLM 选择工具

真正有意思的地方，是让 LLM 选择工具。系统提示词先告诉它：“You have access to the following tools.” 然后，我们加上一条用户消息：“Write a new file called .gitignore.”

系统提示词的中文 Prompt（译注）：

```text
你可以使用以下工具。
```

用户消息的中文 Prompt（译注）：

```text
新建一个名为 .gitignore 的文件。
```

![选择工具](https://res.cloudinary.com/total-typescript/image/upload/v1759238359/ai-hero-images/vddikzdxcgwyvkoya6fr.png)

接下来，我们会收到一条助手消息，其中包含工具调用。它只是 LLM 发出的一条指令，说明要调用哪个工具，带有一个 `id`，以及所需参数。

在这个例子里，它要求向“.gitignore”这个路径写入一个空文件。

译注：.gitignore 是 Git 项目中用来列出哪些文件不应纳入版本记录的文件名。原文此处只创建空文件，没有编造具体忽略规则。id 是识别一次调用的编号。

## 工具调用与工具执行

这条工具调用，只是说明应该调用哪个工具的指令。目前还没有发生实际操作，助手只是生成了一条消息，仅此而已。

接下来，需要在我们的机器上执行工具。LLM 生成了消息，但真正创建文件的操作，仍然要由我们在机器上完成。

![执行工具](https://res.cloudinary.com/total-typescript/image/upload/v1759238360/ai-hero-images/qwhklgwzspsr9rkcwzum.png)

## 实现要求

这意味着，系统提示词中列出的每个工具，都要在代码库中有一个与之对应的函数。

如果工具执行成功，我们就向 LLM 发回一条用户消息。它使用与先前工具调用相同的 `id`，并说明执行工具时发生了什么。

译注：“用户消息”是原文此处的用词，不表示需要人手动输入结果。前后文描述的是应用返回工具结果；具体消息角色和格式应以所用接口为准，这里没有静默改写原文。

## 处理错误

错误处理非常重要。如果工具执行时发生错误，我们需要把错误消息交给 LLM，让它能够换一种做法。

所以，工具结果既可能表示成功，也可能表示失败。

## 完整流程

![完整流程](https://res.cloudinary.com/total-typescript/image/upload/v1759238361/ai-hero-images/vzn6tizkcivlmflel9ug.png)

我们再完整走一遍：

1. 在系统提示词中说明工具：“You have access to the following tools...”，也就是“你可以使用以下工具……”，同时传入一组 JSON Schema。
2. 发送用户消息：“Write a new file called .gitignore”，也就是“新建一个名为 .gitignore 的文件”。注意，我们不必明确要求“call this tool”（“调用这个工具”），LLM 会自己决定调用哪个工具。
3. LLM 生成一条带有所需参数的工具调用消息。
4. 我们取得这条消息，在机器上执行相应操作。
5. 我们发回结果，说明发生了什么。
6. LLM 看到完整的对话历史，再回复一段摘要。

在这个例子里，它说：“Done. What should go in there?”

中文理解：完成了。里面应该放些什么？

译注：原系统提示词只展示了引出工具列表的这句话，没有给出完整的工具定义清单；中文版同样只翻译已有内容。上述步骤是原理说明，本次没有创建文件或执行工具。

## 工具小结

这就是工具。它们让 LLM 生成特定类型的消息，然后由你接收这些消息，在机器上执行操作，再把结果返回给 LLM。

通过这么一个简单的循环，你就能构建非常强大的应用。
