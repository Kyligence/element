## 快速上手

本节将介绍如何在项目中使用 kyligence-ui

### 引入 kyligence-ui

你可以引入整个 kyligence-ui，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 kyligence-ui。

#### 完整引入

在 main.js 中写入以下内容：
```javascript
import Vue from 'vue'
import KyligenceUI from 'kyligence-ui'
import 'kyligence-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(KyligenceUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
```
以上代码便完成了 kyligence-ui 的引入。需要注意的是，样式文件需要单独引入。

#### 按需引入

借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：
```json
{
  "presets": [
    ["es2015", { "modules": false }]
  ],
  "plugins": [["component", {
      "libraryName": "kyligence-ui",
      "styleLibraryName": "theme-chalk"
    }
  ]]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'
import { Button, Select } from 'kyligence-ui'
import App from './App.vue'

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
})
```

完整组件列表和引入方式（完整组件列表以 [components.json](https://github.com/Kyligence/element/blob/dev/components.json) 为准）

```javascript
import Vue from 'vue'
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  ElTableDraggableWrapper,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'kyligence-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(ElTableDraggableWrapper)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cascader)
Vue.use(ColorPicker)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
```

### 全局配置
在引入 kyligence-ui 时，可以传入一个全局配置对象。该对象目前仅支持 `size` 和 `closeOtherMessages` 字段，size用于改变组件的默认尺寸，closeOtherMessages用于控制是否关闭其他message，按照引入 kyligence-ui 的方式，具体操作如下：

完整引入 kyligence-ui：
```JS
import Vue from 'vue'
import KyligenceUI from 'kyligence-ui'
Vue.use(KyligenceUI, { size: 'small', closeOtherMessages: true })
```

同样支持组件级（目前支持所有Input输入框）的size配置，具体操作如下：
```JS
import Vue from 'vue'
import KyligenceUI from 'kyligence-ui'
Vue.use(KyligenceUI, { closeOtherMessages: true, { input: { size: 'small' } } })
```

按需引入 kyligence-ui：
```JS
import Vue from 'vue'
import { Button } from 'kyligence-ui'

Vue.prototype.$ELEMENT = { size: 'small', closeOtherMessages: true }
Vue.use(Button)
```
按照以上设置，项目中所有拥有 `size` 属性的组件的默认尺寸均为 'small'。

各个组件的使用方法请参阅它们各自的文档。
