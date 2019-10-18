## 更新日志
### 3.4.6
*2019-10-18*
- 修复 select 的清空无效的 bug

### 3.4.5
*2019-10-04*
- tree 组件 check 回调中将node 作为第三个参数返回（by 春燕）
- 穿梭框组件中增加自定义总条数字段 totalElements（by 春燕）

### 3.4.4
*2019-09-09*
- tree 组件空态时文字颜色修正（by 春燕）

### 3.4.3
*2019-06-15*
- 添加穿梭框顶部Summary的左右配置参数formats (by 大圣)
- 添加穿梭框分页配置page-sizes和load-more-text设置解决大数据量一次加载页面崩溃问题 (by 大圣)
- date-picker 输入框中输入不符合格式的日期时，清空model中的值 (by 春燕)
- 添加select分页配置data-for-paper、page-sizes和load-more-text设置解决大数据量一次加载页面崩溃问题 (by 夏倩)

### 3.4.2
*2019-06-15*
- data-time-picke 修复了第一次选择日期的时候默认选择在当前日期的bug (by 大圣)
- table的 no-data 样式按规范调整 （by 夏倩）

### 3.4.1
*2019-05-23*
- data-time-picker修复自动填充key-up事件和日历框默认的上下左右移动事件的冲突 (by 大圣)
- data-time-picker 非range模式下支持default-time = '00:00:00' 设置默认选中的时分秒 （by 大圣）

### 3.4.0
*2019-05-17*
- el-button 按规范调整hover颜色 (by 大圣)
- data-time-picker 再is-auto-complete的情况下输入完年月日后自动填充 00:00:00（by 大圣）

### 3.3.9
*2019-05-08*
- el-dropdown disable bug fixed (by 春燕)
- el-progress 添加自定义图标功能（by 大圣）
- el-message 按规范修改info状态下的背景色和图标颜色（by 大圣）

### 3.3.8
*2019-04-26*
- el-dialog limit-area 属性兼容IE修复（by 大圣）
### 3.3.7
*2019-04-24*
- el-card 添加 footer 块（by 春燕）

### 3.3.5/6
*2019-04-18*
- 优化el-tree 超过tooltip的功能，增加自定义监控是否超过元素的类标志 el-tree-tooltip-box，原来默认监控 el-tree-node__content

### 3.3.4
*2019-04-16*
- checkbox和radio button checked状态下文字也变色 (by 大圣)
- 添加dialog限制宽高功能 limited-area
### 3.3.3
*2019-04-12*
- dialog 关闭按钮位置(by 大圣)
- card header 高度
- 斑马表格 颜色调整
### 3.3.2
*2019-04-11*
- 修正一些调制出来的颜色和规范的差异(by 大圣)
### 3.3.1
*2019-04-10*
- progress 背景色 (by 大圣)
- 菜单悬浮图标也变成白色 (by 大圣)
### 3.3.0
*2019-04-10*
- 分页select框的对齐问题 (by 大圣)
- table第一列checkbox居中的问题 (by 大圣)
### 3.2.9
*2019-04-10*
- 分页输入框火狐下边框红色的bug修复 (by 大圣)
- 添加tree节点在文字过长的时候的tooltip配置

### 3.2.8
*2019-04-9*
- card 组件的样式重构 (by 大圣)
### 3.2.7
*2019-04-9*
- message box 自定义图标功能(by 大圣)
- 选项卡主题tab 边线颜色
- select 选中项在下拉中自定义图标也能变色
- menu菜单无子级菜单item的背景色修复
### 3.0.0 - 3.2.6 
- switch小尺寸添加了 size="small" (by 大圣)
- 小尺寸分页控件
- el-alert 添加show-background 属性来控制是否显示背景，默认为true
- el-alert 添加tip类型，来控制更重量级的提示操作信息
- el-alert 添加icon 属性来让用户自主配置图标
- el-menu  除了Menu原来提供的background-color、text-color和active-text-color，增加提供了 hover-text-color, active-sub-background-color, sub-background-color, hover-background-color 分别设置 鼠标悬浮菜单字体颜色、二级菜单激活背景色、二级菜单背景颜色、菜单悬浮背景色
- breadcrumb-item 上添加 linked属性来表示可以点击，默认最后一个为不可点击且深色效果

### 3.0.0
*2019-03-12*
- 新版本kyligence-ui (by 大圣)
- 按规范全面调整尺寸颜色，更新less和sass变量文件

### 2.1.9
*2019-03-11*
- refine select tag transition issue (by 夏倩)

### 2.1.8
*2019-01-31*
- fix datepicker ie10 el-flex-box width issue (by 夏倩)

### 2.1.7
*2019-01-21*
- refine select tag transition issue (by 夏倩)

