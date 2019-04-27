<template>
<span>
  <BC-menu-item
    :class="showCollapse ? 'collapsed' : null"
    :title="title"
    :icon="icon"
    disclosure
    @click.native="showCollapse = !showCollapse"
  ></BC-menu-item>
  <b-collapse v-model="showCollapse" id="_asdf3">
    <ul class="nav flex-column px-4">
      <slot/>
    </ul>
  </b-collapse>
</span>
</template>

<script>
export default {
  props: {
    title: String,
    icon: String
  },

  data () {
    return {
      showCollapse: false
    }
  }
}
</script>

<style>

</style>
