---
title: "文件系统"
slug: "filesystem"
type: "dictionary"
updatedAt: "2026-09-24T11:59:36.000Z"
---

[AI 编码词典](/ai-coding-dictionary)

工具与环境

# 文件系统

由文件和目录组成的树形结构，智能体在其中读取、写入和执行操作。它是编程智能体默认使用的环境。

![Matt Pocock](https://res.cloudinary.com/total-typescript/image/upload/c_limit,w_96/f_auto/q_auto/v1728059672/matt-pocock_eyjjli?_a=BAVMn6DY0)

Matt Pocock

由文件和目录组成的树形结构，[智能体](/ai-coding-dictionary/agent)在其中读取、写入和执行操作。它是编程智能体默认使用的[环境](/ai-coding-dictionary/environment)类型。[AGENTS.md](/ai-coding-dictionary/agents-md)、[Skill](/ai-coding-dictionary/skill)、源代码、构建脚本和[工具](/ai-coding-dictionary/tool)配置都保存在文件系统中。[智能体执行框架](/ai-coding-dictionary/harness)说“在你的项目中启动”时，就是让智能体面向某个文件系统工作。

智能体只能通过[工具调用](/ai-coding-dictionary/tool-call)接触它，例如读取文件、写入文件、运行 shell 命令。磁盘上的任何东西，都要经过工具调用加载后，才会进入[上下文窗口](/ai-coding-dictionary/context-window)。所以，即使代码仓库远大于窗口，智能体也能在其中工作：文件系统保存全部内容，上下文只保存当前任务已经读取的部分。有些执行框架默认会把当前目录的文件名加载进上下文窗口，加载的是目录树，不是文件内容。这些文件名就像[上下文指针](/ai-coding-dictionary/context-pointer)：智能体看到有哪些东西，再读取需要的文件。

而且，这个文件系统与你共享。智能体编辑的文件，就是你在编辑器中打开、用 git 比较差异的同一批文件。文件系统是共同的工作空间，你在这里检查智能体做了什么。

> **译注：目录树与差异。** 目录就是文件夹，目录树展示文件夹如何逐层包含文件。shell 是执行命令的程序；Git 是版本管理工具，可以比较文件改动。只看到了文件名，不代表已经读过文件内容。

_用法：_

**英文原例**

> Why isn't it picking up my AGENTS.md?

**中文理解**

“为什么它没有读到我的 AGENTS.md？”

**英文原例**

> It's running against a different filesystem — the [sandbox](/ai-coding-dictionary/sandbox) mounted the parent dir, not the project root. Repoint the harness.

**中文理解**

“它面对的是另一个文件系统。[沙箱](/ai-coding-dictionary/sandbox)挂载了上一级目录，而不是项目根目录。重新指定执行框架的位置。”

> **译注：挂载与项目根目录。** 挂载是把一个目录提供给运行环境访问；项目根目录是项目最外层的目录。示例指出应核对实际提供给智能体的目录。

[上一个词条：环境](/ai-coding-dictionary/environment) · [下一个词条：工具](/ai-coding-dictionary/tool)

## 想学的不只是词汇？

加入 AI Hero，获取实用技能、关于 AI 工程的思考，以及帮助你走在前面的资源。

> **译注：原站订阅入口。** 这一部分是原页面的订阅区，不是上面的教学正文。原站表单包含“名字”和“电子邮箱（必填）”，按钮为“获取 AI Hero 更新”，并说明“不会发送垃圾邮件，随时可以退订”。需要订阅时，请打开[原站页面](https://www.aihero.dev/ai-coding-dictionary/filesystem)使用其表单；本页不提供订阅服务。

**分享（原站入口）**

[分享到 X](https://x.com/intent/tweet?text=https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2FfilesystemFilesystem%20%20by%20%40mattpocockuk) · [分享到 Bluesky](https://bsky.app/intent/compose?text=Filesystem%20%20by%20%40mattpocock.com%0A%0A%20%20%20%20%20%20%20%20https%3A%2F%2Fwww.aihero.dev%2Fai-coding-dictionary%2Ffilesystem) · [分享到 LinkedIn](<https://linkedin.com/shareArticle?mini=true&url=https://www.aihero.dev/ai-coding-dictionary/filesystem?author=Matt Pocock>)

“复制网址”是原站的分享控件；需要分享原文时可从[原文页面](https://www.aihero.dev/ai-coding-dictionary/filesystem)复制地址。
