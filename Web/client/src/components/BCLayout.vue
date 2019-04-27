<template>
  <div class="row">
      <template v-if="sectioned" v-for="(slot, name) in $slots">
          <BC-layout-section :key="name">
              <slot  :name="name"></slot>
          </BC-layout-section>
      </template>
      <template v-if="!sectioned" v-for="(slot, name) in $slots">
          <slot :name="name"></slot>
      </template>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'BC-layout',

  props: {
    sectioned: {
      type: Boolean,
      default: false
    }
  }
}
</script>
