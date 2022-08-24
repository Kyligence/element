<template>
  <div ref="wrapper" class="el-table-draggable-wrapper">
    <div :key="tableKey">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Sortable } from './sortable.js';

export default {
  name: 'ElTableDraggableWrapper',
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
          'el-table-draggable-wrapper--highlight-up',
          'el-table-draggable-wrapper--highlight-down'
        ],
        onStart: ({ oldIndex }) => {
          const target = this.$children[0].data[oldIndex];
          this.$emit('drag', { index: oldIndex, target });
        },
        onEnd: ({ newIndex, oldIndex }) => {
          this.keepWrapperHeight(true);
          this.tableKey = Math.random();

          const arr = this.$children[0].data;
          const target = arr.splice(oldIndex, 1)[0];

          arr.splice(newIndex, 0, target);

          this.$emit('drop', {
            newIndex,
            oldIndex,
            target,
            list: arr
          });
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
    console.log('Sortable', Sortable);
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
