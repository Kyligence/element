<template>
  <transition :name="disableTransitions ? '' : 'el-zoom-in-center'">
    <span
      class="el-tag"
      :class="[
        type ? 'el-tag--' + type : '',
        tagSize && `el-tag--${tagSize}`,
        {'is-hit': hit},
        {'closeable': closable},
        {'is-light': isLight}
      ]"
      :style="{backgroundColor: color}">
      <span class="el-tag__text"><slot></slot></span>
      <i class="el-tag__close"
        :class="`el-ksd-icon-close_${(tagSize === 'small' || tagSize === 'mini') ? '16' : '22'}`"
        v-if="closable"
        @click="handleClose"></i>
    </span>
  </transition>
</template>
<script>
  export default {
    name: 'ElTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      disableTransitions: Boolean,
      color: String,
      size: String,
      isLight: Boolean
    },
    methods: {
      handleClose(event) {
        this.$emit('close', event);
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    }
  };
</script>
