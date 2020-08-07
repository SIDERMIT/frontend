import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts'
import VueBreadcrumbs from 'vue-2-breadcrumbs'

require('@/assets/css/base.css')
require('@/assets/css/style.css')

Vue.component('v-chart', ECharts)
Vue.use(VueBreadcrumbs);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
