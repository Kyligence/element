<script>
  export default {
    data() {
      return {
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ],
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      editSomething () {
        alert('do something')
      }
    }
  }
</script>

<style>
  .demo-box.demo-tag {
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding: 0 *;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .customIconTag{
      .custom-icon{
        margin-left: 5px;
        display: none;
      }
      &:hover{
        .custom-icon{
          cursor: pointer;
          display: inline;
        }
      }
    }
  }
</style>

## Tag 标签

用于标记和选择。

### 基础用法
基于标准色，依据系统用途分配属性，如需多种颜色并用，则不考虑此属性原则，标签可加入动作操作之。

:::demo 由`type`属性来选择tag的类型，也可以通过`color`属性来自定义背景色，项目中用的尺寸都选用 small

```html
<el-tag size="small">普通</el-tag>
<el-tag type="danger" size="small">危险</el-tag>
<el-tag type="info" size="small">失效</el-tag>
<el-tag type="success" size="small">安全</el-tag>
<el-tag type="warning" size="small">警示</el-tag>
```
:::

### 操作标签
未提供用户快速编辑或删除标签，可选择下列标签形态，以利于用户快速操作。
el-tag 在文案和关闭按钮中间是可以接收slot的，可以进行自定义填充处理

:::demo 设置`closable`属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置`disable-transitions`属性，它接受一个`Boolean`，true 为关闭。

```html
<el-tag
  size="small"
  v-for="tag in tags"
  :key="tag.name"
  closable
  :type="tag.type">
  {{tag.name}}
</el-tag>

<h4 style="margin:20px 0">自定义标签icon， hover 到tag 上查看效果</h4>
<el-tag size="small" closable class="customIconTag">普通<i class="el-icon-edit custom-icon" @click="editSomething"></i></el-tag>

<script>
  export default {
    data() {
      return {
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ]
      };
    },
    methods: {
      editSomething () {
        alert('do something')
      }
    }
  }
</script>
<style>
  .customIconTag{
    .custom-icon{
      margin-left: 5px;
      display: none;
    }
    &:hover{
      .custom-icon{
        cursor: pointer;
        display: inline;
      }
    }
  }
</style>
```
:::

### 不同尺寸

规范中建议使用两种尺寸，small 和 mini。

:::demo mini 尺寸主要适用于 1. 小型 input 框（h = 24px）里的多选情况，2. 表中表的编辑状态下

```html
<h4 style="margin:20px 0">常用尺寸：</h4>
<el-tag size="small" closable>小型标签</el-tag>

<h4 style="margin:20px 0">表中表的编辑状态时适用的尺寸：</h4>
<el-tag size="mini" closable>超小标签</el-tag>

<h4 style="margin:20px 0">留作备用的两个尺寸：default medium</h4>
<div>
  <el-tag closable>默认标签</el-tag>
  <el-tag size="medium" closable>中等标签</el-tag>
</div>

```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 主题 | string | success/info/warning/danger | — |
| closable | 是否可关闭 | boolean | — | false |
| disable-transitions | 是否禁用渐变动画 | boolean | — | false |
| hit | 是否有边框描边 | boolean | — | false |
| color | 背景色 | string | — | — |
| size | 尺寸 | string | medium / small / mini | — |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭 Tag 时触发的事件 | — |
