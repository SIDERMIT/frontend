import Vue from 'vue'
import VueRouter from 'vue-router'
import MyCities from '../views/MyCities.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/my_cities',
    name: 'MyCities',
    component: MyCities,
    meta: {
      breadcrumb: 'My cities'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    meta: {
      breadcrumb: 'Dashboard'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
