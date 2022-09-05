<template>
  <div
    :class="[
      'el-transfer-panel',
      filterable ? 'el-transfer-panel-filterable' : '',
    ]"
  >
    <div class="el-transfer-panel__header">
      <el-checkbox
        v-model="allChecked"
        @change="handleAllCheckedChange"
        :indeterminate="isIndeterminate"
        >{{ title }}</el-checkbox
      >
      <span class="count">{{ checkedSummary }}</span>
    </div>

    <div
      :class="['el-transfer-panel__body', hasFooter ? 'is-with-footer' : '']"
    >
      <el-input
        v-if="filterable"
        class="el-transfer-panel__filter"
        v-model="queryStr"
        size="mini"
        clearable
        :placeholder="placeholder"
        prefix-icon="el-icon-search"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
      >
        <!-- <el-button slot="append" size="mini" :class="['el-input__icon', 'el-icon-' + inputIcon]" @click="clearQuery"></el-button> -->
      </el-input>
      <div v-if="hasFunctions" class="el-transfer-panel__functions">
        <slot name="functions"></slot>
      </div>
      <el-checkbox-group
        v-loading="isLoading"
        v-model="checked"
        v-show="!hasNoMatch && data.length > 0"
        :class="{ 'is-filterable': filterable }"
        class="el-transfer-panel__list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="scrollDisabled"
        infinite-scroll-distance="10"
      >
        <div
          class="el-transfer-panel__checkbox checkbox-item"
          v-for="(item, index) in pagedData"
          :key="`${index}-${item[keyProp]}`"
          :draggable="!item.disabled"
          @dragstart="$emit('dragstart', $event, item)"
        >
          <i
            v-if="draggable"
            
            class="el-transfer-panel__item-dragger el-ksd-n-icon-grab-dots-outlined"
          />
          <el-tooltip
            :content="item.label"
            effect="dark"
            placement="top"
            :disabled="
              !showOverflowTip ? !showOverflowTip : showToolTip($el, index)
            "
          >
            <el-checkbox
              class="el-transfer-panel__item"
              :label="item[keyProp]"
              :disabled="item[disabledProp]"
            >
              <option-content
                class="option-items"
                :option="item"
                ref="optionContentLable"
              ></option-content>
            </el-checkbox>
          </el-tooltip>
        </div>
        <slot name="left-remote-load-more"></slot>
        <slot name="right-remote-load-more"></slot>
        <div
          v-if="hasMore || canScrollMore()"
          class="el-transfer-panel__load-more"
        >
          <i class="el-ksd-n-icon-spinner-outlined" />
        </div>
      </el-checkbox-group>
      <p class="el-transfer-panel__empty" v-show="hasNoMatch">
        {{ t('el.transfer.noMatch') }}
      </p>
      <p
        class="el-transfer-panel__empty"
        v-show="data.length === 0 && !hasNoMatch"
      >
        {{ t('el.transfer.noData') }}
      </p>
    </div>
    <p class="el-transfer-panel__footer" v-if="hasFooter">
      <slot name="left-footer"></slot>
      <slot name="right-footer"></slot>
    </p>
  </div>
</template>

<script>
import ElCheckboxGroup from 'kyligence-ui/packages/checkbox-group';
import ElCheckbox from 'kyligence-ui/packages/checkbox';
import ElInput from 'kyligence-ui/packages/input';
import Locale from 'kyligence-ui/src/mixins/locale';
import infiniteScroll from '../../_utils/vue-infinite-scroll';

