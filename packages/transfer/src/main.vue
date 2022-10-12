<template>
  <div
    ref="transfer"
    class="el-transfer"
    :class="{ 'el-transfer--no-buttons': !showAddToLeft && !showAddToRight }"
  >
    <transfer-panel
      v-bind="$props"
      ref="leftPanel"
      :data="sourceData"
      :title="titles[0] || t('el.transfer.titles.0')"
      :format="formats[0] || format || {}"
      :default-checked="leftDefaultChecked"
      :pageSize="pageSizes[0]"
      :totalElement="totalElements[0]"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      :before-query="beforeQuery"
      :show-overflow-tip="showOverflowTip"
      :scroll-to-bottom="leftScrollToBottom"
      :draggable="false"
      :render-item-handles="leftRenderItemHandles"
      :render-description="leftRenderDescription"
      @checked-change="onSourceCheckedChange"
    >
      <template slot="functions"><slot name="left-functions"></slot></template>
      <template slot="item-hover">
        <slot name="left-item-hover"></slot>
      </template>

      <template slot="left-remote-load-more"
        ><slot name="left-remote-load-more"></slot
      ></template>
      <template slot="left-footer"><slot name="left-footer"></slot></template>
    </transfer-panel>
    <div class="el-transfer__buttons">
      <el-button
        v-if="showAddToLeft"
        type="primary"
        plain
        icon-button-mini
        :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToLeft"
        :disabled="rightChecked.length === 0"
      >
        <i class="el-icon-arrow-left"></i>
        <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
      </el-button>
      <el-button
        v-if="showAddToRight"
        type="primary"
        plain
        icon-button-mini
        :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToRight"
        :disabled="leftChecked.length === 0"
      >
        <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <transfer-panel
      v-bind="$props"
      ref="rightPanel"
      :data="targetData"
      :title="titles[1] || t('el.transfer.titles.1')"
      :format="formats[1] || format"
      :default-checked="rightDefaultChecked"
      :pageSize="pageSizes[1]"
      :totalElement="totalElements[1]"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      :before-query="beforeQuery"
      :show-overflow-tip="showOverflowTip"
      :scroll-to-bottom="rightScrollToBottom"
      :draggable="draggable"
      :render-item-handles="rightRenderItemHandles"
      :render-description="rightRenderDescription"
      closable
      :checkable="rightCheckable"
      @dragstart="dragstart"
      @checked-change="onTargetCheckedChange"
      @remove="removeValues"
    >
      <template slot="functions"><slot name="right-functions"></slot></template>
      <template v-slot:item-hover>
        <slot name="right-item-hover"></slot>
      </template>
      <template slot="right-remote-load-more"
        ><slot name="right-remote-load-more"></slot
      ></template>
      <template slot="right-footer"><slot name="right-footer"></slot></template>
    </transfer-panel>
  </div>
</template>

<script>
import ElButton from 'kyligence-ui/packages/button';
import Emitter from 'kyligence-ui/src/mixins/emitter';
import Locale from 'kyligence-ui/src/mixins/locale';
import TransferPanel from './transfer-panel.vue';
import Migrating from 'kyligence-ui/src/mixins/migrating';
// eslint-disable-next-line no-unused-vars
import Sortable from '../../_utils/sortable';

