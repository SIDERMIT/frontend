import Vue from 'vue'
import VueRouter from 'vue-router'
import MyCities from '../views/MyCities.vue'
import Dashboard from '../views/Dashboard.vue'
import CityDetail from '../views/CityDetail.vue'
import NotFound from '../views/NotFound.vue'
import NewCity from '../views/NewCity.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '', redirect: '/dashboard'
  },
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
    component: Dashboard,
    meta: {
      breadcrumb: 'Dashboard'
    }
  },
  {
    path: '/cities/new',
    name: 'NewCity',
    component: NewCity,
    meta: {
      breadcrumb: 'New city'
    }
  },
  {
    path: '/cities/:publicId',
    name: 'CityDetail',
    component: CityDetail,
    meta: {
      breadcrumb() {
        return {
          label: this.$route.params.publicId,
        }
      }
    }
  },
  { path: '/404', component: NotFound },  
  { path: '*', redirect: '/404' },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