export default {
  mixins: [Locale],

  name: 'ElTransferPanel',
  directives: { infiniteScroll },

  componentName: 'ElTransferPanel',

  components: {
    ElCheckboxGroup,
    ElCheckbox,
    ElInput,
    OptionContent: {
      props: {
        option: Object
      },
      render(h) {
        const getParent = (vm) => {
          if (vm.$options.componentName === 'ElTransferPanel') {
            return vm;
          } else if (vm.$parent) {
            return getParent(vm.$parent);
          } else {
            return vm;
          }
        };
        const parent = getParent(this);

        return parent.renderContent ? (
          parent.renderContent(h, this.option)
        ) : (
          <div class='el-transfer-panel__item-inline'>
            <div class='el-transfer-panel__item-left'>
              {this.option.icon ? (
                <span class='el-transfer-panel__item-icon'>
                  {this.option.icon}
                </span>
              ) : (
                ''
              )}
              {this.option[parent.labelProp] || this.option[parent.keyProp]}
            </div>

            {this.option.description ? (
              <div class='el-transfer-panel__item-right'>
                {this.option.description}
              </div>
            ) : (
              ''
            )}
          </div>
        );
      }
    }
  },

  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    renderContent: Function,
    placeholder: String,
    title: String,
    filterable: Boolean,
    format: Object,
    filterMethod: Function,
    defaultChecked: Array,
    props: Object,
    pageSize: Number,
    totalElement: Number,
    loadMoreText: String,
    scrollToBottom: Function,
    beforeQuery: {
      type: Function,
      default() {
        return () => {};
      }
    },
    showOverflowTip: {
      type: Boolean,
      default: false
    },
    queryStrTrim: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      checked: [],
      allChecked: false,
      isLoading: false,
      query: '',
      queryStr: '',
      inputHover: false,
      checkChangeByUser: true,
      currentPage: 1,
      labelLen: 0,
      scrollDisabled: !this.scrollToBottom
    };
  },

  watch: {
    queryStr(val, oldVal) {
      let realValue = this.queryStrTrim ? val.trim() : val;
      const Promise = window.Promise;
      const result = this.beforeQuery(this.title, realValue);

      if (result instanceof Promise) {
        this.isLoading = true;

        result
          .then(() => {
            this.query = realValue;
            this.isLoading = false;
          })
          .catch(() => {
            this.query = realValue;
            this.isLoading = false;
          });
      } else {
        this.query = realValue;
      }
    },

    checked(val, oldVal) {
      this.updateAllChecked();
      if (this.checkChangeByUser) {
        const movedKeys = val
          .concat(oldVal)
          .filter((v) => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1);
        this.$emit('checked-change', val, movedKeys);
      } else {
        this.$emit('checked-change', val);
        this.checkChangeByUser = true;
      }
    },

    data: {
      immediate: true,
      handler() {
        const checked = [];
        const filteredDataKeys = this.filteredData.map(
          (item) => item[this.keyProp]
        );
        this.checked.forEach((item) => {
          if (filteredDataKeys.indexOf(item) > -1) {
            checked.push(item);
          }
        });
        this.checkChangeByUser = false;
        this.checked = checked;
        this.$nextTick(() => {
          this.$forceUpdate();
          this.$nextTick(() => {
            this.labelWidth('data');
          });
        });
      }
    },

    checkableData() {
      this.updateAllChecked();
    },

    defaultChecked: {
      immediate: true,
      handler(val, oldVal) {
        if (
          oldVal &&
          val.length === oldVal.length &&
          val.every((item) => oldVal.indexOf(item) > -1)
        ) {
          return;
        }
        const checked = [];
        const checkableDataKeys = this.checkableData.map(
          (item) => item[this.keyProp]
        );
        val.forEach((item) => {
          if (checkableDataKeys.indexOf(item) > -1) {
            checked.push(item);
          }
        });
        this.checkChangeByUser = false;
        this.checked = checked;
      }
    }
  },

  computed: {
    filteredData() {
      return this.data.filter((item) => {
        if (typeof this.filterMethod === 'function') {
          return this.filterMethod(this.query, item);
        } else {
          const label = item[this.labelProp] || item[this.keyProp].toString();
          if (this.queryStrTrim) {
            if (this.query) {
              return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            } else {
              return true;
            }
          } else {
            return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          }
        }
      });
    },
    pagedData() {
      if (this.pageSize) {
        return this.filteredData.slice(0, this.currentPage * this.pageSize);
      }
      return this.filteredData;
    },
    checkableData() {
      return this.filteredData.filter((item) => !item[this.disabledProp]);
    },
    hasMore() {
      const hasMore = this.pagedData.length !== this.filteredData.length;
      this.scrollDisabled = !this.scrollToBottom && !hasMore;
      return hasMore;
    },
    checkedSummary() {
      const checkedLength = this.checked.length;
      const dataLength = this.getDataLength();
      const { noChecked, hasChecked } = this.format;
      if (noChecked && hasChecked) {
        return checkedLength > 0
          ? hasChecked
            .replace(/\${checked}/g, checkedLength)
            .replace(/\${total}/g, dataLength)
          : noChecked.replace(/\${total}/g, dataLength);
      } else {
        return `${checkedLength}/${dataLength}`;
      }
    },

    isIndeterminate() {
      const checkedLength = this.checked.length;
      return checkedLength > 0 && checkedLength < this.checkableData.length;
    },

    hasNoMatch() {
      return this.query.length > 0 && this.filteredData.length === 0;
    },

    inputIcon() {
      return this.query.length > 0 && this.inputHover
        ? 'circle-close'
        : 'search';
    },

    labelProp() {
      return this.props.label || 'label';
    },

    keyProp() {
      return this.props.key || 'key';
    },

    disabledProp() {
      return this.props.disabled || 'disabled';
    },

    hasFunctions() {
      return !!this.$slots['functions'] && this.$slots['functions'].length;
    },

    hasFooter() {
      return (
        (!!this.$slots['left-footer'] && this.$slots['left-footer'].length) ||
        (!!this.$slots['right-footer'] && this.$slots['right-footer'].length)
      );
    }
  },

  methods: {
    getDataLength() {
      let dataLength = this.data.length;
      if (
        this.totalElement !== undefined &&
        this.totalElement !== '' &&
        this.totalElement !== null
      ) {
        dataLength = this.totalElement;
      }
      return dataLength;
    },
    canScrollMore() {
      if (this.scrollToBottom) {
        const dataLength = this.getDataLength();
        const canScrollMore = this.data.length < dataLength;
        if (!this.hasMore) {
          this.scrollDisabled = !canScrollMore;
        }
        return canScrollMore;
      }
      return false;
    },
    loadMore() {
      if (this.scrollToBottom) {
        this.currentPage++;
        this.scrollDisabled = true;
        this.scrollToBottom(this.currentPage).finally(() => {
          this.scrollDisabled = false;
        });
      } else {
        this.currentPage++;
      }
    },
    updateAllChecked() {
      const checkableDataKeys = this.checkableData.map(
        (item) => item[this.keyProp]
      );
      this.allChecked =
        checkableDataKeys.length > 0 &&
        checkableDataKeys.every((item) => this.checked.indexOf(item) > -1);
    },

    handleAllCheckedChange(value) {
      this.checked = value
        ? this.checkableData.map((item) => item[this.keyProp])
        : [];
    },

    clearQuery() {
      if (this.inputIcon === 'circle-close') {
        this.query = '';
      }
    },

    showToolTip(e, index) {
      const w =
        (e &&
          e.querySelectorAll('.el-checkbox__label .option-items').length &&
          e.querySelectorAll('.el-checkbox__label .option-items')[index] &&
          e.querySelectorAll('.el-checkbox__label .option-items')[index]
            .offsetWidth) ||
        0;
      return w <= this.labelLen;
    },

    labelWidth() {
      if (this.labelLen > 0) return;
      const el = this.$el.querySelectorAll(
        '.el-transfer-panel__item .el-checkbox__label'
      );
      el.length && (this.labelLen = el[0].offsetWidth - 24);
    }
  },

  mounted() {
    this.labelWidth();
  }
};
</script>
