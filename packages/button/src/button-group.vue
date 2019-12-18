<template>
  <div class="el-button-group" :class="{'is-vertical': align === 'vertical'}">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'ElButtonGroup',

    props: {
      align: {
        type: String,
        default: 'horizontal' // horizontal、vertical
      }
    }
  };
</script>
