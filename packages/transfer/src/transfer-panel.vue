<template>
  <div class="el-transfer-panel">
    <p class="el-transfer-panel__header">
      <el-checkbox
        v-model="allChecked"
        @change="handleAllCheckedChange"
        :indeterminate="isIndeterminate">
        {{ title }}
        <span>{{ checkedSummary }}</span>
      </el-checkbox>
    </p>
    
    <div :class="['el-transfer-panel__body', hasFooter ? 'is-with-footer' : '']">
      <el-input 
        class="el-transfer-panel__filter"
        v-model="queryStr"
        size="mini"
        clearable
        :placeholder="placeholder"
        prefix-icon="el-icon-search"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
        v-if="filterable">
        <!-- <el-button slot="append" size="mini" :class="['el-input__icon', 'el-icon-' + inputIcon]" @click="clearQuery"></el-button> -->
      </el-input>
      <el-checkbox-group
        v-loading="isLoading"
        v-model="checked"
        v-show="!hasNoMatch && data.length > 0"
        :class="{ 'is-filterable': filterable }"
        class="el-transfer-panel__list">
        <div class="checkbox-item" v-for="(item, index) in pagedData" :key="item[keyProp]">
          <el-tooltip :content="item.label" effect="dark" placement="top" :disabled="!showOverflowTip ? !showOverflowTip : showToolTip($el, index)">
            <el-checkbox
              class="el-transfer-panel__item"
              :label="item[keyProp]"
              :disabled="item[disabledProp]"
              >
                <option-content class="option-items" :option="item" ref="optionContentLable"></option-content>
            </el-checkbox>
          </el-tooltip>
        </div>
        <slot name="left-remote-load-more"></slot>
        <slot name="right-remote-load-more"></slot>
        <div @click="loadMore" v-if="hasMore" class="load-more">{{loadMoreText}}</div>
      </el-checkbox-group>
      <p
        class="el-transfer-panel__empty"
        v-show="hasNoMatch">{{ t('el.transfer.noMatch') }}</p>
      <p
        class="el-transfer-panel__empty"
        v-show="data.length === 0 && !hasNoMatch">{{ t('el.transfer.noData') }}</p>
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

  export default {
    mixins: [Locale],

    name: 'ElTransferPanel',

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
          const getParent = vm => {
            if (vm.$options.componentName === 'ElTransferPanel') {
              return vm;
            } else if (vm.$parent) {
              return getParent(vm.$parent);
            } else {
              return vm;
            }
          };
          const parent = getParent(this);
          return parent.renderContent
            ? parent.renderContent(h, this.option)
            : <span>{ this.option[parent.labelProp] || this.option[parent.keyProp] }</span>;
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
      beforeQuery: {
        type: Function,
        default() {
          return () => {};
        }
      },
      showOverflowTip: {
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
        labelLen: 0
      };
    },

    watch: {
      queryStr(val, oldVal) {
        const Promise = window.Promise;
        const result = this.beforeQuery(this.title, val);

        if (result instanceof Promise) {

          this.isLoading = true;

          result.then(() => {
            this.query = val;
            this.isLoading = false;
          }).catch(() => {
            this.query = val;
            this.isLoading = false;
          });

        } else {
          this.query = val;
        }
      },

      checked(val, oldVal) {
        this.updateAllChecked();
        if (this.checkChangeByUser) {
          const movedKeys = val.concat(oldVal)
            .filter(v => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1);
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
          const filteredDataKeys = this.filteredData.map(item => item[this.keyProp]);
          this.checked.forEach(item => {
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
          if (oldVal && val.length === oldVal.length &&
            val.every(item => oldVal.indexOf(item) > -1)) return;
          const checked = [];
          const checkableDataKeys = this.checkableData.map(item => item[this.keyProp]);
          val.forEach(item => {
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
        return this.data.filter(item => {
          if (typeof this.filterMethod === 'function') {
            return this.filterMethod(this.query, item);
          } else {
            const label = item[this.labelProp] || item[this.keyProp].toString();
            return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
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
        return this.filteredData.filter(item => !item[this.disabledProp]);
      },
      hasMore() {
        return this.pagedData.length !== this.filteredData.length;
      },
      checkedSummary() {
        const checkedLength = this.checked.length;
        let dataLength = this.data.length;
        if (this.totalElement !== undefined && this.totalElement !== '' && this.totalElement !== null) {
          dataLength = this.totalElement;
        }
        const { noChecked, hasChecked } = this.format;
        if (noChecked && hasChecked) {
          return checkedLength > 0
            ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength)
            : noChecked.replace(/\${total}/g, dataLength);
        } else {
          return `${ checkedLength }/${ dataLength }`;
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

      hasFooter() {
        return (!!this.$slots['left-footer'] && this.$slots['left-footer'].length) || (!!this.$slots['right-footer'] && this.$slots['right-footer'].length);
      }
    },

    methods: {
      loadMore() {
        this.currentPage++;
      },
      updateAllChecked() {
        const checkableDataKeys = this.checkableData.map(item => item[this.keyProp]);
        this.allChecked = checkableDataKeys.length > 0 &&
          checkableDataKeys.every(item => this.checked.indexOf(item) > -1);
      },

      handleAllCheckedChange(value) {
        this.checked = value
          ? this.checkableData.map(item => item[this.keyProp])
          : [];
      },

      clearQuery() {
        if (this.inputIcon === 'circle-close') {
          this.query = '';
        }
      },

      showToolTip(e, index) {
        const w = e && e.querySelectorAll('.el-checkbox__label .option-items').length && e.querySelectorAll('.el-checkbox__label .option-items')[index] && e.querySelectorAll('.el-checkbox__label .option-items')[index].offsetWidth || 0;
        return w <= this.labelLen;
      },

      labelWidth() {
        if (this.labelLen > 0) return;
        const el = this.$el.querySelectorAll('.el-transfer-panel__item .el-checkbox__label');
        el.length && (this.labelLen = el[0].offsetWidth - 24);
      }
    },

    mounted() {
      this.labelWidth();
    }
  };
</script>
