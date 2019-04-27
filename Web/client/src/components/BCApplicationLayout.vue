<template>
<div id="app" :class="{
    'body-bg_white': white
    }
  ">


<!-- horizontal -->
  <nav class="navbar navbar-dark navbar-expand-sm bg-primary sticky-top p-4" v-if="!vertical">

      <a class="navbar-brand col-md-5 col-lg-3 mr-0" href="/">
        <slot name="brand"/>
      </a>

    <!-- Links -->
    <ul class="navbar-nav">
      <slot name="horizontal-menu-primary"/>
    </ul>

    <div class="w-100"></div>

    <ul class="navbar-nav">

    <!-- Utility Menu -->
      <slot name="utility"/>
      <!-- <li class="nav-item text-nowrap">
        <a class="nav-link" href="#">Sign out</a>
      </li> -->
    </ul>

  </nav>

<!-- VERTICAL -->
  <nav class="navbar navbar-dark navbar-expand-sm bg-primary sticky-top p-0" v-if="vertical">
   <!-- Brand -->
    <a class="navbar-brand col-md-5 col-lg-4 col-xl-3 mr-0" href="/">
      <slot name="brand"/>
    </a>
    <!-- Login logout -->
    <ul class="navbar-nav">
        <slot name="utility"/>
      <!-- <li class="nav-item text-nowrap">
        <a class="nav-link" href="#">Sign out</a>
      </li> -->
    </ul>
  </nav>

  <!-- MENU ITEMS  -->

   <!-- <div class="container-fluid" v-show="vertical">
    <div class="row">
      <nav class="col-md-5 col-lg-4 col-xl-3 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">Menu</h6>
          <ul class="nav flex-column">
            <slot name="vertical-menu-primary"/>
          </ul> -->

          <!-- <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
            <span>Saved Apps</span>
            <a class="d-flex align-items-center text-muted" v-b-modal="'modallg'">
              <icon name="plus-circle"></icon>
            </a>
          </h6> -->
          <!-- <ul class="nav flex-column mb-2">
            <slot name="vertical-menu-saved-reports"/>
          </ul> -->

        <!-- </div>
      </nav> -->
<!-- 
    </div> -->
  <!-- </div> -->

  <slot name="drawer"/>

  <slot name="notifications"/>

  <slot name="theme-config"/>

  <main role="main" :class="{
    'col-md-19 ml-5 pt-4 col-lg-20 col-xl-21': vertical,
    'col-md-22 ml-sm-auto col-lg-23 pt-3 px-4': mini,
    'col-md-24 ml-sm-auto col-lg-24 pt-3 px-4': !vertical}"
  >

  <portal-target name="modal"/>

  <router-view/>

  </main>
</div>

</template>

<script>
export default {
  mounted () {
  },
  props: {
    vertical: {
      type: Boolean,
      default: true
    },
    mini: {
      type: Boolean,
      default: false
    },
    white: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    white (val) {
      if (val === true) {
        document.body.classList.add('body-bg_white')
      } else {
        document.body.classList.remove('body-bg_white')
      }
    }
  }
}
</script>

<style>
#logout_sidebar_button {
  position: absolute;
  display: inline-block;
  bottom: 0;
  left: 15px;
}
.scroll-box {
  overflow-y: scroll;
  height: 600px;
  padding: 1rem;
}
.bg-primary{
  background-color: #195ca5 !important
}
</style>

<style>
.navbar {
  height:60px;
}
</style>
