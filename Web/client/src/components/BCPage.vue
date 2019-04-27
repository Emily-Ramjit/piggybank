<template>
<div :class="[{
      'container-fluid':fullWidth,
      'container': !fullWidth,
      'p-0': nopadding
      }]">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'BC-page',

  props: {
    fullWidth: {
      type: Boolean,
      default: false
    },
    nopadding: {
      type: Boolean,
      default: false
    },
    title: String
  }
}
</script>
<style scoped>
.container {
  max-width: 1100px;
}
</style>
