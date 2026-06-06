# 小熊AI导航

面向普通用户的 AI 工具导航与使用指南。项目按真实场景、任务类型和工具能力组织内容，帮助学生、上班族、创作者、开发者和小团队更快判断“该先试哪个 AI 工具”。

## 项目内容

- AI 工具列表：覆盖聊天助手、PPT 生成、翻译、图像生成、图像编辑、代码辅助和数据分析等方向。
- 场景导航：从学习写作、办公提效、内容创作、开发自动化等真实需求进入。
- 使用指南：提供工作流、风险提醒、核对清单和常见问题。
- 工具对比：按人群、预算、难度、产出要求给出选择建议。
- 工具详情页：说明适合人群、典型用途、替代工具、价格提示、限制和最后更新时间。

## 技术栈

- Next.js 13 App Router
- React 18
- TypeScript
- Tailwind CSS
- lucide-react

## 本地运行

```bash
npm install
npm run dev
```

开发服务默认运行在：

```text
http://localhost:8080
```

## 可用脚本

```bash
npm test
npm run build
npm run lint
```

`npm test` 目前覆盖内容数据适配和工具页 metadata 生成。`npm run build` 会执行 Next.js 生产构建。

## 数据来源与降级

首页优先尝试从 Notion 数据库读取工具列表：

- `NOTION_KEY`
- `NOTION_PAGE_ID`

如果 Notion 未配置、接口不可用或返回数据不完整，页面会回退到仓库内的本地工具数据，避免首页直接不可用。

## 内容维护原则

- 工具价格、授权、可用地区和功能变化较快，详情页只做选择参考，不替代官网说明。
- 正式订阅、商用或处理敏感资料前，应再次查看工具官网条款。
- 新增工具时，请同步补充 `lastUpdated`、适合人群、典型用途、优点、限制和替代工具。
- 新增导航维度时，优先从用户任务出发，而不是只按技术分类堆列表。

## 目录结构

```text
app/
  page.tsx                 首页壳层和主要状态
  home-content.tsx         首页场景、指南和对比入口
  navigation-data.ts       侧边栏、任务筛选和工具分类数据
  tools/
    tool-data.ts           本地工具详情数据
    notion-adapter.ts      Notion 数据适配层
    [slug]/page.tsx        工具详情页
  guides/                  使用指南
  scenarios/               使用场景
  compare/                 工具对比
components/ui/             基础 UI 组件
tests/                     轻量单元测试
```

## 部署

项目可部署到 Vercel 或其他支持 Next.js 的平台。部署前建议配置：

- `NEXT_PUBLIC_SITE_URL`
- `NOTION_KEY`
- `NOTION_PAGE_ID`
- `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT`（如需要广告）

## 许可证

MIT
