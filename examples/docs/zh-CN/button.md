<script>
  module.exports = {
    data() {
      return {
        lang: 'zh-cn'
      }
    },
    methods: {
      changeLang (lang) {
        this.lang = lang
      }
    }
  }
</script>
<style>
  .demo-box.demo-button {
    .el-row {
      margin-bottom: 10px;
    }
    .el-button + .el-button {
      margin-left: 10px;
    }
    .el-button-group {
      margin-bottom: 20px;

      .el-button + .el-button {
        margin-left: 0;
      }

      & + .el-button-group {
        margin-left: 10px;
      }
    }
  }
</style>

## Button 按钮
:::tip 
新规范调整内容：
* ##### 新规范中规定设计稿中默认只能有两种尺寸的按钮（medium默认和small），medium调整为默认按钮，高度30px，small对应高度24px。如果有其他意外情况。请提出给设计师矫正。另外添加了 big 34px  mini 22px 这两种 超大和 极小的尺寸作为意外情况的备用。
* ##### 对 button 文字增加了最小宽度（详见示例一）。

注意修改事项：
  * ##### 请注意把页面原来用mini的换成small。
  * ##### 默认尺寸不需要额外加medium了。
:::

### 按钮文字增加最小宽度
big 按钮最小宽度为 42px; medium 按钮最小宽度为 38px; small 按钮最小宽度为 34px;

:::demo 
```html
<div>
  <el-button type="primary" size="big" icon="el-ksd-icon-add_22">按钮</el-button>
  <el-button type="primary" icon="el-ksd-icon-add_22">按钮</el-button>
  <el-button type="primary" size="small" icon="el-ksd-icon-add_16">按钮</el-button>
</div>
```
:::

### 规范要求按钮用法
主要分三种层次的按钮，主要按钮(primary)、次要按钮(default)、次次要按钮(plain)。
dialog、messagebox 上的取消按钮用的是 次次要按钮 ，确认或者提交按钮用的是 次要按钮

:::demo 
```html
<div>
  <el-button type="primary">主要按钮</el-button>
  <el-button>次要按钮</el-button>
  <el-button plain>次次要按钮</el-button>
</div>
```
:::

### 禁用状态

各种规范类型的按钮的 disable 状态

:::demo 
```html
<div>
  <el-button type="primary" disabled>主要按钮</el-button>
  <el-button disabled>次要按钮</el-button>
  <el-button plain disabled>次次要按钮</el-button>
</div>
```
:::

### 按钮尺寸用法，默认 medium 
主要两种尺寸 medium 和 small，默认是 medium，另外big 和 mini 两种尺寸留作备用
:::demo 
```html
<div>
  <span>medium: </span>
  <el-button type="primary">主要按钮</el-button>
  <el-button>次要按钮</el-button>
  <el-button plain>次次要按钮</el-button>
</div>

<div style="margin: 20px 0">
  <span>small: </span>
  <el-button type="primary" size="small">主要按钮</el-button>
  <el-button size="small">次要按钮</el-button>
  <el-button plain size="small">次次要按钮</el-button>
</div>

<hr>
<h4 style="margin: 40px 0 20px 0">big 和 mini 两种尺寸留作备用</h4>

<div style="margin: 20px 0">
  <span>big: </span>
  <el-button type="primary" size="big">主要按钮</el-button>
  <el-button size="big">次要按钮</el-button>
  <el-button plain size="big">次次要按钮</el-button>
</div>

<div style="margin: 20px 0">
  <span>mini: </span>
  <el-button type="primary" size="mini">主要按钮</el-button>
  <el-button size="mini">次要按钮</el-button>
  <el-button plain size="mini">次次要按钮</el-button>
</div>
```
:::

### 文字按钮

没有边框和背景色的按钮，你可以使用`text`属性来定义按钮是否是文本样式，它接受一个`Boolean`值。如果是文字类链接，不用 el-button 这个组件

