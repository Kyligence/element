<style>
  .demo-typo-box {
    height: 200px;
    width: 200px;
    position: relative;
    border: 1px solid #eaeefb;
    font-size: 40px;
    color: #1f2d3d;
    text-align: center;
    line-height: 162px;
    padding-bottom: 36px;
    box-sizing: border-box;
    display: inline-block;
    margin-right: 17px;
    border-radius: 4px;

    .name {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-top: 1px solid #eaeefb;
      font-size: 14px;
      color: #8492a6;
      line-height: 35px;
      text-align: left;
      text-indent: 10px;
      font-family: 'Helvetica Neue';
    }
  }
  .demo-typo-size {
    .h1 {
      font-size: 26px;
      line-height: 38px;
    }
    .h2 {
      font-size: 20px;
      line-height: 26px;
    }
    .h3 {
      font-size: 16px;
      line-height: 24px;
    }
    .text-regular {
      font-size: 14px;
      line-height: 22px;
    }
    .text-small {
      font-size: 12px;
      line-height: 16px;
    }
    .color-dark-light {
      color: #99a9bf;
    }
  }
  #demo-font-color{
    .text{
      font-size: 18px;
    }
    .color-263{
      color: #2F374C;
    }
    .color-455{
      color: #546174;
    }
    .color-b0b{
      color:#A5B2C5;
    }
    .color-098{
      color:#3c8dbc;
    }
    .dark-bg{
      padding:5px;
      background-color: #546174;
    }
    .color-fff{
      color:#fff;
    }
  }
  .typo-PingFang {
    font-family: 'PingFang SC';
  }
  .typo-Hiragino {
    font-family: 'Hiragino Sans GB';
  }
  .typo-Microsoft {
    font-family: 'Microsoft YaHei';
  }
  /* 英文 */
  .typo-Helvetica-Neue {
    font-family: 'Helvetica Neue';
  }
  .typo-Helvetica {
    font-family: 'Helvetica';
  }
  .typo-Arial {
    font-family: 'Arial';
  }
</style>

## Typography 字体

我们对字体进行统一规范，力求在各个操作系统下都有最佳展示效果。

### 注意点说在前面：
因为设计师使用的 sketch 工具，没有bold这种设定，他们只能通过设置字体的字重来体现加粗与否，所以经常会出现像下面这样的标注字体：
```css
font-family:PingFangSC-Medium;
```
所以如果遇上 PingFangSC-Medium 这样的标注，那就使用 PingFangSC 字体的 font-weight 的 bold 效果：
```css
font-family:PingFangSC;
font-weight:bold;
```
对应的下面这种sketch出的标注：
```css
font-family:PingFangSC-regular;
```
对应到前端代码上就是正常的：
```css
font-family:PingFangSC;
```
如果出现下面这种标注的字体，请直接打回，谢谢
```css
font-family:PingFangSC-light;
```

微软雅黑字体规则同上。

### 中文字体

<div class="demo-typo-box typo-PingFang">
  和畅惠风
  <div class="name">PingFang SC</div>
</div>
<div class="demo-typo-box typo-Hiragino">
  和畅惠风
  <div class="name">Hiragino Sans GB</div>
</div>
<div class="demo-typo-box typo-Microsoft">
  和畅惠风
  <div class="name">Microsoft YaHei</div>
</div>

### 英文／数字字体

<div class="demo-typo-box typo-Helvetica-neue">
  RGag
  <div class="name">Helvetica Neue</div>
</div>
<div class="demo-typo-box typo-Helvetica">
  RGag
  <div class="name">Helvetica</div>
</div>
<div class="demo-typo-box typo-Arial">
  RGag
  <div class="name">Arial</div>
</div>

### Font-family 代码

```css
font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
```

### 字体使用规范

<table class="demo-typo-size">
  <tbody>
    <tr>
      <td>示例及场景</td>
      <td>scss 变量</td>
      <td>字号值</td>
    </tr>
    <tr>
      <td class="h1">页面标题</td>
      <td class="h1">$--font-size-page</td>
      <td class="color-dark-light">26px line-height 38px</td>
    </tr>
    <tr>
      <td class="h2">模块级标题</td>
      <td class="h2">$--font-size-module</td>
      <td class="color-dark-light">20px line-height 26px</td>
    </tr>
    <tr>
      <td class="h3">段落标题</td>
      <td class="h3">$--font-size-paragraph</td>
      <td class="color-dark-light">16px line-height 24px</td>
    </tr>
    <tr>
      <td class="text-regular">正文</td>
      <td class="text-regular">$--font-size-primary</td>
      <td class="color-dark-light">14px line-height 22px</td>
    </tr>
    <tr>
      <td class="text-small">正文（小）</td>
      <td class="text-small">$--font-size-small</td>
      <td class="color-dark-light">12px line-height 16px</td>
    </tr>
  </tbody>
</table>

less 中的字号变量，只要将scss变量的$--替换成@即可。

### 字体颜色规范
<table id="demo-font-color">
  <tbody>
    <tr>
      <td>示例</td>
      <td>SCSS颜色变量</td>
      <td>颜色值</td>
      <td>适用场景</td>
    </tr>
    <tr>
      <td class="text color-263">Font Color</td>
      <td class="key">$--color-text-primary</td>
      <td class="value">#2F374C</td>
      <td class="note">适用于标题文字</td>
    </tr>
    <tr>
      <td class="text color-455">Font Color</td>
      <td class="key">$--color-text-regular</td>
      <td class="value">#546174</td>
      <td class="note">适用于一般文字</td>
    </tr>
    <tr>
      <td class="text color-b0b">Font Color</td>
      <td class="key">$--color-text-placeholder</td>
      <td class="value">#A5B2C5</td>
      <td class="note">适用于注释、未选状态文字</td>
    </tr>
    <tr>
      <td class="text color-098">Font Color</td>
      <td class="key">$--color-primary</td>
      <td class="value">#3c8dbc</td>
      <td class="note">适用于链接</td>
    </tr>
    <tr>
      <td class="text color-fff"><span class="dark-bg">Font Color</span></td>
      <td class="key">$--color-white</td>
      <td class="value">#ffffff</td>
      <td class="note">适用于深色底色</td>
    </tr>
  </tbody>
</table>

less 中的颜色变量，只要将scss变量的$--替换成@即可。

### 行高使用规范

建议行高1.5倍