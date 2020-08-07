import Vue from 'vue'
import VueRouter from 'vue-router'
import MyCities from '../views/MyCities.vue'
import Dashboard from '../views/Dashboard.vue'
import CityDetail from '../views/CityDetail.vue'
import NotFound from '../views/NotFound.vue'
import NewCity from '../views/NewCity.vue'
import NewCityStep2 from '../views/NewCityStep2.vue'
import NewScene from '../views/NewScene.vue'
import SceneDetail from '../views/SceneDetail.vue'
import NewNetwork from '../views/NewNetwork.vue'
import NetworkDetail from '../views/NetworkDetail.vue'

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
    path: '/cities/new/step2',
    name: 'NewCityStep2',
    component: NewCityStep2,
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
        path: ':cityPublicId',
        component: {render(c) { return c('router-view'); }},
        meta: {
          breadcrumb() {
            return {
              label: this.$route.params.cityPublicId,
            }
          }
        },
        children: [
          {
            path: '',
            name: 'CityDetail',
            component: CityDetail
          },
          {
            path: 'scene/:scenePublicId',
            component: {render(c) { return c('router-view'); }},
            meta: {
              breadcrumb() {
                return {
                  label: this.$route.params.scenePublicId
                }
              }
            },
            children: [
              {
                path: '',
                name: 'SceneDetail',
                component: SceneDetail
              },
              {
                path: 'new_network',
                name: 'NewNetwork',
                component: NewNetwork,
                neta: {
                  breadcrumb: 'New transport network'
                }
              },
              {
                path: 'network/:networkPublicId',
                name: 'NetworkDetail',
                component: NetworkDetail,
                meta: {
                  breadcrumb() {
                    return {
                      label: this.$route.params.scenePublicId
                    }
                  }
                }
              }
            ]
          },
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
