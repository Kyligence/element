<style>
  .demo-color-box {
    border-radius: 4px;
    padding: 20px;
    height: 74px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;

    & .value {
      font-size: 12px;
      opacity: 0.69;
      line-height: 24px;
    }
  }
  .demo-color-box-group {
    .demo-color-box {
      border-radius: 0;
    }
    .demo-color-box:first-child {
      border-radius: 4px 4px 0 0;
    }
    .demo-color-box:last-child {
      border-radius: 0 0 4px 4px;
    }
  }
  .bg-blue-primary {
    background-color: #3c8dbc;
  }
  .bg-blue-hover {
    background-color: #3c8dbc;
  }
  .bg-blue-active {
    background-color: #3c8dbc;
  }
  .bg-secondary {
    background-color: #ECF0F8;
  }
  .bg-secondary-hover {
    background-color: #E6EBF4;
  }
  .bg-secondary-active {
    background-color: #CED6E4;
  }
  .bg-nav {
    background-color: #054885;
  }
  .bg-nav-hover {
    background-color: #3c8dbc
  }
  .bg-nav-active {
    background-color: #3c8dbc;
  }

  .bg-success {
    background-color: #66C942;
  }
  .bg-success-hover {
    background-color: #499F2B;
  }
  .bg-success-active {
    background-color: #32671E;
  }
  .bg-success-bg {
    background-color: #EFF9EB;
  }

  .bg-danger {
    background-color: #E03B3B;
  }
  .bg-danger-hover {
    background-color: #AA3B2A;
  }
  .bg-danger-active {
    background-color: #7F2727;
  }
  .bg-danger-bg {
    background-color: #FCE9E9;
  }

  .bg-warning {
    background-color: #FEA856;
  }
  .bg-warning-hover {
    background-color: #CB6301;
  }
  .bg-warning-active {
    background-color: #844001;
  }
  .bg-warning-bg {
    background-color: #FFF2E6;
  }

  .bg-info-primary {
    background-color: #3c8dbc;
  }
  .bg-info-primary-hover {
    background-color: #3c8dbc;
  }
  .bg-info-primary-active {
    background-color: #054885;
  }
  .bg-info-primary-bg {
    background-color: #F0F8FF;
  }

  .bg-info {
    background-color: #A5B2C5;
  }
  .bg-info-hover {
    background-color: #546174;
  }
  .bg-info-active {
    background-color: #3B4759;
  }
  .bg-info-bg {
    background-color: #F8F9FB;
  }

  .bg-text-primary {
    background-color: #303133;
  }
  .bg-text-regular {
    background-color: #606266;
  }
  .bg-text-secondary {
    background-color: #909399;
  }
  .bg-text-placeholder {
    background-color: #c0c4cc;
  }

  .bg-border-base {
    background-color: #dcdfe6;
  }
  .bg-border-light {
    background-color: #e4e7ed;
  }
  .bg-border-lighter {
    background-color: #ebeef5;
  }
  .bg-border-extra-light {
    background-color: #f2f6fc;
  }

  [class*=" bg-border-"] {
    color: #303133;
  }
</style>

## Color 色彩

Element 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。
这里列出的是颜色的适用场景，具体配置的色值有很多，色值变量对应的具体颜色，可查阅基础变量配置说明页。

### 主要控件色 次要控件色 导航背景色

Element 主要品牌颜色是鲜艳、友好的蓝色。

<el-row :gutter="12">
  <el-col :span="6">
    <div class="demo-color-box-group">
      <div class="demo-color-box bg-blue-primary">Blue<div class="value">#3c8dbc</div></div>
      <div class="demo-color-box bg-blue-hover">Hover<div class="value">#3c8dbc</div></div>
      <div class="demo-color-box bg-blue-active">Active<div class="value">#3c8dbc</div></div>
    </div>
  </el-col>
  <el-col :span="6">
    <div class="demo-color-box-group">
      <div class="demo-color-box bg-secondary">Secondary<div class="value">#ECF0F8</div></div>
      <div class="demo-color-box bg-secondary-hover">Secondary-hover<div class="value">#E6EBF4</div></div>
      <div class="demo-color-box bg-secondary-active">Secondary-active<div class="value">#CED7E4</div></div>
    </div>
  </el-col>
  <el-col :span="6">
    <div class="demo-color-box-group">
      <div class="demo-color-box bg-nav">Nav<div class="value">#054885</div></div>
      <div class="demo-color-box bg-nav-hover">Nav-hover<div class="value">#3c8dbc</div></div>
      <div class="demo-color-box bg-nav-active">Nav-active<div class="value">#3c8dbc</div></div>
    </div>
  </el-col>
