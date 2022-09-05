### 加载更多，远端分页
:::demo Transfer 的数据通过 `data` 属性传入。接口分页数据是ajax 回来，全量的那个分页不适合，这时候可以用 `left-remote-load-more` 作为 slot 传入，自主外部控制分页逻辑, `show-overflow-tip` 当内容过多被隐藏时展示tooltip。
```html
<template>
  <el-transfer v-model="valueRemote" :data="dataRemote" :total-elements="remoteTotal" :show-overflow-tip="true" @change="handleChangeRemote">
    <div v-show="leftHasMore" @click="loadMoreFormRemote" class="load-more" slot="left-remote-load-more">加载更多</div>
  </el-transfer>
</template>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 20; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: false
          });
        }
        return data;
      };
      return {
        initRemoteTotal: 200,
        remoteTotal: [200],
        dataRemote: generateData(),
        valueRemote: []
      };
    },
    methods: {
      loadMoreFormRemote () {
        // 模拟数据追加
        let arr = [];
        for (let i = 1; i <=20; i++) {
          let item = {
            key: this.dataRemote.length + i,
            label: 'xxx' + i,
            disabled: false
          }
          arr.push(item);
        }
        this.dataRemote = this.dataRemote.concat(arr);
      },
      handleChangeRemote (value, direc, movedKeys) {
        // 每次数据左右挪的时候，需要动态变化左侧的总量数字
        this.remoteTotal = [this.initRemoteTotal - value.length];
        // 当前总的取回来的数据个数在左侧剩的只有8个了，就自动加载下一页
        if (this.dataRemote.length - this.valueRemote.length < 8 && this.dataRemote.length < this.initRemoteTotal) {
          this.loadMoreFormRemote()
        }
      }
    }
  };
</script>
```
:::

