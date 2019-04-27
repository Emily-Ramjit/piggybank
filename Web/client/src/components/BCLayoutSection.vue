<template>

  <div :class="[{
    'col-sm-24 col-lg-18' : primary,
    'col-sm-24 col-lg-6' : secondary,
    'col-sm-24': !secondary && !primary
    }]">
      <slot></slot>
  </div>

</template>

<script>
export default {
  props: {
    primary: Boolean,
    secondary: Boolean
  }
}
</script>
