# VITA TAPE

按照用户提供的 VITA TAPE 设计制作的响应式品牌网站、独立配方页面与营养素资源库。本地素材和字体随源码提供，无需 API Key。

## 本地运行

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4173
```

| 页面 | 地址 |
| --- | --- |
| 品牌首页 | http://localhost:4173/ |
| About Us | http://localhost:4173/about-us |
| Build Your Tape | http://localhost:4173/build-your-tape |
| Our Science | http://localhost:4173/our-science |
| Reviews | http://localhost:4173/reviews |
| 营养素资源库 | http://localhost:4173/ingredient-library |

已有依赖时无需重复安装。部署到静态服务器时，需要将以上页面路由回退到 `index.html`；随附 Sites worker 已支持该行为。

## 已实现

- 首页采用已选定的宽屏阳光首屏；桌面导航与 Banner 填满第一屏。保留原有顺序：生活图文介绍 → 内嵌营养素选择与口味 → 紧凑 Reviews → 四卡 Our Science → 四项理念 → 海岸日落 CTA。只移除介绍段的小字 OUR WHY，保留主标题、正文和三个图标。
- 首页保留八张营养素预览卡；卡面打开完整营养卡，独立加号按组合规则增删。摘要按钮为 **Build Your Tape**，保存当前草稿后进入精确地址 `/build-your-tape` 的第一步，保留已选成分和口味；空选择也可进入。
- 共享导航依次为 Home、Build Your Tape、Our Science、Reviews、Why VITA TAPE；右上角及移动导航中的 **BUBU补补** 均在新标签页打开用户提供的 [BUBU 网站](https://bubu-care-daily.yvonneniu.chatgpt.site)。此外链不代表问卷已接通 BUBU 登录、报告传输或营养师审核服务。
- Build Your Tape 首屏采用用户选择的第 6 张科技工艺方向：七条独立营养条通过玻璃/金属工艺台连接成七色糖带。生产背景为 `public/assets/page-heroes/build-precision-v3.webp`，文字与按钮仍是可交互 HTML；原图、提示词、来源与实装对照保存在 `../output/build-hero-option6-implementation-2026-10-20/`。
- 四个独立页面采用图文正文：About 的生活故事与材料设计；Builder 的材料科技、口味和日常场景；Science 的六个图文章节；Reviews 的生活照片、真实评价空状态和私有故事草稿。
- 独立页面包含 39 项资源、分类筛选、中英文搜索、详细说明与参考含量。
- 选择最多七项营养素，实时更新最终 Tape、数量与清单。没有进度条或七点进度追踪。
- Tape 使用写实颗粒材质、透光、边缘厚度与阴影；选择改变颜色，预览外部尺寸保持固定。
- 桌面侧栏预览；手机底部包含小型 Tape，点击可打开完整实时预览。
- 三步流程：选择营养素 → 选择口味 → 命名与保存。口味支持方向键。
- 步骤使用 `?step=flavor` / `?step=review` 表示，刷新恢复当前步骤和草稿。
- 首页与独立页面共享草稿；配方支持本地保存、查看、编辑和清除。独立配方页保留七个可编辑 Starter Rainbows、组合检查、适用性分流和真实的 Save My Formula 保存动作。
- Reviews 的主题筛选控制明确标注为示意的照片图库；点击可打开照片对话框，没有伪造可播放视频。当前尚无真实评价，不展示虚构姓名、引语、评分或验证标记。
- 资源库可预览每项营养素并下载 JSON / CSV。
- 键盘焦点、对话框焦点限制、Escape 关闭与减少动画偏好。

## 营养素资源

`src/nutrient-library.json` 是唯一运行时数据源，包含名称、图标、配图、描述、颜色、分类、参考含量、NRV 和来源。资源说明见 [resources/nutrients/README.md](resources/nutrients/README.md)。

当前共 39 项：2026-10-18 从 [Nourished UK Stack Builder](https://get-nourished.com/pages/stack-builder) 实际界面核对的 35 项，加上设计图中的 Magnesium、Omega 3、L-Theanine、Collagen 四项。褪黑素不作为资源条目或可选营养素。

35 项的参考单位与标示保持原样；四项设计图原料的含量待确认。所有 `amount.vitaTapeAmount` 均为 `null`，参考站含量不会作为 VITA TAPE 的最终配方量。来源、NRV、图片地址及生成素材记录随资源保留。

修改数据后同步导出并验证：

```bash
npm run sync:resources
npm run test:nutrients
```

脚本会生成 `resources/nutrients/catalog.json` / `catalog.csv` 及 `public/resources/nutrients/` 中的下载文件。CSV 可供表格审阅；运行页面始终读取源 JSON。

## 修改入口

| 文件 | 用途 |
| --- | --- |
| `src/App.jsx` | 品牌首页、共享导航与首页交互 |
| `src/BuilderPage.jsx` | 独立配方流程、资源库、营养素卡片与详情 |
| `src/LandingHero.jsx` / `src/marketing.css` | 五页共享首屏、独立页面样式和响应式布局 |
| `src/MarketingPages.jsx` | About Us、Our Science、Reviews 正文，照片筛选/对话框与本地故事草稿 |
| `src/editorial.css` | 三个品牌独立页的图文正文样式；不改变共享首屏 |
| `src/builder-editorial.css` | 配方页科技图文、口味、生活照片与 FAQ 的隔离样式 |
| `src/science-content.json` / `resources/science/our-science-source.md` | 用户提供的 Science 全文与结构化运行时内容 |
| `src/TapePreview.jsx` | 写实最终 Tape 预览 |
| `src/components.jsx` | 按钮、图标、对话框和口味组件 |
| `src/nutrient-library.json` | 营养素资源主数据 |
| `src/data.js` | 分类、口味、默认配方与草稿读取；历史示例评价不对外展示 |
| `src/main.jsx` | 页面路由入口 |
| `src/styles.css` | 首页与共享视觉样式 |
| `src/builder.css` | 独立页面、资源库和写实 Tape 样式 |
| `public/assets/` | 原设计素材、参考素材、生成素材及记录 |
| `public/assets/editorial/` | 十二张新增科技、材料与生活场景 WebP；全部为示意素材 |
| `../output/editorial-assets-2026-10-19/` | 新正文素材的原始输出、提示词与生成来源记录 |
| `public/fonts/` | Bodoni Moda / Inter 本地字体及许可证 |
| `resources/nutrients/` | 可交接资源导出、来源快照与说明 |
| `design-qa.md` / `qa/` | 验证记录与最终截图 |

## 打包与验证

```bash
npm run build
npm run test:sites
npx prettier --check src index.html
```

Build 会先同步并验证资源，然后输出 `dist/client/` 静态网站、`dist/server/index.js` 与 `dist/.openai/hosting.json`。

## 当前范围

配方草稿和已保存配方只存储在当前浏览器的 localStorage：`vita-tape.draft.v1`、`vita-tape.formula.v1`。页面未连接订单、支付、账户、库存、物流、订阅扣费或服务器存储，也未公开发布。

默认三项示例选择为 Vitamin B12、Magnesium、Omega 3，口味为 Citrus Burst。糖带预览、数量和清单使用同一选择状态。

首页和 Reviews 页不展示虚构评分或用户见证。Reviews 的故事草稿仅保存到当前设备（`vita-tape.story-draft.v1`），可恢复和清除，不会提交或发布。照片筛选和查看功能针对示意照片，不代表已收集真实评价或视频。

Science 页面保留用户全文及完整学术创业模拟说明，六个章节锚点保持 `01-formulation-science` 至 `06-freshness-engineering` 的既有 ID。NTU、SUTD、江南大学、NUS 的官方 logo 明确列为潜在合作机构，不表示已建立合作或机构背书。Logo 图源见 `public/assets/universities/sources.json`。

新增正文十二张 WebP 位于 `public/assets/editorial/`，包含六张 Science 机制图和六张生活/设计/彩色材料图；来源保留于 `../output/editorial-assets-2026-10-19/`。所有生成的人物、实验室、制造和产品场景均为示意，不能作为真实用户见证、已完成检测、制造能力或产品表现的证据。

成分量、供货、检测、制造和服务承诺需以真实产品资料确认；本版本不提供诊断或个人剂量建议。2026-10-19 的 V7 首页与独立页图文正文落实记录见 `design-qa.md`；该报告集中记录源码设计对比、浏览器验证、截图和适用边界，以报告中的具体检查结果为准。此次已获用户明确授权编程，先前设计稿阶段的“待实施”状态由本次实现取代；网站仍未公开发布。

视觉方向以用户提供的 VITA TAPE 设计为准。用户最新决定保留直接的最终 Tape 预览，已覆盖参考图中的进度条设计。
# GitHub Pages

Website: https://rainylimengyu-arch.github.io/

Repository: https://github.com/rainylimengyu-arch/rainylimengyu-arch.github.io

The `main` branch contains the website source. The `gh-pages` branch contains only the generated `dist/client` files and is the GitHub Pages publishing source. Run `npm ci`, `npm run build:github` and `node --test tests/*.test.mjs` before publishing an update. Copy the completed `dist/client` contents to the `gh-pages` branch after the checks pass; GitHub Pages then publishes the branch automatically.

`build:github` keeps all six known routes directly accessible and refreshable through directory indexes. The existing `build` command and Sites worker packaging remain available.

The BUBU header entry opens https://bubu-care-daily.yvonneniu.chatgpt.site in a new tab. The website remains an academic product demonstration: publication does not create real orders, activate Plus membership or submit health reports for BUBU review.

