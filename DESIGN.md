---
version: alpha
name: 智慧悦读 (ZhiHui YueDu)
description: 教育阅读类微信小程序设计系统 —— 扁平、清爽、绿色系教育风格。设计稿基准 375pt，1px = 2rpx。全部色值/字号/圆角/间距提取自线上组件源码（ThorUI + XXT 组件库），与现有 App 完全一致。
colors:
  # 品牌色
  primary: "#4AD975"                # 品牌绿：全局唯一主色（主按钮、选中态、Tab 高亮、进度、强调图标）
  primary-bright: "#52EF81"         # CTA 渐变起点亮绿
  primary-container: "#EDFBF1"      # 浅绿标签底
  primary-container-high: "#CCFFDB" # 高一亮绿标签底
  # 功能色
  secondary: "#EC6144"              # 强调橙红：热度、排名、待办提醒
  tertiary: "#FFB700"               # 警示橙：星标、积分、中等级提醒
  success: "#07C160"                # 微信生态成功态
  warning: "#FF7900"
  error: "#EB0909"                  # 错误、删除
  error-bright: "#FF5436"           # 截止时间临近
  link: "#586C94"                   # 次要链接文字
  info: "#007AFF"                   # iOS 语义信息色（少用）
  # 背景与分割
  surface: "#F5F5F5"                # 页面背景
  surface-dim: "#F9F9F9"            # 次选页面背景
  surface-container: "#FFFFFF"      # 卡片、弹层、表单区块
  surface-disabled: "#F2F2F2"       # 占位/禁用底
  divider: "#EAEEF1"                # 分割线（次选 #E5E5E5）
  # 文字色阶
  on-surface: "#222222"             # 主文字（标题、正文主体）
  on-surface-medium: "#333333"      # 表单标签、列表项文字
  on-surface-secondary: "#666666"   # 次要文字（辅助说明、摘要）
  on-surface-tertiary: "#999999"    # 弱文字（时间、占位、署名）
  on-surface-disabled: "#B2B2B2"    # 禁用、箭头
typography:
  headline-lg:
    fontFamily: "-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: 20px
    fontWeight: 700
  headline-md:
    fontFamily: "-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: 18px
    fontWeight: 700
  body-lg:
    fontFamily: "-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: 16px
    fontWeight: 400
  body-md:
    fontFamily: "-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: 14px
    fontWeight: 400
  label-sm:
    fontFamily: "-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: 12px
    fontWeight: 400
rounded:
  none: 0px
  xs: 3px       # 表单提交按钮微圆角（少用，优先胶囊）
  sm: 8px       # 卡片统一圆角
  md: 12px      # 底部弹层顶部两角、居中弹窗四角
  lg: 20px      # 小型状态标签
  full: 9999px  # 胶囊按钮、胶囊标签
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  margin: 22px         # 页面左右边距
  cell-padding-y: 13px # 列表项上下内边距
  cell-padding-x: 22px # 列表项左右内边距
  input-padding-y: 13px
  input-padding-x: 15px
  section-gap: 20px    # 模块标题距上一区块
components:
  button-cta:
    height: 36px
    rounded: "{rounded.full}"
    textColor: "#FFFFFF"
    typography: "{typography.body-md}"
    backgroundImage: "linear-gradient(90deg, #52EF81, #4AD975)"
  button-cta-disabled:
    backgroundColor: "#E5E5E5"
    textColor: "{colors.on-surface-tertiary}"
  button-form:
    height: 48px
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    typography: "{typography.body-lg}"
  card:
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.sm}"
  tag:
    rounded: "{rounded.full}"
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
  list-cell:
    height: 52px
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface-medium}"
    typography: "{typography.body-lg}"
  bottom-popup:
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.md}"
  modal:
    width: 280px
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.md}"
  tab-bar:
    height: 48px
    backgroundColor: "{colors.surface-container}"
  tab-bar-item-active:
    textColor: "{colors.primary}"
  tab-bar-item-inactive:
    textColor: "{colors.on-surface-tertiary}"
  input:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-lg}"
  textarea:
    height: 100px
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface-medium}"
    typography: "{typography.body-lg}"
  actionsheet:
    height: 50px
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.md}"
  tabs-top:
    height: 40px
    backgroundColor: "{colors.surface-container}"
  searchbar:
    height: 36px
    backgroundColor: "#EDEDED"
    rounded: 4px
---

# 智慧悦读 Design System

## Overview

面向中小学生、教师、家长的**教育阅读类微信小程序**（UniApp + Vue3 + TypeScript，ThorUI 基础组件库 + XXT 业务组件库）。

