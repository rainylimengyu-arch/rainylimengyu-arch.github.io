# VITA TAPE nutrient resource library

当前收录 39 项：2026-10-18 从 Nourished UK Stack Builder 实际界面核对的 35 项，加上用户设计图中的 Magnesium、Omega 3、L-Theanine、Collagen 四项。褪黑素不作为资源条目或可选营养素。

- `catalog.json`：可交接的数据快照，包含中英文名称、描述、图标、配图、色彩、分类、标签、参考含量和来源。
- `catalog.csv`：可用 Excel 编辑/审阅的表格。
- `source-snapshot.json`：参考站公开卡片的名称、类别、原始单位、NRV、标签和素材 URL。
- `../../src/nutrient-library.json`：页面唯一运行时数据源；更新后用同步脚本重新生成以上导出文件。
- `../../public/assets/library/`：原设计配图的新增素材、透明配图和参考材质图。生成记录随图片保留。
- `../../public/assets/tape-realistic/`：用于最终 Tape 预览的写实生成材质，保留原图和生成记录。

每条记录的 `amount.raw` 保留参考站原标示。`amount.vitaTapeAmount` 均为 null，等待实际产品规格。HydroCurc 的 95 mg / 1 mg 是两个成分，未合并；CFU 与 mg 未互换；IU 与 mcg 未擅自互换。四项设计图原料未查到该选择器中的参考量，状态为 pending。

第三方品牌名与商标只用于识别参考原料，不表示 VITA TAPE 已取得供货或授权。参考站的功效营销段落没有逐字复制，页面说明作了简短改写，不提供诊断或个人剂量建议。

## 原创成分配图 — 2026-10-18

39 项配图已统一换成原创透明 WebP：`../../public/assets/ingredients-v2/`。姜使用生姜根茎与切片，人参使用完整人参根，茶氨酸使用茶叶；其余植物使用对应根、果实、种子或花。维生素、矿物质及微生物采用有区别的成分或来源示意。

- `../../public/assets/ingredients-v2/manifest.json`：逐项记录图像主体、用途类别、查证链接、原始图集位置、尺寸、字节数和 SHA-256。
- `../../../output/ingredient-art-v2/`：内置 ImageGen 的三张原创透明图集、完整提示词、打包脚本、39 项总览，以及替换前的数据快照。
- 所有源图均为本次新生成；没有下载或复制参考网页、图库和竞品的图片像素。查证链接用于确定成分身份和视觉对应关系，不是图片授权记录。
- 食物来源图不承诺最终原料采购来源，矿物图不代表实际补充剂形态，菌株和胶原图不是真实显微照片；详情弹窗显示对应说明。原参考含量及品牌来源记录保持原值。
- `src/nutrient-library.json` 的 `artwork` 是展示图唯一来源，首页构建卡片、独立构建页及素材库同步使用同一套配图。

查证重点：[人参根](https://www.nccih.nih.gov/health/asian-ginseng)、[5-HTP 与加纳籽](https://www.mskcc.org/cancer-care/integrative-medicine/herbs/5-htp-01)、[黄芩根](https://greenplantsextracts.com/products/scutellup/)、[Lutemax 万寿菊](https://lutemax.com/)、[维生素和矿物质的食物对应](https://ods.od.nih.gov/factsheets/list-VitaminsMinerals/)、[BPL1 后生元](https://www.adm.com/globalassets/products--services/human-nutrition/products/microbiome-solutions/postbiotics/htbpl1-postbiotic.pdf/)、[LactoSpore 菌株](https://lactospore.com/about-lactospore/heyndrickxia-coagulans)。

资源预览页面：`http://localhost:4173/ingredient-library`。

## 营养卡资料 — 2026-10-18

点击卡片的图片、名称或空白处打开完整营养卡；加号仍走原有配方与组合检查。构建页、已选清单和成分库使用同一个 `src/IngredientDetails.jsx`。

39 个 `profile` 分别保存：`overview`（是什么）、`form`（参考成分形式）、`source`（一般或参考来源）、`benefits`（作用）、`quantityNote`（含量口径）、`evidence`、`considerations`、分类来源链接和核对日期。CSV 导出同步附带形式、来源、作用、证据、注意事项、链接与日期。

VITA TAPE 最终添加量、原料形式、供应商、产地和过敏原规格尚未确认。卡片将其与 35 项参考目录含量分开显示；四项设计原料不补造含量。提取物质量不等同活性物质量，矿物盐不等同元素质量，活菌 CFU 不与后生元 mg 互换。营养素生理作用、初步研究和最终产品效果也分别表述。

参考来源：https://get-nourished.com/pages/stack-builder
