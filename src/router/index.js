import Vue from 'vue'
import VueRouter from 'vue-router'

import MyCities from '../views/MyCities.vue'
import Dashboard from '../views/Dashboard.vue'

import NotFound from '../views/NotFound.vue'

import CityDetail from '../views/city/CityDetail.vue'
import NewCity from '../views/city/NewCity.vue'
import NewCityStep2 from '../views/city/NewCityStep2.vue'

import NewScene from '../views/scene/NewScene.vue'
import SceneDetail from '../views/scene/SceneDetail.vue'

import NewNetwork from '../views/network/NewNetwork.vue'
import NetworkDetail from '../views/network/NetworkDetail.vue'

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
            path: 'demand',
            name: 'NewCityStep2',
            component: NewCityStep2,
            meta: {
              breadcrumb: 'demand'
            }
          },
          {
            path: 'edit',
            name: 'EditCity',
            component: NewCity,
            meta: {
              breadcrumb: 'edit'
            }
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
                path: 'network/:transportNetworkPublicId',
                name: 'NetworkDetail',
                component: NetworkDetail,
                meta: {
                  breadcrumb() {
                    return {
                      label: this.$route.params.transportNetworkPublicId
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