export default {
  name: 'ElTransfer',

  mixins: [Emitter, Locale, Migrating],

  components: {
    TransferPanel,
    ElButton
  },

  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    titles: {
      type: Array,
      default() {
        return [];
      }
    },
    buttonTexts: {
      type: Array,
      default() {
        return [];
      }
    },
    filterPlaceholder: {
      type: String,
      default: ''
    },
    filterMethod: Function,
    leftDefaultChecked: {
      type: Array,
      default() {
        return [];
      }
    },
    rightDefaultChecked: {
      type: Array,
      default() {
        return [];
      }
    },
    renderContent: Function,
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    format: {
      type: Object,
      default() {
        return {};
      }
    },
    formats: {
      type: Array,
      default() {
        return [];
      }
    },
    filterable: Boolean,
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          key: 'key',
          disabled: 'disabled'
        };
      }
    },
    targetOrder: {
      type: String,
      default: 'unshift'
    },
    beforeQuery: {
      type: Function,
      default() {
        return () => {};
      }
    },
    pageSizes: {
      type: Array,
      default() {
        return [];
      }
    },
    totalElements: {
      type: Array,
      default() {
        return [];
      }
    },
    loadMoreText: {
      type: String,
      default: 'Load More ...'
    },
    showOverflowTip: {
      type: Boolean,
      default: false
    },
    queryStrTrim: {
      type: Boolean,
      default: false
    },
    leftScrollToBottom: {
      type: Function
    },
    rightScrollToBottom: {
      type: Function
    },
    autoAddToRight: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    rightCheckable: {
      type: Boolean,
      default: true
    },
    showAddToRight: {
      type: Boolean,
      default: true
    },
    showAddToLeft: {
      type: Boolean,
      default: true
    },
    leftRenderItemHandles: {
      type: Function | Array
    },
    rightRenderItemHandles: {
      type: Function | Array
    },
    leftRenderDescription: {
      type: Function
    },
    rightRenderDescription: {
      type: Function
    }
  },

  data() {
    return {
      leftChecked: [],
      rightChecked: [],
      draggingKey: null
    };
  },

  computed: {
    dataObj() {
      const key = this.props.key;
      return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {});
    },

    sourceData() {
      return this.data.filter(
        (item) => this.value.indexOf(item[this.props.key]) === -1
      );
    },

    targetData() {
      const result = this.targetOrder === 'original'
        ? this.data.filter(
          (item) => this.value.indexOf(item[this.props.key]) > -1
        )
        : this.value.map((key) => this.dataObj[key]).filter(item=>item !== undefined);
      return result;
    },

    hasButtonTexts() {
      return this.buttonTexts.length === 2;
    }
  },

  watch: {
    value(val) {
      this.dispatch('ElFormItem', 'el.form.change', val);
    }
  },
  mounted() {
    if (this.draggable) {
      const transfer = this.$refs.transfer; // .$el
      const rightPanel = transfer
        .getElementsByClassName('el-transfer-panel')[1]
        .getElementsByClassName('el-transfer-panel__body')[0];
      const rightEl = rightPanel.getElementsByClassName(
        'el-transfer-panel__list'
      )[0];
      Sortable.create(rightEl, {
        handle: '.el-transfer-panel__item-dragger',
        swap: false,
        swapClass: [
          'el-transfer-draggable--swap-up',
          'el-transfer-draggable--swap-down'
        ],
        onEnd: (e) => {
          const { oldIndex, newIndex } = e;
          const temp = this.value[oldIndex];
          if (temp === undefined) {
            return;
          }
          const currentValue = [...this.value];
          const target = currentValue.splice(oldIndex, 1)[0];
          currentValue.splice(newIndex, 0, target);

          this.$emit('input', currentValue);
          this.$emit('change', currentValue, 'drag', [newIndex, oldIndex]);
        }
      });
      rightPanel.ondragover = (e) => {
        e.preventDefault();
      };
      rightPanel.ondrop = (e) => {
        e.preventDefault();
        // const index = this.value.indexOf(this.draggingKey);
        // if (index === -1) {
        //   const currentValue = [...this.value];
        //   currentValue.push(this.draggingKey);
        //   this.$emit('input', currentValue);
        //   this.$emit('change', currentValue, 'drag', [index, -1]);
        // }
      };
    }
    // const leftPanel = transfer
    //   .getElementsByClassName('el-transfer-panel')[0]
    //   .getElementsByClassName('el-transfer-panel__body')[0];
    // const leftEl = leftPanel.getElementsByClassName(
    //   'el-transfer-panel__list'
    // )[0];
    // Sortable.create(leftEl, {
    //   handle: '.el-transfer-panel__item-dragger',
    //   swap: true,
    //   swapClass: [
    //     'el-transfer-draggable--swap-up',
    //     'el-transfer-draggable--swap-down'
    //   ],
    //   onEnd: (e) => {
    //     setTimeout(() => {
    //       let { oldIndex, newIndex } = e;
    //       const temp = this.data[oldIndex];
    //       if (!temp || temp === 'undefined') {
    //         return;
    //       }
    //       let target;
    //       let currentData = [...this.data];
    //       const currentPagedData = [...this.$refs.leftPanel.pagedData];

    //       const diff = newIndex - oldIndex;
    //       oldIndex = currentData.findIndex(
    //         (item) => item === currentPagedData[oldIndex]
    //       );
    //       newIndex = oldIndex + diff;

    //       target = currentData.splice(oldIndex, 1)[0];
    //       currentData.splice(newIndex, 0, target);
    //       currentData = currentData.map((item) => {
    //         item.index = Math.random();
    //         return item;
    //       });
    //       this.$emit('update:data', currentData);
    //     });

    //   }
    // });
    // leftPanel.ondragover = (e) => {
    //   e.preventDefault();
    // };
    // leftPanel.ondrop = (e) => {
    //   e.preventDefault();
    //   const index = this.value.indexOf(this.draggingKey);
    //   if (index !== -1) {
    //     const currentValue = [...this.value];
    //     currentValue.splice(index, 1);
    //     this.$emit('input', currentValue);
    //     this.$emit('change', currentValue, 'drag', [index, -1]);
    //   }
    // };
  },
  methods: {
    dragstart(_e, item) {
      this.draggingKey = item.key;
    },
    getMigratingConfig() {
      return {
        props: {
          'footer-format': 'footer-format is renamed to format.'
        }
      };
    },

    onSourceCheckedChange(val, movedKeys) {
      this.leftChecked = val;
      if (movedKeys === undefined) return;
      this.$emit('left-check-change', val, movedKeys);
      if (this.autoAddToRight) {
        this.$nextTick(() => {
          this.addToRight();
        });
      }
    },

    onTargetCheckedChange(val, movedKeys) {
      this.rightChecked = val;
      if (movedKeys === undefined) return;
      this.$emit('right-check-change', val, movedKeys);
    },

    removeValues(values) {
      let currentValue = this.value.slice();
      values.forEach((item) => {
        const index = currentValue.indexOf(item);
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      });
      this.$emit('input', currentValue);
      this.$emit('change', currentValue, 'left', this.rightChecked);
    },

    addToLeft() {
      this.removeValues(this.rightChecked);
    },

    addToRight() {
      let currentValue = this.value.slice();
      const itemsToBeMoved = [];
      const key = this.props.key;
      this.data.forEach((item) => {
        const itemKey = item[key];
        if (
          this.leftChecked.indexOf(itemKey) > -1 &&
          this.value.indexOf(itemKey) === -1
        ) {
          itemsToBeMoved.push(itemKey);
        }
      });
      currentValue =
        this.targetOrder === 'unshift'
          ? itemsToBeMoved.concat(currentValue)
          : currentValue.concat(itemsToBeMoved);
      this.$emit('input', currentValue);
      this.$emit('change', currentValue, 'right', this.leftChecked);
    },

    clearQuery(which) {
      if (which === 'left') {
        this.$refs.leftPanel.query = '';
      } else if (which === 'right') {
        this.$refs.rightPanel.query = '';
      }
    }
  }
};
</script>
