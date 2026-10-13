# 内容 B 第十六批：首页、订阅与两门课程

四篇完整页面交付后，内容 B 固定 82 页正文、配置和前四项记录已全部齐备。

- 首页：完整六组 27 技能、四个学习方向、课程候补、三条评价、最新内容及作者介绍；46 个固定范围目标具备中文入口，原站 URL 保留。
- 订阅页：完整静态文案与原站入口，不创建或提交表单。
- AI 编程课程：完整课程介绍与 FAQ；保留欢迎视频资源 ID、双主题图、评价、$99 条件价。未给出的动态价格、截止日期、课时列表与视频不补造。
- AI SDK v6 课程：完整宣传、课程数字、项目、优势与评价；v5/v6 和 350 万/300 万原文差别明确保留。

首页与订阅页均复核已保存 HTML 的解压哈希及 main 语义内容，见 `html-check.json`，没有重取来源。提取重复标签去重但不丢语义，无可读取名称的企业 SVG 不猜品牌。

```sh
node reports/full-site/batches/content-b/verify-batch.mjs batch-16 > reports/full-site/batches/content-b/batch-16/structure-check.json
node reports/full-site/batches/content-b/navigation-audit.mjs
```

结构/强调 AST 通过，全 82 稿导航复扫无缺项。第五项仍待工程，未核验当前价格/权益、完成订阅报名或提供实际课程材料。
