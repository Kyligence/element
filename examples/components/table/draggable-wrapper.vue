<template>
  <div ref="wrapper" class="draggable-wrapper">
    <div :key="tableKey">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Sortable } from 'sortablejs';
import Swap from './swap';

export default {
  name: 'DraggableWrapper',
  props: {
    handle: {
      type: String,
      default: ''
    },
    animate: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      tableKey: 0
    };
  },
  methods: {
    makeTableSortAble() {
      const table = this.$children[0].$el.querySelector(
        '.el-table__body-wrapper tbody'
      );
      Sortable.create(table, {
        handle: this.handle,
        animation: this.animate,
        swap: true,
        swapClass: [
          'draggable-wrapper-highlight-up',
          'draggable-wrapper-highlight-down'
        ],
        onStart: () => {
          this.$emit('drag');
        },
        onEnd: ({ newIndex, oldIndex }) => {
          this.keepWrapperHeight(true);
          this.tableKey = Math.random();
          const arr = this.$children[0].data;
          const targetRow = arr.splice(oldIndex, 1)[0];
          arr.splice(newIndex, 0, targetRow);
          this.$emit('drop', { targetObject: targetRow, list: arr });
        }
      });
    },
    keepWrapperHeight(keep) {
      // eslint-disable-next-line prefer-destructuring
      const wrapper = this.$refs.wrapper;
      if (keep) {
        wrapper.style.minHeight = `${wrapper.clientHeight}px`;
      } else {
        wrapper.style.minHeight = 'auto';
      }
    }
  },
  created() {
    Sortable.mount(new Swap());
  },
  mounted() {
    this.makeTableSortAble();
  },
  watch: {
    tableKey() {
      this.$nextTick(() => {
        this.makeTableSortAble();
        this.keepWrapperHeight(false);
      });
    }
  }
};
</script>
<style lang="scss">
.draggable-wrapper {
  .draggable-wrapper-highlight-up {
    td {
      &::before {
        content:'';
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #0875da;
      }
    }
  }
  .draggable-wrapper-highlight-down {
    td {
      &::before {
        content:'';
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: #0875da;
      }
    }
  }
}
</style>