:::demo 
```html

<h4 style="margin: 20px 0">纯文字按钮（默认大小）</h4>
<div style="margin: 20px 0">
  <el-button type="primary" text>Kyligence</el-button>
  <el-button type="info" text disabled>Kyligence</el-button>
</div>

<h4 style="margin: 20px 0">纯文字无背景按钮（默认大小）</h4>
<div style="margin: 20px 0">
  <el-button nobg-text>Kyligence</el-button>
  <el-button nobg-text icon="el-ksd-icon-0_placeholder_22">Kyligence</el-button>
  <el-button nobg-text icon="el-ksd-icon-0_placeholder_22"></el-button>
  <el-button nobg-text disabled>Kyligence</el-button>
</div>
<div style="margin: 20px 0">
  <el-button size="small" nobg-text>Kyligence</el-button>
  <el-button size="small" nobg-text icon="el-ksd-icon-0_placeholder_22">Kyligence</el-button>
  <el-button size="small" nobg-text icon="el-ksd-icon-0_placeholder_22"></el-button>
  <el-button size="small" nobg-text disabled>Kyligence</el-button>
</div>

<h4 style="margin: 20px 0">带右侧 icon 的文字按钮（默认大小）</h4>
<div style="margin: 20px 0">
  <el-button type="primary" icon="el-ksd-icon-add_22" iconr="el-ksd-icon-arrow_down_22">展开</el-button>
  <el-button type="primary" iconr="el-ksd-icon-arrow_down_22">展开</el-button>
  <el-button type="primary" size="small" iconr="el-ksd-icon-arrow_down_22">展开</el-button>
  <el-button text type="primary" iconr="el-ksd-icon-arrow_down_22">展开</el-button>
  <el-button type="info" text disabled iconr="el-ksd-icon-arrow_up_22">收起</el-button>
</div>

<h4 style="margin: 20px 0">带右侧 icon 的文字按钮（small）</h4>
<div style="margin: 20px 0">
  <el-button text type="primary" size="small" iconr="el-ksd-icon-arrow_down_16">展开</el-button>
  <el-button type="info" text disabled size="small" iconr="el-ksd-icon-arrow_up_16">收起</el-button>
</div>
```
:::

### 纯图标按钮

两个版本，跟按钮齐高的icon-button 和 padding 更小的icon-button-mini

:::demo 
```html
<div>
  <el-tooltip content="新建模型" placement="top">
    <el-button icon-button icon="el-ksd-icon-arrow_down_22" size="big"></el-button>
  </el-tooltip>
</div>
<div style="margin: 40px 0 20px 0">
  <el-tooltip content="新建模型" placement="top">
    <el-button type="primary" icon-button icon="el-ksd-icon-add_22" size="big"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button icon-button icon="el-ksd-icon-add_22" size="big"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button plain icon-button icon="el-ksd-icon-add_22" size="big"></el-button>
  </el-tooltip>

  <el-tooltip content="新建模型" placement="top">
    <el-button type="primary" icon-button-mini icon="el-ksd-icon-add_22" size="big"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button icon-button-mini icon="el-ksd-icon-add_22" size="big"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button plain icon-button-mini icon="el-ksd-icon-add_22" size="big"></el-button>
  </el-tooltip>
</div>

<div style="margin: 40px 0 20px 0">
  <el-tooltip content="新建模型" placement="top">
    <el-button type="primary" icon-button icon="el-ksd-icon-add_22"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button icon-button icon="el-ksd-icon-add_22"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button plain icon-button icon="el-ksd-icon-add_22"></el-button>
  </el-tooltip>

  <el-tooltip content="新建模型" placement="top">
    <el-button type="primary" icon-button-mini icon="el-ksd-icon-add_22"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button icon-button-mini icon="el-ksd-icon-add_22"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button plain icon-button-mini icon="el-ksd-icon-add_22"></el-button>
  </el-tooltip>
</div>

<div style="margin: 40px 0 20px 0">
  <el-tooltip content="新建模型" placement="top">
    <el-button type="primary" icon-button icon="el-ksd-icon-add_16" size="small"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button icon-button icon="el-ksd-icon-add_16" size="small"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button plain icon-button icon="el-ksd-icon-add_16" size="small"></el-button>
  </el-tooltip>

  <el-tooltip content="新建模型" placement="top">
    <el-button type="primary" icon-button-mini icon="el-ksd-icon-add_16" size="small"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button icon-button-mini icon="el-ksd-icon-add_16" size="small"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button plain icon-button-mini icon="el-ksd-icon-add_16" size="small"></el-button>
  </el-tooltip>
</div>

<div style="margin: 40px 0 20px 0">
  <el-tooltip content="新建模型" placement="top">
    <el-button type="primary" icon-button icon="el-ksd-icon-add_16" size="mini"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button icon-button icon="el-ksd-icon-add_16" size="mini"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button plain icon-button icon="el-ksd-icon-add_16" size="mini"></el-button>
  </el-tooltip>

  <el-tooltip content="新建模型" placement="top">
    <el-button type="primary" icon-button-mini icon="el-ksd-icon-add_16" size="mini"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button icon-button-mini icon="el-ksd-icon-add_16" size="mini"></el-button>
  </el-tooltip>
  <el-tooltip content="新建模型" placement="top">
    <el-button plain icon-button-mini icon="el-ksd-icon-add_16" size="mini"></el-button>
  </el-tooltip>
</div>

<div style="margin: 40px 0 20px 0">
  <el-tooltip content="新增配置" placement="top">
    <el-button type="primary" icon="el-ksd-icon-add_16" circle size="small"></el-button>
  </el-tooltip>
  <el-tooltip content="新增配置" placement="top">
    <el-button icon="el-ksd-icon-add_16" circle size="small"></el-button>
  </el-tooltip>
  <el-tooltip content="新增配置" placement="top">
    <el-button plain icon="el-ksd-icon-add_16" circle size="small"></el-button>
  </el-tooltip>
</div>

<div style="margin: 40px 0 20px 0">
  正常状态: 
  <el-tooltip content="查看文档" placement="top">
    <i class="el-icon-document el-button-only-icon"></i>
  </el-tooltip>
</div>

<div style="margin: 20px 0">
  disable 状态: 
  <el-tooltip content="需要满足 xx 状态，才可查看" placement="top">
    <i class="el-icon-document el-button-only-icon is-disabled"></i>
  </el-tooltip>
</div>
```
:::

