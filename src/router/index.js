import Vue from 'vue'
import VueRouter from 'vue-router'
import MyCities from '../views/MyCities.vue'
import Dashboard from '../views/Dashboard.vue'
import CityDetail from '../views/CityDetail.vue'
import NotFound from '../views/NotFound.vue'
import NewCity from '../views/NewCity.vue'
import NewScene from '../views/NewScene.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '', redirect: '/dashboard'
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
    path: '/my_cities',
    component: {render(c) { return c('router-view'); }},
    meta: {
      breadcrumb: 'My cities'
    },
    children: [
      {
        path: '',
        name: 'MyCities',
        component: MyCities,
      },
      {
        path: ':publicId',
        name: 'CityDetail',
        component: CityDetail,
        meta: {
          breadcrumb() {
            return {
              label: this.$route.params.publicId,
            }
          }
        },
        children: [
          {
            path: 'new_scene',
            name: 'NewScene',
            component: NewScene,
            meta: {
              breadcrumb: 'New scene'
            }
          },
        ]
      },
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      breadcrumb: 'Dashboard'
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
