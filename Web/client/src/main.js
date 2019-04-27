// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill' 

import Vue from 'vue'
import Router from './router' 
import Store from './store' 
import Vuex from 'vuex' 
import App from './App' 

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue-awesome/icons' 
import Icon from 'vue-awesome/components/Icon' 
import PortalVue from 'portal-vue' 
import * as _ from 'lodash' 
import * as fns from 'date-fns' 
// import VueChartkick from 'vue-chartkick'
// import Chart from 'chart.js'
// import VueCalendarHeatmap from 'vue-calendar-heatmap'

// Proprietary Components Import
import BCApplicationLayout from './components/BCApplicationLayout' 
import BCButton from './components/BCButton' 
import BCLayout from './components/BCLayout' 
import BCLayoutSection from './components/BCLayoutSection' 
import BCPage from './components/BCPage' 
import BCPageHeader from './components/BCPageHeader' 
import BCMenuItem from './components/BCMenuItem' 
import BCVerticalSubMenu from './components/BCVerticalSubMenu' 
import BCTable from './components/BCTable' 
import BCSelect from './components/BCSelect' 
import BCTextfield from './components/BCTextfield' 
import BCCard from './components/BCCard'  
import BCRow from './components/BCRow' 

import BCEmptyState from './components/BCEmptyState' 

import VueBootstrapTypeahead from 'vue-bootstrap-typeahead' 

import Toasted from 'vue-toasted' 

// Proprietary components
Vue.component('application-layout', BCApplicationLayout) 
Vue.component('BC-button', BCButton) 

// Vue.component('BC-drawer', BCDrawer)
Vue.component('BC-layout-section', BCLayoutSection) 
Vue.component('BC-layout', BCLayout) 
Vue.component('BC-menu-item', BCMenuItem) 
Vue.component('BC-page', BCPage) 
Vue.component('BC-page-header', BCPageHeader) 
Vue.component('BC-vertical-submenu', BCVerticalSubMenu) 
// Addtions
Vue.component('BC-table', BCTable) 

Vue.component('BC-select', BCSelect) 
Vue.component('BC-textfield', BCTextfield) 

Vue.component('BC-card', BCCard) 


Vue.component('BC-row', BCRow) 

Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead) 
Vue.component('BC-input-autocomplete', VueBootstrapTypeahead) 

Vue.component('BC-empty-state', BCEmptyState) 

// Third Party Components
Vue.component('icon', Icon) 

Vue.use(Vuex) 
Vue.use(BootstrapVue) 
Vue.use(PortalVue) 

Vue.use(Toasted) 

Object.defineProperty(Vue.prototype, '_', { value: _ }) 
Object.defineProperty(Vue.prototype, 'fns', { value: fns }) 

Vue.config.productionTip = false 


Vue.use(Router) 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: Store,
  components: { App },
  template: '<App/>',
  created () {
  },
  beforeDestroy () {
    alert('clear local') 
  }
}) 