### 文字 + icon

各种规范类型的按钮 前缀加 icon 的情况

:::demo 
```html
<div>
  <el-button type="primary" icon="el-ksd-icon-add_22">主要按钮</el-button>
  <el-button icon="el-ksd-icon-add_22">次要按钮</el-button>
  <el-button plain icon="el-ksd-icon-add_22">次次要按钮</el-button>
</div>

<div style="margin: 20px 0 20px 0">
  <el-button type="primary" icon="el-ksd-icon-add_22">中号按钮22</el-button>
  <el-button type="primary" size="small" icon="el-ksd-icon-add_16">小号按钮16</el-button>
</div>

<div style="margin: 20px 0 20px 0">
  <el-button type="primary" :loading="true">主要按钮</el-button>
  <el-button :loading="true">次要按钮</el-button>
  <el-button plain :loading="true">次次要按钮</el-button>
</div>

```
:::

### 警告状态
警告状态：适用于危险操作（不希望用户操作此按钮，会带来重大影响的情形下）。提交失败的情况，不适用此按钮，只能使用次要按钮形式，避免过度强调。

:::demo
```html
<div>
  <el-button type="danger">高高危操作</el-button>
  <!-- <el-button type="danger" plain>高危操作</el-button>
  <el-button type="danger" text>删除</el-button> -->
</div>
```
:::


### 按钮组

以按钮组的方式出现，常用于多项类似操作，常用的是蓝底白字和白底蓝字款

:::demo 使用`<el-button-group>`标签来嵌套你的按钮。

