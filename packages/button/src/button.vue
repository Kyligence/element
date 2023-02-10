<template>
  <button
    class="el-button"
    @click="handleClick"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-text': text,
        'is-text-nobg': nobgText,
        'is-circle': circle,
        'is-icon-button': iconButton,
        'is-icon-button-mini': iconButtonMini
      }
    ]"
  >
    <i class="el-ksd-icon-loading_22" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default" class="button-text"><slot></slot></span>
    <i :class="iconr" v-if="iconr && !loading"></i>
  </button>
</template>
<script>
  export default {
    name: 'ElButton',

    inject: {
      elFormItem: {
        default: ''
      }
    },

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: {
        type: String,
        default: 'medium'
      },
      icon: {
        type: String,
        default: ''
      },
      iconr: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      text: Boolean,
      nobgText: Boolean,
      circle: Boolean,
      iconButton: Boolean,
      iconButtonMini: Boolean
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      }
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
