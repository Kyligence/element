
# kyligence-kylin-ui

[![Build Status](https://travis-ci.org/ElemeFE/element.svg?branch=master)](https://travis-ci.org/ElemeFE/element)
[![Coverage Status](https://coveralls.io/repos/github/ElemeFE/element/badge.svg?branch=master)](https://coveralls.io/github/ElemeFE/element?branch=master)
[![CDNJS](https://img.shields.io/cdnjs/v/element-ui.svg)](https://cdnjs.com/libraries/kyligence-kylin-ui)
[![npm package](https://img.shields.io/npm/v/element-ui.svg)](https://www.npmjs.org/package/kyligence-kylin-ui)
[![NPM downloads](http://img.shields.io/npm/dm/element-ui.svg)](https://npmcharts.com/compare/kyligence-kylin-ui?minimal=true)
![JS gzip size](http://img.badgesize.io/https://unpkg.com/kyligence-kylin-ui/lib/index.js?compression=gzip&label=gzip%20size:%20JS)
![CSS gzip size](http://img.badgesize.io/https://unpkg.com/kyligence-kylin-ui/lib/theme-chalk/index.css?compression=gzip&label=gzip%20size:%20CSS)
[![Join the chat at https://gitter.im/ElemeFE/element](https://badges.gitter.im/ElemeFE/element.svg)](https://gitter.im/ElemeFE/element?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)(Chinese)
[![Join the chat at https://gitter.im/element-en/Lobby](https://badges.gitter.im/element-en/Lobby.svg)](https://gitter.im/element-en/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)(English)
[![OpenCollective](https://opencollective.com/element/backers/badge.svg)](#backers) 
[![OpenCollective](https://opencollective.com/element/sponsors/badge.svg)](#sponsors)
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
> A Vue.js 2.0 UI Toolkit for Web.


## Install
```shell
npm install kyligence-kylin-ui -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import KyligenceUI from 'kyligence-kylin-ui'

Vue.use(KyligenceUI)

// or
import {
  Select,
  Button
  // ...
} from 'kyligence-kylin-ui'

Vue.component(Select.name, Select)
Vue.component(Button.name, Button)
```

## Browser Support
Modern browsers and Internet Explorer 10+.

## Development
1.请将提交通过pr的方式提交到kylin5分支
2.提交测试通过的问题请在更新日志文件里修改 CHANGELOG.zh-CN.md

## 调试和发布
1. npm run dev
2. npm run dist

## LICENSE
[MIT](LICENSE)
