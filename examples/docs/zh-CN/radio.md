<script>
  module.exports = {
    data() {
      return {
        radio: '1',
        radioProp: 1,
        radio1: '选中且禁用',
        radio2: 3,
        radio3: '上海',
        radio4: '上海',
        radio5: '上海',
        radio6: '上海',
        radio7: '1',
        radio8: '1',
        radio9: '1',
        radio10: '1',
        radioLiandong: 3,
        otherDate: {
          3: {value: '我是根据选项一遍历出来的值'},
          6: {value: '我是根据选项二遍历出来的值'},
          9: {value: '我是根据选项三遍历出来的值'}
        },
        tabRadio: 3
      };
    },
    methods: {
      checkLable (value) {
        alert(this.otherDate[value].value);
      }
    }
  };
</script>

## Radio 单选框

:::tip 
新规范调整内容：
* ##### 调整了radio label和按钮之间的间距为标准的5px
:::

在一组备选项中进行单选

### 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。基础用法时，size 情况主要是 medium 和 small 两种

:::demo 要使用 Radio 组件，只需要设置`v-model`绑定变量，选中意味着变量的值为相应 Radio `label`属性的值，`label`可以是`String`、`Number`或`Boolean`。

```html
<template>
  <p>默认 size: medium</p>
  <div>
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
  </div>
  <p style="margin-top:30px;">size: small</p>
  <div>
    <el-radio v-model="radio" size="small" label="1">小号备选项</el-radio>
    <el-radio v-model="radio" size="small" label="2">小号备选项</el-radio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
      };
    }
  }
</script>
```
:::

:::tip
<p>单选框中v-model中变量的值的类型，要和label中的值的类型保持一致，比如上面的例子，label中的值是字符串类型，在js代码中data中定义model里的radio的值，如果设置为数字类型，那就会导致单选按钮选不中的情况。</p>
<p>如果label是以prop的形式传值，这时候值就是对应的类型，如下面的例子：</p>
:::

:::demo label以prop的方式传值，这时候，等号右边的1，是数字类型，而不再是字符串类型。

```html
<template>
  <el-radio v-model="radioProp" :label="1">备选项</el-radio>
  <el-radio v-model="radioProp" :label="2">备选项</el-radio>
</template>

<script>
  export default {
    data () {
      return {
        radioProp: 1
      };
    }
  }
</script>
```
:::

### 禁用状态

单选框不可用的状态。

:::demo 只要在`el-radio`元素中设置`disabled`属性即可，它接受一个`Boolean`，`true`为禁用。
```html
<template>
  <el-radio disabled v-model="radio1" label="禁用">备选项</el-radio>
  <el-radio disabled v-model="radio1" label="选中且禁用">备选项</el-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '选中且禁用'
      };
    }
  }
</script>
```
:::

### 单选框组

适用于在多个互斥的选项中选择的场景

:::demo 结合`el-radio-group`元素和子元素`el-radio`可以实现单选组，在`el-radio-group`中绑定`v-model`，在`el-radio`中设置好`label`即可，无需再给每一个`el-radio`绑定变量，另外，还提供了`change`事件来响应变化，它会传入一个参数`value`。

```html
<template>
  <el-radio-group v-model="radio2">
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
</template>

<script>
  export default {
    data () {
      return {
        radio2: 3
      };
    }
  }
</script>
```
:::

对于单选按钮提供的change事件，我能想到的一个场景是，变化当前这个radio组的值，要去解析另一个数据，得出另一个值，供实时验证:
:::demo 

```html
<template>
  <el-radio-group v-model="radioLiandong" @change="checkLable">
    <el-radio :label="3">选项一</el-radio>
    <el-radio :label="6">选项二</el-radio>
    <el-radio :label="9">选项三</el-radio>
  </el-radio-group>
</template>

<script>
  export default {
    data () {
      return {
        radioLiandong: 3,
        otherDate: {
          3: {value: '我是根据选项一遍历出来的值'},
          6: {value: '我是根据选项二遍历出来的值'},
          9: {value: '我是根据选项三遍历出来的值'}
        }
      };
    },
    methods: {
      checkLable (value) {
        alert(this.otherDate[value].value);
      }
    }
  }
</script>
```
:::

实际应用场景可能有更复杂的情况，可以根据实际情况进行处理，提供的demo是为了说明有提供change这个事件。

### 按钮样式

按钮样式的单选组合。

