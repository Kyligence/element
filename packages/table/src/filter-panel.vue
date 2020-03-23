<template>
  <transition name="el-zoom-in-top">
    <div class="el-table-filter" v-if="multiple" v-show="showPopper">
      <div class="el-table-filter__content">
        <div>{{filterPanelTop}}</div>
        <el-checkbox-group class="el-table-filter__checkbox-group" v-model="filteredValue" @change="filterMultipleValue">
          <el-checkbox
            v-for="filter in filters"
            :key="filter.value"
            :label="filter.value"><i :class="['filter-icon', filter.icon]" v-if="filter.icon"></i>{{ filter.text }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="el-table-filter__bottom" v-show="showMultipleFooter">
        <button @click="handleConfirm"
          :class="{ 'is-disabled': filteredValue.length === 0 }"
          :disabled="filteredValue.length === 0">{{ t('el.table.confirmFilter') }}</button>
        <button @click="handleReset">{{ t('el.table.resetFilter') }}</button>
      </div>
    </div>
    <div class="el-table-filter" v-else v-show="showPopper">
      <ul class="el-table-filter__list">
        <li class="el-table-filter__list-item"
            v-if="showAllSelectOption"
            :class="{ 'is-active': filterValue === undefined || filterValue === null }"
            @click="handleSelect(null)">{{ t('el.table.clearFilter') }}</li>
        <li class="el-table-filter__list-item"
            v-for="filter in filters"
            :label="filter.value"
            :key="filter.value"
            :class="{ 'is-active': isActive(filter) }"
            @click="handleSelect(filter.value)" >{{ filter.text }}</li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popper from 'kyligence-ui/src/utils/vue-popper';
  import { PopupManager } from 'kyligence-ui/src/utils/popup';
  import Locale from 'kyligence-ui/src/mixins/locale';
  import Clickoutside from 'kyligence-ui/src/utils/clickoutside';
  import Dropdown from './dropdown';
  import ElCheckbox from 'kyligence-ui/packages/checkbox';
  import ElCheckboxGroup from 'kyligence-ui/packages/checkbox-group';

  export default {
    name: 'ElTableFilterPanel',

    mixins: [Popper, Locale],

    directives: {
      Clickoutside
    },

    components: {
      ElCheckbox,
      ElCheckboxGroup
    },

    props: {
      placement: {
        type: String,
        default: 'bottom-end'
      },
      showMultipleFooter: {
        type: Boolean,
        default: true
      },
      filterChange: Function,
      filterPanelTop: Number
    },

    customRender(h) {
      return (<div class="el-table-filter">
        <div class="el-table-filter__content">
        </div>
        <div class="el-table-filter__bottom">
          <button on-click={ this.handleConfirm }>{ this.t('el.table.confirmFilter') }</button>
          <button on-click={ this.handleReset }>{ this.t('el.table.resetFilter') }</button>
        </div>
      </div>);
    },

    methods: {
      isActive(filter) {
        return filter.value === this.filterValue;
      },

      handleOutsideClick() {
        this.showPopper = false;
      },

      handleConfirm() {
        this.confirmFilter(this.filteredValue);
        this.handleOutsideClick();
      },

      handleReset() {
        this.filteredValue = [];
        this.confirmFilter(this.filteredValue);
        this.handleOutsideClick();
      },

      handleSelect(filterValue) {
        if (!this.showAllSelectOption && typeof this.filterChange === 'function') {
          const isActive = this.isActive({value: filterValue});
          if (isActive) {
            this.filteredValue.splice(0, 1);
          } else {
            this.filteredValue.splice(0, 1, filterValue);
          }
          this.filterChange(this.filteredValue);
        } else {
          this.filterValue = filterValue;
          if ((typeof filterValue !== 'undefined') && (filterValue !== null)) {
            this.confirmFilter(this.filteredValue);
          } else {
            this.confirmFilter([]);
          }
        }

        this.handleOutsideClick();
      },

      confirmFilter(filteredValue) {
        this.table.store.commit('filterChange', {
          column: this.column,
          values: filteredValue
        });
        this.table.store.updateAllSelected();
      },
      // 抛出多选值
      filterMultipleValue(val) {
        if (this.showMultipleFooter) return;
        if (typeof this.filterChange === 'function') {
          this.filterChange(val);
        }
      }
    },

    data() {
      return {
        table: null,
        cell: null,
        column: null
      };
    },

    computed: {
      filters() {
        return this.column && this.column.filters;
      },

      filterValue: {
        get() {
          return (this.column.filteredValue || [])[0];
        },
        set(value) {
          if (this.filteredValue) {
            if ((typeof value !== 'undefined') && (value !== null)) {
              this.filteredValue.splice(0, 1, value);
            } else {
              this.filteredValue.splice(0, 1);
            }
          }
        }
      },

      filteredValue: {
        get() {
          if (this.column) {
            return this.column.filteredValue || [];
          }
          return [];
        },
        set(value) {
          if (this.column) {
            this.column.filteredValue = value;
          }
        }
      },

      multiple() {
        if (this.column) {
          return this.column.filterMultiple;
        }
        return true;
      }
    },

    mounted() {
      this.popperElm = this.$el;
      this.referenceElm = this.cell;
      this.table.bodyWrapper.addEventListener('scroll', () => {
        this.updatePopper();
      });

      this.$watch('showPopper', (value) => {
        if (this.column) this.column.filterOpened = value;
        if (value) {
          Dropdown.open(this);
        } else {
          Dropdown.close(this);
        }
      });

      this.$watch('filteredValue', (val) => {
        let timer = null
        let _this = this
        timer = setTimeout(function () {
          if (_this._isDestroyed) {
            clearTimeout(timer)
            return
          }
          _this.updatePopper();
        }, 400);
      });
    },
    watch: {
      showPopper(val) {
        if (val === true && parseInt(this.popperJS._popper.style.zIndex, 10) < PopupManager.zIndex) {
          this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
        }
      }
    }
  };
</script>
