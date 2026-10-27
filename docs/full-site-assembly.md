# 本地逐篇接页入口

此入口用于规格 #1、工作单 #3。先对照固定来源检查完整中文稿，再预览和接入。普通正文不需要教学 profile；沿用 `content/zh/index.json`、`content/zh/manifest.json` 和现有页面组件。

在当前工作树目录执行，使用父仓已有依赖，无需安装或复制运行环境：

```powershell
npm run page:assemble -- preview outputs/assembly/config.json
npm run page:assemble -- apply outputs/assembly/config.json
npm run sync:validate
```

配置文件路径和配置内路径均相对于工作树根目录。输入文件必须位于工作树内。`source.sha256` 从本批固定来源的 `content/source/manifest.json` 取得，不能从变化后的文件计算新值来绕过来源检查。

```json
{
  "route": "/文章原地址",
  "source": {
    "path": "content/source/文章原地址.md",
    "sha256": "替换为固定来源记录中的64位SHA-256"
  },
  "chineseFile": "content/drafts/已检查中文稿.md"
}
```

上面是字段说明模板。真实 route 使用来源 manifest 中的原地址，例如 `/a-complete-guide-to-agents-md`。源文 path 必须与 route 和 manifest 对应；根页 `/` 的源文是 `content/source/index.md`。中文稿包含现有 frontmatter（至少有非空 `title`）与正文；保留源文中除 title、description 外的 frontmatter 字段。

可选 `translationPath` 指定目标 `.md` 文件，只允许 `content/zh/` 或 `content/learning/` 内的普通路径。省略时沿用该 route 的现有译稿路径，新页按原地址存入 `content/zh/`；根页存入 `content/zh/home.md`。符号链接输出路径、其他页面占用的译稿路径会被拒绝。根页真实展示由 #6 接入。

预览返回完整目标页面、适用的辅助配置、拟写入的 manifest 记录、未完成中文目标，以及各输出文件哈希。预览不写任何内容；apply 会重新读取数据并执行全部检查，再写入目标译稿与相关记录。每次只更新一个 route，保留索引中其他页面、其他 manifest 记录和共享知识。

## 站内链接与分批缺项

原外部资源链接和英文入口必须保留。正文及 related 中，显式绝对原站 URL（例如 `https://www.aihero.dev/a-complete-guide-to-agents-md`）保留原站入口，用于原站页面、订阅或配套资源；以 `/` 开头的站内根路径用于优先打开已有中文页，缺页时回退英文。不要通过标签文字或查询参数区分这两种意图。新增本地链接默认要求已有非空页面、可渲染的 manifest 状态、正确译稿文件哈希和一致索引，不能仅凭索引里有键就宣布可用。