</el-row>

### 辅助色

除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。

<el-row :gutter="12">
  <el-col :span="4">
    <div class="demo-color-box-group">
      <div class="demo-color-box bg-success">Success<div class="value">#66C942</div></div>
      <div class="demo-color-box bg-success-hover">Success-hover<div class="value">#499F2B</div></div>
      <div class="demo-color-box bg-success-active">Success-active<div class="value">#32671E</div></div>
      <div class="demo-color-box bg-success-bg">Success-bg<div class="value">#EFF9EB</div></div>
    </div>
  </el-col>
  <el-col :span="4">
    <div class="demo-color-box-group">
      <div class="demo-color-box bg-danger">Danger<div class="value">#E03B3B</div></div>
      <div class="demo-color-box bg-danger-hover">Danger-hover<div class="value">#AA3B2A</div></div>
      <div class="demo-color-box bg-danger-active">Danger-active<div class="value">#7F2727</div></div>
      <div class="demo-color-box bg-danger-bg">Danger-bg<div class="value">#FCE9E9</div></div>
    </div>
  </el-col>
  <el-col :span="4">
    <div class="demo-color-box-group">
      <div class="demo-color-box bg-warning">Warning<div class="value">#FEA856</div></div>
      <div class="demo-color-box bg-warning-hover">Warning-hover<div class="value">#CB6301</div></div>
      <div class="demo-color-box bg-warning-active">Warning-active<div class="value">#844001</div></div>
      <div class="demo-color-box bg-warning-bg">Warning-bg<div class="value">#FFF2E5</div></div>
    </div>
  </el-col>
  <el-col :span="4">
    <div class="demo-color-box-group">
      <div class="demo-color-box bg-info-primary">Info-primary<div class="value">#3c8dbc</div></div>
      <div class="demo-color-box bg-info-primary-hover">Info-primary-hover<div class="value">#3c8dbc</div></div>
      <div class="demo-color-box bg-info-primary-active">Info-primary-active<div class="value">#054885</div></div>
      <div class="demo-color-box bg-info-primary-bg">Info-primary-bg<div class="value">#F0F8FF</div></div>
    </div>
  </el-col>
  <el-col :span="4">
    <div class="demo-color-box-group">
      <div class="demo-color-box bg-info">Info<div class="value">#A5B2C5</div></div>
      <div class="demo-color-box bg-info-hover">Info-hover<div class="value">#546174</div></div>
      <div class="demo-color-box bg-info-active">Info-active<div class="value">#3B4759</div></div>
      <div class="demo-color-box bg-info-bg">Info-bg<div class="value">#F8F9FB</div></div>
    </div>
  </el-col>
</el-row>

<!-- ### 中性色（暂时没有这些场景，颜色归类先不考虑，下面的归类可以先无视）

中性色用于文本、背景和边框颜色。通过运用不同的中性色，来表现层次结构。

<el-row :gutter="12">
  <el-col :span="6">
    <div class="demo-color-box-group">
      <div class="demo-color-box bg-text-primary">主要文字<div class="value">#303133</div></div>
      <div class="demo-color-box bg-text-regular">常规文字<div class="value">#606266</div></div>
      <div class="demo-color-box bg-text-secondary">次要文字<div class="value">#909399</div></div>
      <div class="demo-color-box bg-text-placeholder">占位文字<div class="value">#C0C4CC</div></div>
    </div>
  </el-col>
  <el-col :span="6">
    <div class="demo-color-box-group">
      <div class="demo-color-box bg-border-base">一级边框<div class="value">#DCDFE6</div></div>
      <div class="demo-color-box bg-border-light">二级边框<div class="value">#E4E7ED</div></div>
      <div class="demo-color-box bg-border-lighter">三级边框<div class="value">#EBEEF5</div></div>
      <div class="demo-color-box bg-border-extra-light">四级边框<div class="value">#F2F6FC</div></div>
    </div>
  </el-col>
</el-row> -->
