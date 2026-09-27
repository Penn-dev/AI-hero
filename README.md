# AI Hero 中文学习版

这是 AI Hero 的授权本地中文学习镜像。它保留原站 URL 层级，以官方 Sitemap 和 Markdown twin 为内容来源，只显示中文，并保留视频及外部资源链接。

## 本地运行

```powershell
npm install
npm run dev
```

## 同步公开源文

完整发现与同步：

```powershell
npm run sync:source
```

只同步一个页面用于检查：

```powershell
npm run sync:source -- --url https://www.aihero.dev/what-is-an-llm
```

## 检查待翻译内容

该命令不调用模型，也不产生 API 费用：

```powershell
npm run sync:check
```

校验 manifest、文件存在性、哈希和实际可渲染覆盖：

```powershell
npm run sync:validate
```

## 执行翻译

密钥只通过环境变量提供，不要写入仓库：

```powershell
$env:OPENAI_API_KEY = '<由用户在本机设置>'
$env:AIHERO_TRANSLATION_MODEL = '<用户明确选择的模型>'
npm run sync:translate
```

翻译器逐页处理，默认不并发。只有通过代码块与 URL 保真检查的页面才会进入 `content/zh/index.json`，并成为站点实际可访问内容。更新时，源文哈希未变化的页面不会重复翻译。

## 覆盖率边界

- `content/source/manifest.json`：Sitemap 候选、公开 Markdown 下载状态和源文哈希。
- `content/zh/manifest.json`：翻译状态、模型和译文哈希。
- `content/zh/index.json`：当前站点实际渲染的中文页面。
- 登录态内容不会读取或导出浏览器 Cookie。它需要通过已登录浏览器单独盘点，或在站方提供受支持的内容 API 凭据后纳入自动同步。