源文相对资源地址按来源 manifest 的 `url`（原页面地址）解析后核对，重复出现的资源入口也须保留。交付中文稿中的链接、图片及 MDX 资源属性须使用绝对 URL、以 `/` 开头的根路径或 `#` 锚点；裸相对路径会在 preview/apply 写入前被拒绝，并提示如何转换。例如 Output 页的 `generating-objects-via-output~dkm2k/solution` 应改为[完整 Solution 地址](https://www.aihero.dev/workshops/ai-sdk-v6-crash-course/generating-objects-via-output~dkm2k/solution)，不能改成站点根目录下的同名路径。

公开中文页即使使用独立 glossary，也保留导航、页脚的英文原文入口、正文和关联阅读的外部资源。术语按钮继续打开解释，旁边的 ↗ 按上述 URL 约定打开中文词条或原站资源。历史审核页显式使用 `review` 时沿用原来的中文链接筛选。

尚未制作的目标须显式记录状态和原因：

```json
{
  "linkTargets": [
    {
      "route": "/ai-coding-dictionary/token",
      "state": "planned-chinese",
      "reason": "下一批制作；当前使用原英文资源，未完成中文解释"
    },
    {
      "route": "/ai-coding-dictionary/agent",
      "state": "available-chinese"
    }
  ]
}
```

将此字段加入上述配置。正文中 planned 本地链接由现有 `articleLink` 回退至英文入口，缺项保存在目标的 `assembly.plannedChineseTargets` 中。英文入口不计作中文目标完成；已存在但失效的页面不能借 planned 状态绕过检查。辅助配置的本地 related 链接必须可用，避免直接渲染失效地址。目标完成后对引用它的页面重新预览和接入，核对、移除 planned 记录。

已有中文目标如果译稿文件、文件哈希、索引和可渲染状态均有效，只是旧 `sourceHash` 与当前固定来源不同，允许继续分批接页。preview 的 `manifest.assembly.staleChineseTargets` 和实际写入记录会列出该目标的 `route`、真实旧 `sourceHash`、`currentSourceHash`，表示目标待来源复核；不会修改目标页或宣称其已按新来源完成制作。缺文件、错译稿哈希、无效索引仍拒绝。全站 `validateContent` 继续报告版本差异，直到 #5 实际复核该目标；复核后重新接入引用页，可刷新这项装配事实。

## 可选页面辅助配置

`learning` 使用[现有辅助配置结构](E:/dev/projects/AIHero/lib/article-learning.ts)，无需另建页面系统：

```json
{
  "learning": {
    "sources": {
      "my-page-source": {
        "path": "content/source/实际原地址.md",
        "sha256": "固定来源SHA-256"
      },
      "my-page-translation": {
        "path": "content/zh/实际原地址.md",
        "sha256": "已检查中文文件的SHA-256"
      }
    },
    "profile": {
      "kind": "guide",
      "sourceIds": ["my-page-source", "my-page-translation"],
      "conceptIds": [],
      "prerequisiteIds": [],
      "start": { "title": "开始前", "cards": [] },
      "related": []
    }
  }
}
```

kind 采用已有 `guide`、`workshop-lesson` 或 `dictionary`；按需要提供 glossary、check、originalExamples 等现有字段。省略 learning 时保留目标原有 profile，新普通页不创建 profile。辅助来源文件与哈希必须真实对应；改变其他页或共享概念使用的来源哈希会被拒绝。已有目标译稿对应的专用来源路径与哈希会随目标文件更新；改变译稿目标路径时保留旧文件原件。

固定来源更新后，如旧共享证据需要归档，先由内容制作执行者保存原哈希对应的文件，再在 `learning.sources` 中为旧 source ID 只修改 `path`，保留 `sha256` 及其他已有字段。preview/apply 会检查新路径实际文件哈希，确认字节一致后才允许迁址；伪造旧哈希仍会被拒绝。当前 profile 使用新 source ID 指向新版本，例如保留 `dictionary-source` 指向已保存的旧快照，另建新 ID 对应当前系统提示词源文。入口不会自动生成归档或改写共享概念及其他页面。

## 内容结构与原例

写入前检查 Markdown/MDX 解析、标题层级顺序、表格、原行内代码、原围栏块与资源地址。只接受现有 renderer 支持的 `SkillsCta`、`SkillsNewsletterCta`、`Scrollycoding`、`details` 和 `summary`；details/summary 不接受属性，CTA 只接受字符串属性。未知 MDX、动态表达式和 import 被拒绝。展示包装应按原意转换为等价 Markdown，保留文字和链接。

原代码、命令、配置和英文 Prompt 围栏块必须原样保留且顺序不变（换行统一为 LF 后比较）。中文 Prompt 可以追加；紧邻新增围栏前标记 `中文 Prompt（译注）：` 或 `中文理解（学习辅助）`，块中必须有中文，语言只能为空、text、plaintext、md、markdown。新增代码块不能伪装成原文代码或答案。

机械检查不能证明逐句语义、中文质量、Prompt 完整翻译或浏览器显示已验收；制作执行者仍须按规格五项检查对照正文。

## 写入失败与恢复

apply 在检查完成后建立 `content/zh/.assembly-journal.json`，保存本次涉及文件的原始字节、拟写哈希和临时路径。临时文件写入并同步后逐一替换；普通写入失败自动恢复旧文件，并删除本次新建文件及空目录。

如果进程中断或磁盘无法恢复，保留 journal，后续 preview/apply 拒绝继续。恢复磁盘可写后，在同一工作树执行：

```powershell
npm run page:assemble -- recover
```

恢复会先核对当前文件是否仍为原版本或本次写入版本。若出现外部修改，拒绝覆盖并保留 journal，按报错中的路径核对冲突后处理。成功 apply 后 journal 自动删除；长期恢复使用 Git 中保存的旧内容或本批原件。该机制不提供多个文件对并行读者同时切换的数据库事务，接页时不要同时运行其他内容写入入口。

manifest 使用 `status: assembled`、真实来源/译稿哈希、装配时间、配置哈希和实际机械检查项。它不自动填制作模型、语义审查或浏览器验收声明；既有稿件变更时清除目标页沿用的旧 translatedAt 展示值。其他页面的历史记录保留。

## 工程检查

```powershell
npm run page:test
npm run sync:validate
npm run learning:validate
npm run build
```

`page:test` 包含接页回归与真实组件的 HTML 渲染检查。渲染检查验证资源链接与术语控件，不替代浏览器交互或桌面、窄屏验收；本次外链修复由内容制作执行者在三样本接页后完成真实验收。全仓 lint 与[已有基线](E:/dev/projects/AIHero/reports/full-site/lint-baseline.log)对比，只处理本次引入的错误。
