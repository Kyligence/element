<style>
  .demo-box.demo-progress {
    .el-progress--line {
      margin-bottom: 15px;
      width: 350px;
    }
    .el-progress--circle {
      margin-right: 15px;
    }
    .loading-bg {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 128px;
      gap: 24px;
      .el-progress--line {
        width: 100%;
      }
    }
  }
</style>

## Progress 进度条

:::tip 
新规范调整内容：
* ##### 添加自定义color样式来控制进度条的背景色

:::

用于展示操作进度，告知用户当前状态和预期。

### 线形进度条 — 百分比外显

:::demo Progress 组件设置`percentage`属性即可，表示进度条对应的百分比，**必填**，必须在 0-100。

```html
<el-progress :percentage="0" label="Label" closable status="pending" indeterminate></el-progress>
<el-progress :percentage="70" loading></el-progress>
<el-progress :percentage="100"></el-progress>
<el-progress :percentage="20" color="#A5B2C5" status="discarded"></el-progress>
<el-progress :percentage="50" status="success" ></el-progress>
<el-progress :percentage="50" status="exception" ></el-progress>
<el-progress :percentage="100" status="exception" ></el-progress>
<el-progress :percentage="50" color="#000" icon-class="el-icon-edit"></el-progress>
```
:::

<!-- ### 线形进度条 — 百分比内显

百分比不占用额外控件，适用于文件上传等场景。

:::demo Progress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来将进度条描述置于进度条内部。

```html
<el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
<el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
<el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
<el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
```
::: -->

### 环形进度条

:::demo Progress 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。

```html
<p>小尺寸环形进度条</p>
<el-progress type="circle" :percentage="20" :width="16" :stroke-width="4" :show-text="false"></el-progress>
<el-progress type="circle" :percentage="0" :width="16" :stroke-width="4" indeterminate :show-text="false"></el-progress>
<el-progress type="circle" :percentage="100" :width="16" status="success" :stroke-width="4" :show-text="false"></el-progress>
<el-progress type="circle" :percentage="50" :width="16" status="exception" :stroke-width="4" :show-text="false"></el-progress>
<el-progress type="circle" :percentage="0" :width="16" status="pending" :stroke-width="4" :show-text="false"></el-progress>
<br/><br/>
<p>默认尺寸环形进度条</p>
<el-progress type="circle" status="pending" :percentage="0" :stroke-width="8"></el-progress>
<el-progress type="circle" :percentage="0" :stroke-width="8" indeterminate></el-progress>
<el-progress type="circle" :percentage="25" loading :stroke-width="8"></el-progress>
<el-progress type="circle" :percentage="100" status="success" :stroke-width="8"></el-progress>
<el-progress type="circle" :percentage="50" status="exception" :stroke-width="8"></el-progress>
<el-progress type="circle" :percentage="100" status="exception" :stroke-width="8"></el-progress>
<el-progress type="circle" :percentage="50" color="#A5B2C5" icon-class="el-icon-edit" :stroke-width="8"></el-progress>
```
:::

### Kyligence 特有加载

:::demo 页面加载

```html
<div class="loading-bg">
  <img src="~examples/assets/images/svg/kyligence_logo.svg" />
  <el-progress :percentage="70" color="#000" :show-text="false"></el-progress>
</div>
```
:::

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| **percentage** | **百分比（必填）**   | number          |     0-100          |     0    |
| type          | 进度条类型           | string         | line/circle | line |
| stroke-width  | 进度条的宽度，单位 px | number          | — | 6 |
| text-inside  | 进度条显示文字内置在进度条内（只在 type=line 时可用） | Boolean | — | false |
| status  | 进度条当前状态 | string | success/exception | — |
| width  | 环形进度条画布宽度（只在 type=circle 时可用） | number |  | 126 |
| show-text  | 是否显示进度条文字内容 | boolean | — | true |
| color  | 自定义进度条背景色 | string | — | - |
| icon-class  | 自定义图标 | string | — | - |
| label | 增加自定义 label | string | — | - |
| closable | 关闭状态 | Boolean | — | false |
| loading | 进度条读取过程中的动画效果 | Boolean | — | false |
| indeterminate | 加载到首次获取到进度过渡效果 | Boolean | — | false |

