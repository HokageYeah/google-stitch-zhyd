---
name: zhihuiyuedu-ui-design
description: 众享智阅「智慧悦读」微信小程序 UI 设计规范技能。凡为该项目产出任何 UI 设计（页面设计、组件设计、原型拆分出图），必须先使用本技能：通读 DESIGN.md，按其中 tokens、Components 形态与组件源码出图。触发词：智慧悦读、众享智阅、小程序 UI 设计、原型拆分、设计图、DESIGN.md。
---

# 智慧悦读 UI 设计规范（设计前必读）

本技能约束一件事：**为「智慧悦读」小程序做的一切 UI 设计，必须严格遵循 `DESIGN.md` 这一份设计规范**，不自创风格、不引入规范外颜色/字重/组件形态。

`DESIGN.md` 是整个小程序移动应用的整体设计基调，同时内置了全部可用组件的源码直链索引——需要哪个组件，就按规范用哪个组件的 UI 形态设计。

## 1. 唯一事实来源

| 优先级 | 来源 | 用途 |
|---|---|---|
| ① 在线最新版 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/DESIGN.md` | 能联网时必读，与快照不一致时以此为准 |
| ② 技能内置快照 | 本技能 `assets/DESIGN.md` | 离线/抓取失败时兜底，内容为同一份规范 |

## 2. 设计工作流（每次设计必须按序执行，不可跳步）

### 第一步：通读 DESIGN.md
设计开始前完整通读，重点记住四块：
- **YAML front matter tokens**（colors / typography / rounded / spacing / 组件 tokens）——硬约束，设计值从这里取
- **Components 各组件形态描述**——项目中该类组件的实际样子
- **Do's and Don'ts**——红线
- **Appendix A2 组件源码直链索引**——需要组件真实结构时按链接抓取 `.vue` 源码

### 第二步：组件对号入座
设计需求中出现下列场景时，**必须使用对应组件的 UI 形态**（形态详见 DESIGN.md Components，源码见 Appendix A2 直链）：

| 设计场景 | 必须使用的组件 |
|---|---|
| 主操作按钮 | CTA 渐变胶囊按钮（#52EF81→#4AD975） |
| 表单/次级按钮 | tui-form-button |
| 模块/区块标题 | xxt-common-title（左侧 8×16px 品牌绿竖条 + 18px bold 标题 + 可选"更多 >"） |
| 卡片容器 | 白色卡片（8px 圆角、无阴影，页面底 #F5F5F5） |
| 任务/作业卡片 | xxt-task-card（禁止自创同类卡片结构） |
| 通知卡片 | xxt-notice-card（禁止自创同类卡片结构） |
| 底部 Tab 栏 | xxt-tabs-bottom（白底吸底 + 安全区，选中品牌绿） |
| 空状态 | xxt-empty（"暂无数据/暂无资源" + 约 160px 插图） |
| 登录/加班级拦截 | xxt-common-unlogin（插画 + 引导 + 品牌绿按钮） |
| 图标 | tui-icon（16/20/26px 三档，颜色随文字层级） |
| 列表项/单元格 | tui-list-cell |
| 确认弹窗 | xxt-common-modal（业务首选）/ tui-modal、tui-dialog |
| 底部弹层 | tui-bottom-popup |
| 操作菜单 | tui-actionsheet |
| 输入框 / 文本域 | tui-input / tui-textarea |
| 顶部标签页 | tui-tabs（选中态必须品牌绿） |
| 搜索栏 | tui-searchbar |
| 小标签 | tui-tag（业务用 #EDFBF1 绿胶囊） |
| 选择控件 | tui-checkbox / tui-radio / tui-switch（选中态必须品牌绿） |
| 自定义导航栏 | tui-navigation-bar |
| 图片缩略图 | tui-lazyload-img |
| 日期时间选择 | tui-datetime |
| 附件上传 | xxt-file-submit |
| 图片签章 | xxt-img-sign |
| 文本溢出省略 | xxt-text-overflow |

未列场景先查 DESIGN.md Appendix A2 索引；索引里没有的才允许用基础元素（白卡 + 文本 + 品牌绿）组合，**禁止虚构同类新组件**。

### 第三步：按硬约束出图（见第 3 节），并逐条自检 Do's and Don'ts。

## 3. 最低限度硬约束（任何情况下不得违反）

1. **主色唯一**：品牌绿 `#4AD975`；CTA 按钮用 `#52EF81→#4AD975` 渐变胶囊。禁止 ThorUI 出厂蓝 `#5677FC`、禁止 Material 蓝/紫。
2. **选中/激活态一律品牌绿**（tabs、checkbox、radio、switch、tag 等）——组件源码默认回落出厂蓝，不显式覆盖就会跑色。
3. **扁平设计**：白色卡片 8px 圆角、无阴影；页面背景 `#F5F5F5`。
4. **文字三层**：`#222`（主）/ `#666`（次）/ `#999`（辅助），表单标签 `#333`；字重只用 400/700。
5. **画板与单位**：375pt 宽设计基准；1px = 2rpx；底部固定元素留安全区（safe-area）。

## 4. 输入类型处理

用户可能提供以下任一输入，统一按此流程：
1. **文字设计需求** → 直接进入第 2 节工作流。
2. **原型 HTML / 原型图 / PRD 文档** → 先**拆分页面**：一屏一页，输出页面清单（每页注明页面名 + 将使用的组件）→ 再逐页按 DESIGN.md 完成 UI 设计。
3. 每页产出需达到**可直接交付使用的 UI 设计图**质量：真实文案（不 lorem）、真实组件形态、符合全部硬约束。

## 5. 兜底规则

- 组件源码直链抓取失败 → 按 DESIGN.md 文字规范（Components 形态描述）设计，不得凭想象发挥。
- assets/DESIGN.md 与在线版冲突 → 以在线 raw 版为准。
- 规范未覆盖的场景 → 用最朴素的规范内元素组合（白卡 + 三层文字 + 品牌绿），不新增颜色、字重、阴影。