```html
<h3 style="margin:20px 0">水平组织</h3>
<h4>主要按钮(左：正常，右：带 disabled)</h4>
<div>
  <p>示例一</p>
  <el-button-group>
    <el-button type="primary" icon="el-ksd-icon-edit_22">编辑</el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22">分享</el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22">删除</el-button>
  </el-button-group>
  
  <p>示例二（当前选中的 disabled）</p>
  <el-button-group>
    <el-button type="primary" disabled>最近 5 分钟</el-button>
    <el-button type="primary">最近 15 分钟</el-button>
    <el-button type="primary">最近 30 分钟</el-button>
    <el-button type="primary">最近 1 小时</el-button>
    <el-button type="primary">最近 1 天</el-button>
    <el-button type="primary">最近 3 天</el-button>
  </el-button-group>

  <p>全部 disabled</p>

  <el-button-group>
    <el-button type="primary" icon="el-ksd-icon-edit_22" disabled>编辑</el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22" disabled>分享</el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22" disabled>删除</el-button>
  </el-button-group>

  <p>不同位置 disabled</p>

  <el-button-group>
    <el-button type="primary" icon="el-ksd-icon-edit_22" disabled>编辑</el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22" >分享</el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22">删除</el-button>
  </el-button-group>

  <el-button-group>
    <el-button type="primary" icon="el-ksd-icon-edit_22">编辑</el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22" disabled>分享</el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22">删除</el-button>
  </el-button-group>

  <el-button-group>
    <el-button type="primary" icon="el-ksd-icon-edit_22">编辑</el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22">分享</el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22" disabled>删除</el-button>
  </el-button-group>

  <p>有多个 disabled</p>
  <el-button-group>
    <el-button type="primary" icon="el-ksd-icon-edit_22" disabled>编辑</el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22" disabled>分享</el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22">删除</el-button>
  </el-button-group>

  <el-button-group>
    <el-button type="primary" icon="el-ksd-icon-edit_22">编辑</el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22" disabled>分享</el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22" disabled>删除</el-button>
  </el-button-group>

  <el-button-group>
    <el-button type="primary" icon="el-ksd-icon-edit_22" disabled>编辑</el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22">分享</el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22" disabled>删除</el-button>
  </el-button-group>

</div>

<div>
  <p>纯 icon 版</p>
  <el-button-group>
    <el-button type="primary" icon="el-ksd-icon-edit_22"></el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22"></el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group>
    <el-button type="primary" icon="el-ksd-icon-edit_22" ></el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>
</div>

<h4 style="margin:20px 0">次要按钮(左：正常，右：带 disabled)</h4>
<div>
  <p>示例一</p>
  <el-button-group>
    <el-button icon="el-ksd-icon-edit_22">编辑</el-button>
    <el-button icon="el-ksd-icon-export_22">分享</el-button>
    <el-button icon="el-ksd-icon-table_delete_22">删除</el-button>
  </el-button-group>

  <p>示例二（当前选中的 disabled）</p>
  <el-button-group>
    <el-button disabled>最近 5 分钟</el-button>
    <el-button>最近 15 分钟</el-button>
    <el-button>最近 30 分钟</el-button>
    <el-button>最近 1 小时</el-button>
    <el-button>最近 1 天</el-button>
    <el-button>最近 3 天</el-button>
  </el-button-group>

  <p>全部 disabled</p>

  <el-button-group>
    <el-button icon="el-ksd-icon-edit_22" disabled>编辑</el-button>
    <el-button icon="el-ksd-icon-export_22" disabled>分享</el-button>
    <el-button icon="el-ksd-icon-table_delete_22" disabled>删除</el-button>
  </el-button-group>

  <p>不同位置 disabled</p>
  <el-button-group>
    <el-button icon="el-ksd-icon-edit_22" disabled>编辑</el-button>
    <el-button icon="el-ksd-icon-export_22">分享</el-button>
    <el-button icon="el-ksd-icon-table_delete_22">删除</el-button>
  </el-button-group>
  <el-button-group>
    <el-button icon="el-ksd-icon-edit_22">编辑</el-button>
    <el-button icon="el-ksd-icon-export_22" disabled>分享</el-button>
    <el-button icon="el-ksd-icon-table_delete_22">删除</el-button>
  </el-button-group>
  <el-button-group>
    <el-button icon="el-ksd-icon-edit_22">编辑</el-button>
    <el-button icon="el-ksd-icon-export_22">分享</el-button>
    <el-button icon="el-ksd-icon-table_delete_22" disabled>删除</el-button>
  </el-button-group>

  <p>有多个 disabled</p>
  <el-button-group>
    <el-button icon="el-ksd-icon-edit_22" disabled>编辑</el-button>
    <el-button icon="el-ksd-icon-export_22" disabled>分享</el-button>
    <el-button icon="el-ksd-icon-table_delete_22">删除</el-button>
  </el-button-group>
  <el-button-group>
    <el-button icon="el-ksd-icon-edit_22">编辑</el-button>
    <el-button icon="el-ksd-icon-export_22" disabled>分享</el-button>
    <el-button icon="el-ksd-icon-table_delete_22" disabled>删除</el-button>
  </el-button-group>
  <el-button-group>
    <el-button icon="el-ksd-icon-edit_22" disabled>编辑</el-button>
    <el-button icon="el-ksd-icon-export_22">分享</el-button>
    <el-button icon="el-ksd-icon-table_delete_22" disabled>删除</el-button>
  </el-button-group>
</div>

<div>
  <p>纯 icon 版</p>
  <el-button-group>
    <el-button icon="el-ksd-icon-edit_22"></el-button>
    <el-button icon="el-ksd-icon-export_22"></el-button>
    <el-button icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group>
    <el-button icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>
</div>

<h4 style="margin:20px 0">次次要按钮(左：正常，右：带 disabled)</h4>
<div>
  <p>示例一</p>
  <el-button-group>
    <el-button plain icon="el-ksd-icon-edit_22">编辑</el-button>
    <el-button plain icon="el-ksd-icon-export_22">分享</el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22">删除</el-button>
  </el-button-group>

  <p>示例二（当前选中的 disabled）</p>
  <el-button-group>
    <el-button plain disabled>最近 5 分钟</el-button>
    <el-button plain>最近 15 分钟</el-button>
    <el-button plain>最近 30 分钟</el-button>
    <el-button plain>最近 1 小时</el-button>
    <el-button plain>最近 1 天</el-button>
    <el-button plain>最近 3 天</el-button>
  </el-button-group>

  <p>全部 disabled</p>

  <el-button-group>
    <el-button plain icon="el-ksd-icon-edit_22" disabled>编辑</el-button>
    <el-button plain icon="el-ksd-icon-export_22" disabled>分享</el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22" disabled>删除</el-button>
  </el-button-group>

  <p>不同位置 disabled</p>
  <el-button-group>
    <el-button plain icon="el-ksd-icon-edit_22" disabled>编辑</el-button>
    <el-button plain icon="el-ksd-icon-export_22">分享</el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22">删除</el-button>
  </el-button-group>

  <el-button-group>
    <el-button plain icon="el-ksd-icon-edit_22">编辑</el-button>
    <el-button plain icon="el-ksd-icon-export_22" disabled>分享</el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22">删除</el-button>
  </el-button-group>

  <el-button-group>
    <el-button plain icon="el-ksd-icon-edit_22">编辑</el-button>
    <el-button plain icon="el-ksd-icon-export_22">分享</el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22" disabled>删除</el-button>
  </el-button-group>

  <p>有多个 disabled</p>
  <el-button-group>
    <el-button plain icon="el-ksd-icon-edit_22" disabled>编辑</el-button>
    <el-button plain icon="el-ksd-icon-export_22" disabled>分享</el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22">删除</el-button>
  </el-button-group>

  <el-button-group>
    <el-button plain icon="el-ksd-icon-edit_22">编辑</el-button>
    <el-button plain icon="el-ksd-icon-export_22" disabled>分享</el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22" disabled>删除</el-button>
  </el-button-group>

  <el-button-group>
    <el-button plain icon="el-ksd-icon-edit_22" disabled>编辑</el-button>
    <el-button plain icon="el-ksd-icon-export_22">分享</el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22" disabled>删除</el-button>
  </el-button-group>
</div>

<div>
  <p>纯 icon 版</p>
  <el-button-group>
    <el-button plain icon="el-ksd-icon-edit_22"></el-button>
    <el-button plain icon="el-ksd-icon-export_22"></el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group>
    <el-button plain icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button plain icon="el-ksd-icon-export_22"></el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>
</div>

<hr>

<h3 style="margin:20px 0">垂直组织</h3>

<h4>主要按钮(左：正常，右：带 disabled)</h4>

<div style="margin:20px 0">
  <el-button-group align="vertical" style="margin-right:60px">
    <el-button type="primary" icon="el-ksd-icon-edit_22"></el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22"></el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button type="primary" icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button type="primary" icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22"></el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button type="primary" icon="el-ksd-icon-edit_22"></el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button type="primary" icon="el-ksd-icon-edit_22"></el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22"></el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button type="primary" icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button type="primary" icon="el-ksd-icon-edit_22"></el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button type="primary" icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button type="primary" icon="el-ksd-icon-export_22"></el-button>
    <el-button type="primary" icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>
</div>

<h4 style="margin:20px 0">次要按钮(左：正常，右：带 disabled)</h4>

<div style="margin:20px 0">
  <el-button-group align="vertical" style="margin-right:60px">
    <el-button icon="el-ksd-icon-edit_22"></el-button>
    <el-button icon="el-ksd-icon-export_22"></el-button>
    <el-button icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button icon="el-ksd-icon-export_22"></el-button>
    <el-button icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button icon="el-ksd-icon-edit_22"></el-button>
    <el-button icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button icon="el-ksd-icon-edit_22"></el-button>
    <el-button icon="el-ksd-icon-export_22"></el-button>
    <el-button icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button icon="el-ksd-icon-edit_22"></el-button>
    <el-button icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button icon="el-ksd-icon-export_22"></el-button>
    <el-button icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>
</div>

<h4 style="margin:20px 0">次次要按钮(左：正常，右：带 disabled)</h4>

<div style="margin:20px 0">
  <el-button-group align="vertical" style="margin-right:60px">
    <el-button plain icon="el-ksd-icon-edit_22"></el-button>
    <el-button plain icon="el-ksd-icon-export_22"></el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button plain icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button plain icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button plain icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button plain icon="el-ksd-icon-export_22"></el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button plain icon="el-ksd-icon-edit_22"></el-button>
    <el-button plain icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button plain icon="el-ksd-icon-edit_22"></el-button>
    <el-button plain icon="el-ksd-icon-export_22"></el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button plain icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button plain icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22"></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button plain icon="el-ksd-icon-edit_22"></el-button>
    <el-button plain icon="el-ksd-icon-export_22" disabled></el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>

  <el-button-group align="vertical">
    <el-button plain icon="el-ksd-icon-edit_22" disabled></el-button>
    <el-button plain icon="el-ksd-icon-export_22"></el-button>
    <el-button plain icon="el-ksd-icon-table_delete_22" disabled></el-button>
  </el-button-group>
</div>
```
:::

