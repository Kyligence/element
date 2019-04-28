<template>
  <div
    class="el-select-dropdown el-popper"
    :class="[{ 'is-multiple': $parent.multiple }, popperClass]"
    :style="{ minWidth: minWidth }">
    <div class="search-input-style" v-if="!isRemote">
      <el-input :size="size" 
        v-model="searchVal" 
        @input="searchOptions"
        @keydown.down.stop.prevent.native="navigateOptions('next')"
        @keydown.up.stop.prevent.native="navigateOptions('prev')"
        @keydown.enter.prevent.native="selectOption">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <slot></slot>
  </div>
</template>

<script type="text/babel">
  import Popper from 'kyligence-ui/src/utils/vue-popper';

  export default {
    name: 'ElSelectDropdown',

    componentName: 'ElSelectDropdown',

    mixins: [Popper],

    props: {
      placement: {
        default: 'bottom-start'
      },

      boundariesPadding: {
        default: 0
      },

      popperOptions: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },

      visibleArrow: {
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      searchOptions(x) {
        this.$parent.handleQueryChange(x);
      },
      navigateOptions (direction) {
        this.$parent.navigateOptions(direction);
      },
      selectOption() {
        this.$parent.selectOption();
      }
    },
    data() {
      return {
        minWidth: '',
        searchVal: ''
      };
    },

    computed: {
      popperClass() {
        return this.$parent.popperClass;
      },
      size() {
        return this.$parent.selectSize;
      },
      isRemote() {
        return this.$parent.remote
      }
    },

    watch: {
      '$parent.inputWidth'() {
        this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
      }
    },

    mounted() {
      this.referenceElm = this.$parent.$refs.reference.$el;
      this.$parent.popperElm = this.popperElm = this.$el;
      this.$on('updatePopper', () => {
        if (this.$parent.visible) this.updatePopper();
      });
      this.$on('visible', () => {
        if (this.$parent.visible) {
          this.searchOptions(this.searchVal)
        }
      })
      this.$on('destroyPopper', this.destroyPopper);
    }
  };
</script>
