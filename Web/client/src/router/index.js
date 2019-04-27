import Vue from "vue";
import Router from "vue-router";
import Home from '../pages/Home';
import Dashboard from '../Dashboard'

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      meta: { layout: "App" },
      children: [
        {
          path: "/Home",
          name: "Home",
          component: Home
        }
      ]
    } 
  ]
});
