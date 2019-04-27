<template>
  <application-layout
    :vertical="layout.vertical"
    :white="layout.background"
  >

    <!-- BRAND NAME TEXT  -->
    <template slot='brand'>
      PiggyBank 
    </template>

     <template slot='utility'>
    </template>

  </application-layout>

</template>

<script>

export default {
  name: 'App',
  mounted () {
    this.$router.push({ name: `Home` });
  },
  data () {
    return {
      layout: {
        vertical: true,
        background: false,
        collapsable: true
      }
    }
  },
  methods: {
   }
}
</script>

<style>
.notification-icon {
  height: 13px;
  width: 10px;
  color: #fff;
  font-size: 8px;
  font-weight: 700;
  background-color: rgb(221, 10, 10);
  padding: 2px 4px;
  position: absolute;
  left: 1707px;
  top: 10px;
}
</style>
