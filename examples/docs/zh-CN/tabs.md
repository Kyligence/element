<script>
  export default {
    data() {
      return {
        activeName: 'second',
        activeName2: 'first',
        activeName3: 'second',
        activeName4: 'first',
        editableTabsValue: '2',
        editableTabsValue2: '2',
        disableCommand: true,
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        editableTabs2: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2,
        tabPosition: 'top',
        btnTab1: 'data',
        btnTab2: 'data',
        btnTab3: 'data'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      },
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue2 = newTabName;
      },
      beforeLeave(newVal, oldVal) {
        var p = new Promise((resolve, reject) => {
          this.$confirm('离开将不保存本页修改', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 你可以在这儿做些操作
            resolve()
          }).catch(err => {
            // 你可以在这儿做些操作
            reject(err)
          })
        })
        return p
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },
      changeBtnTabType1 (tab, event) {
        console.log(tab, event);
      },
      changeBtnTabType2 (tab, event) {
        console.log(tab, event);
      },
      changeBtnTabType3 (tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
<style>
  .demo-radio-tab .ksd-tag-ml {
    margin-left:4px;
  }
</style>

## Tabs 标签页

:::tip 
新规范调整内容
* ##### 按照新的规范，tab主要使用两种 1.默认tab 2.card类型 。
* ##### 可关闭模式下 close 样式调整（hover 展示关闭按钮）
* ##### 增加 large、small 尺寸

注意修改事项：
* ##### 一级tab使用card模式 二级使用默认tab。不可以超过两级
:::

分隔内容上有关联但属于不同类别的数据集合。

### 基础用法

基础的、简洁的标签页。

:::demo Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

```html
<template>
  <p>基础用法</p>
  <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeLeave" size="large">
    <el-tab-pane label="用户" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>

  <el-tabs v-model="activeName" @tab-click="handleClick" size="medium">
    <el-tab-pane label="用户" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>

  <el-tabs v-model="activeName" @tab-click="handleClick" size="small">
    <el-tab-pane label="用户" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>

  <p style="margin-top:40px">带 icon 用法（前缀 icon 需要加上 icon 字号的设置 class：prefixIcon22）</p>
  <el-tabs v-model="activeName3" :disable-command="disableCommand">
    <el-tab-pane name="first">
      <span slot="label"><i class="el-ksd-icon-banch_22 prefixIcon22"></i> 用户管理</span>
      用户管理
    </el-tab-pane>
    <el-tab-pane name="second">
      <span slot="label"><i class="el-ksd-icon-cluster_22 prefixIcon22"></i> 配置管理</span>
      配置管理
    </el-tab-pane>
    <el-tab-pane name="third">
      <span slot="label"><i class="el-ksd-icon-company_22 prefixIcon22"></i> 角色管理</span>
      角色管理
    </el-tab-pane>
    <el-tab-pane name="fourth">
      <span slot="label"><i class="el-ksd-icon-hierachy_22 prefixIcon22"></i> 定时任务补偿</span>
      定时任务补偿</el-tab-pane>
  </el-tabs>

  <p style="margin-top:40px">带 icon 用法，同时带删除按钮的（前缀 icon 需要加上 icon 字号的设置 class：prefixIcon22）</p>
  <el-tabs v-model="activeName4" closable>
    <el-tab-pane name="first">
      <span slot="label"><i class="el-ksd-icon-banch_22 prefixIcon22"></i> 用户管理</span>
      用户管理
    </el-tab-pane>
    <el-tab-pane name="second">
      <span slot="label"><i class="el-ksd-icon-cluster_22 prefixIcon22"></i> 配置管理</span>
      配置管理
    </el-tab-pane>
    <el-tab-pane name="third">
      <span slot="label"><i class="el-ksd-icon-company_22 prefixIcon22"></i> 角色管理</span>
      角色管理
    </el-tab-pane>
    <el-tab-pane name="fourth">
      <span slot="label"><i class="el-ksd-n-icon-workspace-outlined prefixIcon22"></i> 定时任务补偿</span>
      定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second',
        disableCommand: true
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      beforeLeave(newVal, oldVal) {
        var p = new Promise((resolve, reject) => {
          this.$confirm('离开将不保存本页修改', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 你可以在这儿做些操作
            resolve()
          }).catch(err => {
            // 你可以在这儿做些操作
            reject(err)
          })
        })
        return p
      }
    }
  };
</script>
```
:::

### 选项卡样式

选项卡样式的标签页。

:::demo 只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。

```html
<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" closable size="large">
    <el-tab-pane name="first">
      <span slot="label"><i class="el-ksd-icon-banch_22 prefixIcon22"></i> 用户管理</span>
      用户管理
    </el-tab-pane>
    <el-tab-pane name="second">
      <span slot="label"><i class="el-ksd-icon-cluster_22 prefixIcon22"></i> 配置管理</span>
      配置管理
    </el-tab-pane>
    <el-tab-pane name="third">
      <span slot="label"><i class="el-ksd-icon-company_22 prefixIcon22"></i> 角色管理</span>
      角色管理
    </el-tab-pane>
    <el-tab-pane name="fourth">
      <span slot="label"><i class="el-ksd-n-icon-workspace-outlined prefixIcon22"></i> 定时任务补偿</span>
      定时任务补偿</el-tab-pane>
  </el-tabs>
  <br/>

  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" closable>
    <el-tab-pane name="first">
      <span slot="label"><i class="el-ksd-icon-banch_22 prefixIcon22"></i> 用户管理</span>
      用户管理
    </el-tab-pane>
    <el-tab-pane name="second">
      <span slot="label"><i class="el-ksd-icon-cluster_22 prefixIcon22"></i> 配置管理</span>
      配置管理
    </el-tab-pane>
    <el-tab-pane name="third">
      <span slot="label"><i class="el-ksd-icon-company_22 prefixIcon22"></i> 角色管理</span>
      角色管理
    </el-tab-pane>
    <el-tab-pane name="fourth">
      <span slot="label"><i class="el-ksd-n-icon-workspace-outlined prefixIcon22"></i> 定时任务补偿</span>
      定时任务补偿</el-tab-pane>
  </el-tabs>
  <br/>

  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" closable size="small">
    <el-tab-pane name="first">
      <span slot="label"><i class="el-ksd-icon-banch_22 prefixIcon22"></i> 用户管理</span>
      用户管理
    </el-tab-pane>
    <el-tab-pane name="second">
      <span slot="label"><i class="el-ksd-icon-cluster_22 prefixIcon22"></i> 配置管理</span>
      配置管理
    </el-tab-pane>
    <el-tab-pane name="third">
      <span slot="label"><i class="el-ksd-icon-company_22 prefixIcon22"></i> 角色管理</span>
      角色管理
    </el-tab-pane>
    <el-tab-pane name="fourth">
      <span slot="label"><i class="el-ksd-n-icon-workspace-outlined prefixIcon22"></i> 定时任务补偿</span>
      定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName2: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
```
:::

<!-- ### 按钮样式

选项卡样式的标签页。

:::demo 只需要设置 `type` 属性为 `button` 就可以使选项卡改变为标签风格。

```html
<template>
  <el-tabs v-model="activeName2" type="button" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName2: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
```
::: -->

<!-- ### 卡片化

卡片化的标签页。

:::demo 将`type`设置为`border-card`。
```html
<el-tabs type="border-card">
  <el-tab-pane label="用户管理">用户管理</el-tab-pane>
  <el-tab-pane label="配置管理">配置管理</el-tab-pane>
  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
</el-tabs>
```
::: -->

<!-- ### 位置

可以通过 `tab-position` 设置标签的位置

:::demo 标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`

```html
<template>
  <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
    <el-radio-button label="top">top</el-radio-button>
    <el-radio-button label="right">right</el-radio-button>
    <el-radio-button label="bottom">bottom</el-radio-button>
    <el-radio-button label="left">left</el-radio-button>
  </el-radio-group>

  <el-tabs :tab-position="tabPosition" style="height: 200px;">
    <el-tab-pane label="用户管理">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'left'
      };
    }
  };
