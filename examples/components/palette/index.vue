<template>
  <div>
    <el-input placeholder="请输入" v-model="value" @input="handleChange" />
    <div class="colors-list">
      <div
        v-for="palette in filteredPalette"
        :key="palette[0]"
        class="colors-item"
        @click="copyTkl(palette[0])"
      >
        <div class="colors-item-bg" :style="{ background: palette[1] }"></div>
        <div class="colors-item-text">{{ palette[1] }}</div>
        <div class="colors-item-name">{{ palette[0] }}</div>
        <input class="colors-item-copy" :value="palette[0]" :id="palette[0]" readonly />
      </div>
    </div>
  </div>
</template>

<script>
import { Input } from 'kyligence-ui';
import paletteLess from './paletteLess.json';

export default {
  name: 'Colors',
  components: {
    ElInput: Input
  },
  data() {
    return {
      value: ''
    };
  },
  computed: {
    filteredPalette() {
      const arr = this.processArray(paletteLess);
      return arr.filter(([name, color]) => {
        let lowerValue = this.value.toLowerCase().replace(/\s/g, '').replace(/\//g, '-');
        if (lowerValue.startsWith('function-')) {
          const splitValue = lowerValue.split('-');
          let end = 1;
          if (splitValue[1] === splitValue[2]) {
            end = 2;
          }
          splitValue.splice(0, end);
          lowerValue = splitValue.join('-');
        }
        return name.includes(lowerValue) || color.includes(lowerValue);
      });
    }
  },
  methods: {
    handleChange(value) {
      this.value = value;
    },
    processArray(arr) {
      const colors = new Set(); // 用于存储已出现的颜色值
      const result = [];
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (colors.has(item[1])) { // 如果颜色已经出现过
          if (item[0].startsWith('@color-')) {
            result.push(item);
          }
        } else {
          colors.add(item[1]);
          result.push(item); // 添加到结果数组
        }
      }
      return result;
    },
    copyTkl(name) {
      const input = document.getElementById(name);
      input.select();
      document.execCommand('copy');
      this.$message.success(`复制成功：${name}`);
    }
  }
};
</script>

<style>
.colors-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
}
.colors-item {
  position: relative;
  flex-shrink: 0;
  width: 18%;
  height: 100px;
  margin: 3px 2.5% 3px 0;
  padding: 10px;
  overflow: hidden;
  text-align: center;
  list-style: none;
  background-color: inherit;
  border-radius: 4px;
  cursor: pointer;
  background-color: rgba(240, 240, 240, 0.5);
  color: #666;
  box-sizing: border-box;

  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.colors-item:nth-child(5n) {
  margin-right: 0;
}
.colors-item:hover {
  color: #fff;
  background-color: #0875da;
}

.colors-item-bg {
  width: 80%;
  height: 24px;
}
.colors-item-name {
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.colors-item-text {
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.colors-item-copy {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}

</style>