视觉基调：**扁平、清爽、绿色系教育风格**——卡片化布局、轻装饰、重内容。卡片不靠阴影分层，靠浅灰页面底与白卡片的色调对比分隔。

设计基准：

- 设计稿宽度 **375pt**（iPhone 基准），Mobile 项目
- 工程单位为 rpx（750rpx = 屏幕宽），换算规则 **设计稿 1px = 2rpx**（本文档所有数值均为设计稿 px）
- 吸底元素（Tabbar、提交按钮、底部弹层）必须预留 iOS 底部安全区（Home Indicator 区域）
- 页面使用自定义导航栏时，需包含状态栏高度与返回按钮

## Colors

全部色值提取自线上组件源码，可直接信任使用。

- **品牌绿 Primary (#4AD975)**：全局**唯一**主色——主按钮、选中态、Tab 高亮、成功状态、进度、强调图标
- **CTA 渐变 (#52EF81 → #4AD975)**：卡片内主操作按钮（"去完成""开始作业"）的标准底色，横向渐变胶囊
- **浅绿底 (#EDFBF1 / #CCFFDB)**：绿色系标签底色、浅色区块背景
- **强调橙红 (#EC6144)**：热度、排名、待办提醒
- **警示红 (#FF5436 / #EB0909)**：截止时间临近、错误、删除
- **警示橙 (#FFB700 / #FFAC2D)**：星标、积分、中等级提醒
- **文字三阶**：`#222222` 主文字 → `#666666` 次要 → `#999999` 弱文字（表单标签可用 `#333333`），不新增灰色阶
- **背景**：页面 `#F5F5F5`，卡片/弹层 `#FFFFFF`，分割线 `#EAEEF1`

> ⛔ ThorUI 出厂默认蓝 `#5677FC` 与 Material 默认蓝/紫**不是**本项目主色，禁止出现在业务界面。

## Typography

系统默认字体（微信生态，不引入自定义字体）。**字重只有 regular(400) 和 bold(700) 两档**，禁止其他字重。

| 层级 | 字号 | 字重 | 颜色 | 用途 |
| ---- | ---- | ---- | ---- | ---- |
| headline-lg | 20px | 700 | `#222` | 卡片主数字（积分、次数、倒计时） |
| headline-md | 18px | 700 | `#222` | 自定义导航标题、模块区块标题 |
| body-lg | 16px | 400 | `#222` / `#333` | 正文主体、按钮文字、表单内容 |
| body-md | 14px | 400 | `#666` | 卡片摘要、次要按钮、弹窗内容 |
| label-sm | 12px | 400 | `#999` | 标签、时间、注释、底部提示 |

## Layout

- 页面左右边距 **22px**，内容在浅灰底上以白卡片流呈现
- 列表项：上下内边距 13px、左右 22px（行高约 52px）
- 模块标题距上一区块 20px；卡片内元素纵向间距取 8px 的倍数（8 / 16 / 24）
- 输入项：上下 13px、左右 15px；表单输入项以白底区块分组，项间分割线 `#EAEEF1`

**列表页（最常见模式）**：

```
┌─────────────────────────────┐
│ 自定义导航栏（返回 + 标题）      │
├─────────────────────────────┤
│ #F5F5F5 页面背景              │
│ ┌─────────────────────────┐ │
│ │ ▌ 模块标题          更多 > │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 白卡片（8px 圆角）          │ │
│ └─────────────────────────┘ │
│        已经到底了              │
└─────────────────────────────┘
```

**表单页**：输入项白底分组 + 分割线；label 16px `#333`，内容 16px `#222`，占位 `#B2B2B2`；底部吸底通栏提交按钮（品牌绿 48px 高 + 安全区）。

**详情页**：顶部头图/头区 → 标题信息白卡 → 内容区块（模块标题 + 内容）→ 底部固定操作栏（轻投影 + 安全区：渐变胶囊主操作 + 描边次操作）。

**滚动行为**：列表页支持下拉刷新、滚动到底自动加载；列表末尾居中 12px `#999` 文案"已经到底了"。

## Elevation & Depth

**扁平风格，克制用影**：

- 普通卡片**无阴影**——深度靠 `#F5F5F5` 页面底与白卡片的色调对比实现
- 吸底操作栏：轻上投影 `0 -2px 10px rgba(0,0,0,0.05)`
- 特殊强调（扫码框等极少数场景）：品牌绿光晕 `0 0 10px rgba(74,217,117,1)`
- 禁止大面积重阴影、玻璃拟态、多彩渐变背景

## Shapes

- 卡片：8px 圆角（任务卡、通知卡、白底内容卡统一）
- 小型状态标签：胶囊（或 20px 圆角）
- 卡片操作按钮 / 筛选按钮：标准**胶囊形**（全圆角）
- 底部弹层：仅顶部两角 12px 圆角；居中确认弹窗：四角 12px、宽约 280px

## Components

以下组件与线上 App 一一对应，涉及其场景时**必须按此形态设计，不得自创同类组件**。括号内为组件库内实际组件名，源码位于本项目 `组件库/` 目录。

- **模块区块标题（xxt-common-title）**：左侧品牌绿竖向标记条 **8×16px** + 18px bold `#222` 标题（间距 8px）+ 可选右侧"更多 >"（12-14px `#999` 带右箭头）
- **CTA 按钮 · 渐变胶囊（业务首选）**：胶囊形，高约 32-36px，底色 `linear-gradient(90deg, #52EF81, #4AD975)`，14px 白字，位于卡片底部右侧或通栏；禁用态浅灰底 `#E5E5E5` + `#999` 文字
- **CTA 按钮 · 通栏实心（表单提交）**：高 48px，品牌绿底（或渐变），16px 白字；加载中（菊花 + 文案不变）、禁用（浅灰底 + 灰字）
- **业务卡片（xxt-task-card / xxt-notice-card）**：白底 8px 圆角无阴影。结构自上而下：① 类型标签（12px 胶囊，`#EDFBF1` 底绿字）② 标题行（16px bold `#222`，右侧截止时间临近时 `#FF5436`）③ 摘要（14px `#666` 最多两行省略）④ 可选附件缩略图 ⑤ 底部操作行（左 12px `#999` 状态，右渐变胶囊按钮）。卡片流间距约 12px
- **列表项（tui-list-cell）**：白底通栏，左侧 16px `#333`，右侧值 14px `#999` + 右箭头 `#C0C0C0` chevron；分割线 `#EAEEF1`
- **底部弹层（tui-bottom-popup）**：页面级容器 + 全屏黑色半透明遮罩（`rgba(0,0,0,0.5)` 左右）；顶部两角 12px、白底、可带 `#E5E5E5` 拖拽指示条；底部预留安全区。**禁止设计成卡片内局部弹窗**
- **居中确认弹窗（xxt-common-modal）**：白底四角 12px、宽约 280px；标题 16-18px bold `#222`，内容 14px `#666` 居中；双按钮（取消白底灰字 + 确定品牌绿底白字）
- **底部 Tab 栏（xxt-tabs-bottom）**：白底吸底 + 顶部轻投影 + 安全区；2-5 个 tab（图标 + 12px 文字）；选中品牌绿（图标文字同步），未选中 `#999`
- **空状态（xxt-empty）**：居中插图（约 160px 宽）+ 14px `#999` 文案（"暂无数据""暂无资源"），可带次级浅绿/描边按钮
- **登录拦截态（xxt-common-unlogin）**：居中插画 + 引导文案 + 品牌绿"去登录/加入班级"按钮
- **图标（tui-icon）**：线性图标为主；16px 行内辅助 / 20px 列表卡片 / 26px tab 与大操作；颜色跟随文字层级
- **文本折叠（xxt-text-overflow）**：默认折叠 3 行 + 末行白色渐变遮罩 + "展开详情"，展开后"收起详情"（12-14px 绿色或 `#999`）
- **输入框（tui-input）**：表单输入统一形态——白底区块内一行：左侧 label 16px `#333`（最小宽 70px）+ 右侧内容 16px `#222`，占位 `#B2B2B2`，右侧可带清除按钮（`#BFBFBF`）；内边距上下 13px 左右 15px，底部分割线 `#EAEEF1`，无需外描边
- **文本域（tui-textarea）**：多行输入，默认高 100px，白底，内边距 13px 15px，文字 16px `#333`；常带字数统计（右下角 12px `#999`）
- **操作菜单（tui-actionsheet）**：页面级底部弹层，白底顶部两角 12px 圆角；列表项高 50px、文字 17px 居中（`#808080`，危险操作红色），底部独立"取消"按钮（灰底 `#F5F5F5` 或间隔条），遮罩 `rgba(0,0,0,0.5)`。用于"更多操作"分支选择
- **顶部标签页（tui-tabs）**：页面内分区切换，高 40px 白底，tab 文字 14px：未选中 `#666`、选中 **品牌绿 `#4AD975`** + 下划线滑块。⚠️ 组件源码默认选中色回落出厂蓝 `#5677fc`，设计稿中一律覆盖为品牌绿
- **搜索栏（tui-searchbar）**：页面顶部搜索形态——灰底 `#EDEDED` 输入条，高 36px、圆角 4px、内边距 8px 10px，占位"请输入搜索关键词" `#B2B2B2`，左侧放大镜图标，右侧"取消/搜索"文字按钮（14px `#666` 或品牌绿）
- **小标签（tui-tag）**：tag token 的实现组件，默认内边距 8px 13px、字号 14px；业务中统一浅绿底 `#EDFBF1` 绿字胶囊形态（见 tag token），危险标签才用红系，禁止出厂蓝
- **选择控件（tui-checkbox / tui-radio / tui-switch）**：未选中态 `#CCC` 描边（checkbox 方形 / radio 圆形 / switch 胶囊轨道）；选中态一律**品牌绿**（源码默认回落出厂蓝，必须覆盖）；switch 选中轨道品牌绿 + 白色圆钮
- **模态框（tui-modal / tui-dialog）**：通用弹窗形态——白底四角 12px 圆角、宽 84%（约 315px）、内边距 20px 32px、遮罩 `rgba(0,0,0,0.6)`；业务二次确认弹窗优先 xxt-common-modal（280px 形态），tui-modal 用于带插画/自定义结构的提示场景
- **自定义导航栏（tui-navigation-bar）**：页面顶部白底导航——含状态栏占位、返回箭头（`#333`）、居中标题 18px bold `#333`；底部 1px 分割线可选
- **图片懒加载（tui-lazyload-img）**：所有网络图片统一形态，占位底 `#E7E7E7`，默认方图约 170px，支持圆角（卡片缩略图用 8px）与淡入
- **日期时间选择（tui-datetime）**：底部弹层式选择器（挂在 tui-bottom-popup 上），面板高约 260px，含"取消/确定"顶栏（16px，确定为品牌绿）与滚轮列
- **附件上传（xxt-file-submit）**：白底区块内的附件网格形态——已选附件缩略图九宫格（含类型角标、上传中 loading、删除角标）+ "添加"虚线格按钮；支持图片/语音/视频/文件/链接类型。凡作业提交、评论附件、通知附件场景必须用此形态
- **图片签章（xxt-img-sign)**：图片上叠加可拖拽的签章/签名层（movable 拖拽定位 + 缩放），用于作业签名、盖章定位场景；设计稿表现：底图 + 半透明签章浮层 + 引导提示
- **栅格（tui-row / tui-col）**：24 栅格布局辅助，自身不呈现视觉样式，仅用于对齐

## Do's and Don'ts

- Do 全局主色只用品牌绿 `#4AD975`，CTA 用 `#52EF81 → #4AD975` 横向渐变胶囊
- Don't 引入第二主色；Don't 使用 Material 默认蓝/紫或 ThorUI 出厂蓝 `#5677FC`
- Do ThorUI 组件的选中/激活色（tui-tabs、tui-checkbox、tui-radio、tui-switch、tui-tag 等）一律显式用品牌绿 `#4AD975`——源码默认回落出厂蓝，不覆盖就会跑色
- Do 保持扁平：卡片无阴影，靠灰底白卡对比分层
- Don't 使用重阴影、玻璃拟态、大渐变背景块
- Do 所有弹层做成页面级容器 + 全屏遮罩
- Don't 做"卡片内局部弹窗"
- Do 文字只用三阶 `#222 / #666 / #999`（表单标签可用 `#333`）
- Don't 新增灰色阶或新字重（只有 400 / 700）
- Do 复用上文 Components 列出的组件形态
- Don't 自创同类组件（同类业务卡片、弹窗、空态等）
- Do 使用中文规范文案：按钮"确定/取消"、空态"暂无数据"、列表尾"已经到底了"
- Do 吸底元素（Tabbar、提交按钮、弹层）一律预留 iOS 底部安全区

## Appendix: 组件源码索引与设计代理工作协议（自定义扩展节）

### A1. 设计代理工作协议（Agent 必读）

本仓库 `https://github.com/HokageYeah/google-stitch-zhyd`（默认分支 `master`）是本项目设计规范的**唯一事实来源**。设计任何页面时按以下顺序执行：

1. **硬约束**：本文档 front matter 中的 tokens 与「Do's and Don'ts」是不可违反的硬约束，优先级最高
2. **组件源码**：凡「Components」节列出的组件，按下表直链抓取 `.vue` 源码，理解其真实结构、props 与视觉细节后再设计——这些组件均在线上成熟应用，**必须按源码形态设计，不得自创同类组件**
3. **兜底**：若某链接抓取失败，按本文档该组件的文字视觉规范设计；**不得凭空虚构组件形态或引入新主色**

### A2. 组件源码直链（raw.githubusercontent.com，可直接抓取）

**XXT 业务组件：**

| 组件 | 源码直链 |
| ---- | -------- |
| xxt-common-title 模块标题 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/XXT业务组件库/xxt-common-title/xxt-common-title.vue` |
| xxt-task-card 任务卡片 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/XXT业务组件库/xxt-task-card/xxt-task-card.vue` |
| xxt-notice-card 通知卡片 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/XXT业务组件库/xxt-notice-card/xxt-notice-card.vue` |
| xxt-common-modal 确认弹窗 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/XXT业务组件库/xxt-common-modal/xxt-common-modal.vue` |
| xxt-tabs-bottom 底部 Tab | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/XXT业务组件库/xxt-tabs-bottom/xxt-tabs-bottom.vue` |
| xxt-empty 空状态 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/XXT业务组件库/xxt-empty/xxt-empty.vue` |
| xxt-common-unlogin 登录拦截 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/XXT业务组件库/xxt-common-unlogin/xxt-common-unlogin.vue` |
| xxt-text-overflow 文本折叠 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/XXT业务组件库/xxt-text-overflow/xxt-text-overflow.vue` |
| xxt-file-submit 附件上传 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/XXT业务组件库/xxt-file-submit/xxt-file-submit.vue` |
| xxt-img-sign 图片签章 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/XXT业务组件库/xxt-img-sign/xxt-img-sign.vue` |

**ThorUI 基础组件：**

| 组件 | 源码直链 |
| ---- | -------- |
| tui-list-cell 列表项 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-list-cell/tui-list-cell.vue` |
| tui-bottom-popup 底部弹层 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-bottom-popup/tui-bottom-popup.vue` |
| tui-icon 图标 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-icon/tui-icon.vue` |
| tui-config 全局配置（语义色/尺寸出厂值） | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-config/index.js` |
| tui-input 输入框 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-input/tui-input.vue` |
| tui-textarea 文本域 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-textarea/tui-textarea.vue` |
| tui-form-button 表单按钮 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-form-button/tui-form-button.vue` |
| tui-actionsheet 操作菜单 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-actionsheet/tui-actionsheet.vue` |
| tui-tabs 顶部标签页 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-tabs/tui-tabs.vue` |
| tui-searchbar 搜索栏 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-searchbar/tui-searchbar.vue` |
| tui-tag 小标签 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-tag/tui-tag.vue` |
| tui-checkbox 复选框 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-checkbox/tui-checkbox.vue` |
| tui-radio 单选框 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-radio/tui-radio.vue` |
| tui-switch 开关 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-switch/tui-switch.vue` |
| tui-modal 模态框 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-modal/tui-modal.vue` |
| tui-dialog 对话框 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-dialog/tui-dialog.vue` |
| tui-navigation-bar 自定义导航栏 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-navigation-bar/tui-navigation-bar.vue` |
| tui-lazyload-img 图片懒加载 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-lazyload-img/tui-lazyload-img.vue` |
| tui-datetime 日期时间选择 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-datetime/tui-datetime.vue` |
| tui-text 文本 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-text/tui-text.vue` |
| tui-row 栅格行 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-row/tui-row.vue` |
| tui-col 栅格列 | `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/ThorUI组件库/tui-col/tui-col.vue` |

**工程规范：** `https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/UniApp模块化工程规范.md`

> 其余组件按同样规则拼接路径：`https://raw.githubusercontent.com/HokageYeah/google-stitch-zhyd/master/组件库/{ThorUI组件库|XXT业务组件库}/<组件名>/<组件名>.vue`。源码仅作查阅参考，禁止修改。

### A3. 单位换算与 Prompt 模板

- **单位换算**：本文档所有数值为设计稿 px（375pt 基准）；工程 rpx = 设计 px × 2
- **Stitch Prompt 模板**（可直接粘贴）：

```
为教育阅读小程序「智慧悦读」设计一个任务列表页。

约束：
- 主色 #4AD975（CTA 按钮用 #52EF81→#4AD975 横向渐变胶囊），页面背景 #F5F5F5
- 文字层级：标题 18px bold #222、正文 14px #666、辅助 12px #999
- 布局：自定义导航栏 + 模块标题（左侧 8×16px 绿色竖条 + 18px bold 标题 + 右侧"更多"）
- 任务卡片：白底 8px 圆角无阴影，含类型标签（浅绿底 #EDFBF1 胶囊）、
  标题、两行摘要、截止时间（临近用 #FF5436）、底部渐变胶囊"去完成"按钮
- 列表底部显示"已经到底了"，整体扁平风格，无重阴影
```