</script>
```
::: -->

<!-- ### 自定义标签页

可以通过具名 `slot` 来实现自定义标签页的内容

:::demo
```html
<template>
  <p>普通带 icon</p>
  <el-tabs type="border-card">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
      我的行程
    </el-tab-pane>
    <el-tab-pane label="消息中心">消息中心</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>

  <p>普通带 icon，同时带删除</p>
  <el-tabs type="border-card" closable>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
      我的行程
    </el-tab-pane>
    <el-tab-pane label="消息中心">消息中心</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
```
::: -->

### 动态增减标签页

增减标签页按钮只能在选项卡样式的标签页下使用

:::tip
vue版本升级后，要求v-for使用时要规定key属性，不然会报警告，key属性的作用是唯一标识，所以开发时，很容易想到用index作为唯一标识。
正常使用这样没问题，当涉及到增删时，就会出现奇怪bug了，如下方的示例中，如果将:key="index"，再去执行从前往后删除的操作，就会出现数据异常，感兴趣的童鞋，可以试试效果~
:::

:::demo
```html
<el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
  <el-tab-pane
    :key="item.name"
    v-for="(item, index) in editableTabs"
    :label="item.title"
    :name="item.name"
  >
    {{item.content}}
  </el-tab-pane>
</el-tabs>
<script>
  export default {
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    methods: {
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
  }
</script>
```
:::

### 自定义增加标签页触发器

:::demo
```html
<div style="margin-bottom: 20px;">
  <el-button
    size="small"
    @click="addTab(editableTabsValue2)"
  >
    add tab
  </el-button>
</div>
<el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
  <el-tab-pane
    v-for="(item, index) in editableTabs2"
    :key="item.name"
    :label="item.title"
    :name="item.name"
  >
    {{item.content}}
  </el-tab-pane>
</el-tabs>
<script>
  export default {
    data() {
      return {
        editableTabsValue2: '2',
        editableTabs2: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    methods: {
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
</script>
```
:::

### Tab button

适用于 Tab 场景，就是有 tab head 和 body 的场景，切换 head 时，底下集中的一块内容会跟着互斥变化的 UI 场景。当前用的比较多的尺寸是 small 这个尺寸。
如果是纯单选效果的，请移步使用 [Radio](#/zh-CN/component/radio#tab-an-niu-yang-shi) 组件中的 radio tab button 模式。

:::demo
```html
<p>基础用法 - large size，高度 34px,同 radio 的 medium 高度，对应 UED 稿子的 large 尺寸</p>
<div>
  <el-tabs v-model="btnTab1" size="large" type="button" @tab-click="changeBtnTabType1">
    <el-tab-pane label="列表" name="data">我是列表 tab 下的数据</el-tab-pane>
    <el-tab-pane label="图表" name="chart">我是图表 tab 下的数据</el-tab-pane>
  </el-tabs>
  <p>同等效果的 medium - radio</p>
  <div>
    <el-radio-group v-model="btnTab1" size="medium" :is-tab="true">
      <el-radio :label="'data'">列表</el-radio>
      <el-radio :label="'chart'">图表</el-radio>
    </el-radio-group>
  </div>
</div>
<hr />
<p style="margin-top:40px;">基础用法 - medium size，高度 32px,同 radio 的 small 高度，对应 UED 稿子的 medium 尺寸</p>
<div>
  <el-tabs v-model="btnTab1" size="medium" type="button" @tab-click="changeBtnTabType1">
    <el-tab-pane label="列表" name="data">我是列表 tab 下的数据</el-tab-pane>
    <el-tab-pane label="图表" name="chart">我是图表 tab 下的数据</el-tab-pane>
  </el-tabs>
  <p>同等效果的 small - radio</p>
  <div>
    <el-radio-group v-model="btnTab1" size="small" :is-tab="true">
      <el-radio :label="'data'">列表</el-radio>
      <el-radio :label="'chart'">图表</el-radio>
    </el-radio-group>
  </div>
</div>
<hr />
<p style="margin-top:40px;">基础用法 - small size，高度 28px,同 radio 的 mini 高度，对应 UED 稿子的 small 尺寸</p>
<div>
  <el-tabs v-model="btnTab1" size="small" type="button" @tab-click="changeBtnTabType1">
    <el-tab-pane label="列表" name="data">我是列表 tab 下的数据</el-tab-pane>
    <el-tab-pane label="图表" name="chart">我是图表 tab 下的数据</el-tab-pane>
  </el-tabs>
  <p>同等效果的 mini - radio</p>
  <div>
    <el-radio-group v-model="btnTab1" size="mini" :is-tab="true">
      <el-radio :label="'data'">列表</el-radio>
      <el-radio :label="'chart'">图表</el-radio>
    </el-radio-group>
  </div>
</div>
<hr />
<p style="margin-top:40px;">
某选项带 tag 或者 icon，同时对于tag 或者 icon 上hover 时显示 tips,hover 区域可以自由定义，el-tooltip 包起需要tips 的原始即可。label 以 slot 形式填充时，样式微调就依赖项目里，不在组件库中进行写死。
<br>
文本和右侧元素之间，是 4px 的间距，实际使用时，项目里自己使用项目里的原子类吧~
</p>
<div class="demo-radio-tab">
  <el-tabs v-model="btnTab2" size="small" type="button" @tab-click="changeBtnTabType2">
    <el-tab-pane name="data">
      <span slot="label">
        <span>列表</span>
        <el-tooltip content="我是推荐理由的 tips" placement="top">
          <el-tag class="ksd-tag-ml" is-light size="mini" type="success">荐</el-tag>
        </el-tooltip>
      </span>
      <div>pane-data</div>
    </el-tab-pane>
    <el-tab-pane label="图表" name="chart">pane-chart</el-tab-pane>
  </el-tabs>
</div>
<hr />
<p style="margin-top:40px;">
  基础用法 - small size，高度 32px
<br>均分撑满整行的方式
</p>
<div>
  <el-tabs v-model="btnTab3" size="small" type="button" :is-full="true" @tab-click="changeBtnTabType3">
    <el-tab-pane label="列表" name="data">pane-data</el-tab-pane>
    <el-tab-pane label="图表" name="chart">pane-chart</el-tab-pane>
  </el-tabs>
</div>
<hr />
<p style="margin-top:40px;">带 tag 的，均分撑满整行的方式</p>
<div class="demo-radio-tab">
  <el-tabs v-model="btnTab3" size="small" type="button" :is-full="true" @tab-click="changeBtnTabType3">
    <el-tab-pane name="data">
      <span slot="label">
        <span>列表</span>
        <el-tooltip content="我是推荐理由的 tips" placement="top">
          <el-tag class="ksd-tag-ml" is-light size="mini" type="success">荐</el-tag>
        </el-tooltip>
      </span>
      <div>pane-data</div>
    </el-tab-pane>
    <el-tab-pane label="图表" name="chart">pane-chart</el-tab-pane>
  </el-tabs>
</div>
<hr />
<p style="margin-top:40px;">基础用法 - disabled</p>
<div>
  <el-tabs v-model="btnTab1" size="small" type="button" @tab-click="changeBtnTabType1">
    <el-tab-pane label="列表" name="data" disabled>pane-data</el-tab-pane>
    <el-tab-pane label="图表" name="chart">pane-chart</el-tab-pane>
  </el-tabs>
</div>
<hr />
<p style="margin-top:40px;">撑满整行的 - disabled</p>
<div>
  <el-tabs v-model="btnTab1" size="small" type="button" :is-full="true" @tab-click="changeBtnTabType1">
    <el-tab-pane label="列表" name="data" disabled>pane-data</el-tab-pane>
    <el-tab-pane label="图表" name="chart">pane-chart</el-tab-pane>
  </el-tabs>
</div>
<p>label 内容比较少的时候</p>
<div>
  <el-tabs v-model="btnTab1" size="small" type="button" @tab-click="changeBtnTabType1">
    <el-tab-pane label="年" name="data">我是列表 tab 下的数据</el-tab-pane>
    <el-tab-pane label="月" name="chart">我是图表 tab 下的数据</el-tab-pane>
  </el-tabs>
</div>

<script>
  export default {
    data() {
      return {
        btnTab1: 'data',
        btnTab2: 'data',
        btnTab3: 'data'
      }
    },
    methods: {
      changeBtnTabType1 (tab, event) {
        console.log(tab, event);
      },
      changeBtnTabType2 (tab, event) {
        console.log(tab, event);
      },
      changeBtnTabType3 (tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
```
:::

### Tabs Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 大小   | string   | large/medium/small  |     —    |
| type     | 风格类型   | string   | card/border-card/button  |     —    |
| is-full     | 是否占满全屏，不和 closable 等共用，配合 type 为 button 时效果使用   | boolean   | true/false  |     false    |
| closable  | 标签是否可关闭   | boolean   | — |  false  |
| addable  | 标签是否可增加   | boolean   | — |  false  |
| editable  | 标签是否同时可增加和关闭   | boolean   | — |  false  |
| value  | 绑定值，选中选项卡的 name  | string   |  —  |  第一个选项卡的 name |
| tab-position  | 选项卡所在位置 | string   |  top/right/bottom/left  |  top |
| disable-command  | 禁用快捷键切换tab | boolean   |  false/true  |  false |
| before-leave | 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。| Function(activeName, oldActiveName) | - | - |

### Tabs Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| tab-click  | tab 被选中时触发 | 被选中的标签 tab 实例 |
| tab-remove  | 点击 tab 移除按钮后触发  | 被删除的标签的 name |
| tab-add  | 点击 tabs 的新增按钮后触发  | — |
| edit  | 点击 tabs 的新增按钮或 tab 被关闭后触发  | (targetName, action) |

### Tab-pane Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选项卡标题   | string   | — |    —     |
| disabled | 是否禁用 | boolean | — | false |
| name      | 与选项卡 activeName 对应的标识符，表示选项卡别名 | string | — | 该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1' |
| closable  | 标签是否可关闭   | boolean   | — |  false  |