### 2.1.4
*2019-01-08*
- tab nav-next/nav-pre修改size和hover状态 (by 夏倩)

### 2.1.3
*2018-12-28*
- （form表单提交的时候自动锁定第一个错误的表单元素） 中的报错修复（by  罗杰）
-  select 组件添加显示图标的slot（by  罗杰）

### 2.1.1 - 2
*2018-12-6*
- 日历框的可输入以及格式的自动填充 （by  罗杰）
- 下拉框位置计算（确保不盖住输入框或者select框）（by  罗杰）
- form表单提交的时候自动锁定第一个错误的表单元素（适合过长带滚动条的表单）（by  罗杰）
- 分页输入框非数字字符（包含e和E）过滤 （by 陆国圣）

### 2.1.0
*2018-12-6*
- 日历框的可输入以及格式的自动填充 （by  罗杰）
- 下拉框位置计算（确保不盖住输入框或者select框）（by  罗杰）
- form表单提交的时候自动锁定第一个错误的表单元素（适合过长带滚动条的表单）（by  罗杰）
- 分页输入框非数字字符（包含e和E）过滤 （by 陆国圣）

### 2.0.9
*2018-11-15*
- 给dialog添加isDragable属性，当属性为true时，可以通过拖拽dialog的title移动dialog，但不会超出可视窗口 (by 夏倩)
- Dialog对话框加入opened和closed事件（by 罗杰）

### 2.0.8
*2018-11-2*
- 修改size为small的button font-size为14px
- 修改dialog title默认500的加粗
- 修改date-range的btn group 的type
- 修改slider的show-value样式

### 2.0.7
*2018-10-22*
- 修改dialog border color
- 修改slider show-dynamic-values 样式

### 2.0.5
*2018-10-19*
- 添加slider两个新属性对应UI两个新的slider样式 (by 夏倩)

### 2.0.4
*2018-09-19*
- 修复进度条错误状态图标问题 （by 春燕）

### 2.0.3
*2018-09-5*
- 添加圆形按钮效果 （by 夏倩）

### 2.0.2
*2018-08-20*
- el-alert添加title slot：(by 大圣)
- 修复全局的box-sizing导致message box的header设置的min-height 失效：(by 春燕)

### 2.0.0
*2018-08-17*
- datetimepicker添加两个属性：
  isOnlyIcon(Boolean)，当isOnlyIcon为true时，datetimepicker组件render成icon形式，点击icon触发datetimepicker面板显示
  toggleIcon(String)，可以传入icon的className来替换默认的icon (by 夏倩)

- 添加新的变量@color-text-disabled (by 夏倩)

### 1.1.9
*2018-07-30*
- 穿梭框加入异步数据查询功能（by 罗杰）

### 1.1.8
*2018-06-28*
- message 添加 closeOtherMessages 参数，控制打开message时，是否关闭其他的message（by 黄春燕）
- 在form的vue文件里直接watch lang，验证表单错误信息，以解决所有由于中英文切换带来的验证信息lang不匹配问题 (by 夏倩)

### 1.1.7
*2018-6-19*
- form top position light-height unify for any size (by 夏倩)

### 1.1.6
*2018-6-4*
- select 文本框点击全选or focus状态控制，添加参数inputClickSelected，默认值为true (by 大圣）
- 修改tabel展开行的背景颜色 (by 夏倩）
- 修改button和input disabled状态时字体颜色 (by 夏倩）
- 修改input-number decrease icon的位置垂直居中 (by 夏倩）

### 1.1.5
*2018-5-11*

- 更新文字提示的最大高度，超过部分隐藏 (by 陈志雄）


### 1.1.4
*2018-5-03*
- 添加dialog遮罩层的打开和关闭的全局函数 "__KY_DIALOG_OPEN_EVENT__" AND "__KY_DIALOG_CLOSE_EVENT__"(by 大圣）
- 更新表单验证中英文处理的文档演示 (by 夏倩）
- 去掉dialog body的line-height (by 夏倩）
- 更新form label-position 是top时，lable的padding-bottom为6px (by 夏倩）

### 1.1.3
*2018-4-27*

- 修改select组件内置的resetInputHeight里对应每个size的高度，从default到mini的高度应该是36、32、28、26（by 夏倩）

### 1.1.2

*2018-04-25*

- 表单验证错误信息支持中英文切换（by 夏倩）
- dialog弹窗样式修复（by 夏倩）

### 1.1.1

*2018-04-23*

- 修复dropdown，下拉框位置异常的bug（by 夏倩）
- 替换所有组件中element-ui的引用为kyligence-ui（by 黄春燕）

### 1.1.0

*2018-04-18*

- 替换组件中package文件夹中element-ui的引用为kyligence-ui（by 黄春燕）