:::demo 只需要把`el-radio`元素换成`el-radio-button`元素即可，此外，Element 还提供了`size`属性。
```html
<template>
  <div>
    <el-radio-group v-model="radio3">
      <el-radio-button label="上海"></el-radio-button>
      <el-radio-button label="北京"></el-radio-button>
      <el-radio-button label="广州"></el-radio-button>
      <el-radio-button label="深圳"></el-radio-button>
    </el-radio-group>
  </div>
  <div style="margin-top: 20px">
    <el-radio-group v-model="radio4" size="medium">
      <el-radio-button label="上海" ></el-radio-button>
      <el-radio-button label="北京"></el-radio-button>
      <el-radio-button label="广州"></el-radio-button>
      <el-radio-button label="深圳"></el-radio-button>
    </el-radio-group>
  </div>
  <div style="margin-top: 20px">
    <el-radio-group v-model="radio5" size="small">
      <el-radio-button label="上海"></el-radio-button>
      <el-radio-button label="北京" disabled ></el-radio-button>
      <el-radio-button label="广州"></el-radio-button>
      <el-radio-button label="深圳"></el-radio-button>
    </el-radio-group>
  </div>
  <div style="margin-top: 20px">
    <el-radio-group v-model="radio6" disabled size="mini">
      <el-radio-button label="上海"></el-radio-button>
      <el-radio-button label="北京"></el-radio-button>
      <el-radio-button label="广州"></el-radio-button>
      <el-radio-button label="深圳"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio3: '上海',
        radio4: '上海',
        radio5: '上海',
        radio6: '上海'
      };
    }
  }
</script>
```
:::


### tab 按钮样式

适用于纯单选效果的场景，没有其他整体模块与之联动的情况，使用此组件。

如果是有 tab head 和 body 的场景，切换 head 时，底下集中的一块内容会跟着互斥变化的 UI 场景，请移步使用 [Tab](#/zh-CN/component/tabs#tab-button) 组件中的 button 模式。

tab 按钮样式的单选组合，新增两个属性 is-tab 和 is-flex-equally，is-tab 控制 UI 风格，is-flex-equally 控制是否容器内等分展示

:::demo 在 el-radio-group 元素上加上属性 is-tab 后，就定制为 tab 样式的单选按钮组 ，带上 is-flex-equally 属性的话就是等分模式
```html
<template>
  <p>基础使用 默认 size 为 small</p>
  <div>
    <el-radio-group v-model="tabRadio" :is-tab="true">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
  </div>
  <p>基础使用 size: medium</p>
  <div>
    <el-radio-group v-model="tabRadio" size="medium" :is-tab="true">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
  </div>
  <p>基础使用 size: mini</p>
  <div>
    <el-radio-group v-model="tabRadio" size="mini" :is-tab="true">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
  </div>
  <p>等分模式</p>
  <div>
    <el-radio-group v-model="tabRadio" :is-tab="true" :is-flex-equally="true">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
  </div>
  <p>某个选项带一个 tag 标签</p>
  <div>
    <el-radio-group v-model="tabRadio" :is-tab="true" :is-flex-equally="true">
      <el-radio :label="3">备选项 <el-tag is-light size="small">荐</el-tag></el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
  </div>
  <p>某个选项带一个 icon 标签，hover 到 icon 上有 tooltip 提示</p>
  <div>
    <el-radio-group v-model="tabRadio" :is-tab="true">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">
        <span>备选项</span>
        <el-tooltip placement="top" content="该选项需要注意xxx">
          <i class="el-ksd-icon-info_border_16"></i>
        </el-tooltip>
      </el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
  </div>
  <p>disable 整组</p>
  <div>
    <el-radio-group v-model="tabRadio" :is-tab="true" disabled>
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tabRadio: 3
      };
    }
  }
</script>
```
:::


### 带有边框

:::demo 设置`border`属性可以渲染为带有边框的单选框。
```html
<template>
  <div>
    <el-radio v-model="radio7" label="1" border>备选项1</el-radio>
    <el-radio v-model="radio7" label="2" border>备选项2</el-radio>
  </div>
  <div style="margin-top: 20px">
    <el-radio v-model="radio8" label="1" border size="medium">备选项1</el-radio>
    <el-radio v-model="radio8" label="2" border size="medium">备选项2</el-radio>
  </div>
  <div style="margin-top: 20px">
    <el-radio-group v-model="radio9" size="small">
      <el-radio label="1" border>备选项1</el-radio>
      <el-radio label="2" border disabled>备选项2</el-radio>
    </el-radio-group>
  </div>
  <div style="margin-top: 20px">
    <el-radio-group v-model="radio10" size="mini" disabled>
      <el-radio label="1" border>备选项1</el-radio>
      <el-radio label="2" border>备选项2</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio7: '1',
        radio8: '1',
        radio9: '1',
        radio10: '1'
      };
    }
  }
</script>
```
:::

### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value   | string / number / boolean    |       —        |      —   |
| disabled  | 是否禁用    | boolean   | — | false   |
| border  | 是否显示边框  | boolean   | — | false   |
| size  | Radio 的尺寸  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |

### Radio Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效   | string  | medium / small / mini |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| text-color  | 按钮形式的 Radio 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Radio 激活时的填充色和边框色    | string   | — | #409EFF   |
| is-tab  | 是否是 tab 按钮形式的 Radio     | boolean   | true/false | false   |
| is-flex-equally  | 是否占整行，同时均分每个选项     | boolean   | true/false | false   |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-button Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value  | string / number  |        —       |     —    |
| disabled  | 是否禁用    | boolean   | — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |
