import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts'
import VueBreadcrumbs from 'vue-2-breadcrumbs'

require('@/assets/css/base.css')
require('@/assets/css/style.css')

Vue.component('v-chart', ECharts)
Vue.use(VueBreadcrumbs, {
  template:
    '        <nav v-if="$breadcrumbs.length" aria-label="breadcrumb">\n' +
    '            <ol class="breadcrumb">\n' +
    '                <li v-for="(crumb, key) in $breadcrumbs" v-if="crumb.meta.breadcrumb" :key="key" class="breadcrumb-item active" aria-current="page">\n' +
    '                    <router-link :to="{ path: getPath(crumb) }">{{ getBreadcrumb(crumb.meta.breadcrumb) }}</router-link>' +
    '                </li>\n' +
    '            </ol>\n' +
    '        </nav>'
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