### 按钮组 - 特殊场景 - 中英文切换

利用按钮组扩展出来的中英文切换按钮，因为`<el-button-group>`标签里面嵌套的也是`<el-button>`标签，所以可以利用属性size实现按钮的大小控制。
因为在实际使用中，中英文切换时，中文的键值对的健名是zh-cn，所以这边使用时，changLang的方法中参数要设置成zh-cn，class的判断处也是取值zh-cn。
主要是为了和语言配置这边搭配使用：

```js
// 下面是伪代码，只为说明
// VueI18n 配置处
import VueI18n from 'vue-i18n'
import enLocale from 'kyligence-kylin-ui/lib/locale/lang/en'
import zhLocale from 'kyligence-kylin-ui/lib/locale/lang/zh-CN'
import enKyAccountLocale from './locale/en'
import zhKyAccountLocale from './locale/zh-CN'
Vue.use(VueI18n)
enLocale.kyAccountLang = enKyAccountLocale.default
zhLocale.kyAccountLang = zhKyAccountLocale.default
Vue.locale('en', enLocale)
Vue.locale('zh-cn', zhLocale)

// 组件中的中英文配置处
locales: {
  'en': {
    text: 'text'
  },
  'zh-cn': {
    text: '文本'
  }
}
```
:::demo 支持的尺寸：`big`、 `medium`、`small`、`mini`，通过设置`size`属性来配置它们，默认是medium的尺寸，但现在项目中用的都是small 尺寸的这个

```html
<div>
  <el-button-group class="switch-button-group">
    <el-button size="small" @click="changeLang('en')" :class="{'active':lang=='en'}">EN</el-button>
    <el-button size="small" @click="changeLang('zh-cn')" :class="{'active':lang=='zh-cn'}">中文</el-button>
  </el-button-group>
</div>
<script>
  export default {
    data () {
      return {
        lang: 'zh-cn'
      };
    },
    methods: {
      changeLang (lang) {
        this.lang = lang
      }
    }
  }
</script>
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   big/ medium / small / mini            |    medium  |
| type     | 类型   | string    |   primary / success / warning / danger / info |     —    |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| text     | 是否文字按钮   | boolean    | — | false   |
| nobg-text     | 是否无背景文字按钮   | boolean    | — | false   |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| icon-button     | 是否纯icon按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |
| iconr  | 文字右侧图标类名，一般文字按钮时比较常用 | string   |  —  |  —  |
