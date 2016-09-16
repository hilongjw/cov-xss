import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import router from './router'
import * as filters from './filters/index'
import AV from '../../config/leancloud'

window.AV = AV

Vue.use(VueRouter)
Vue.use(VueResource)

Object.keys(filters).map(key => {
    Vue.filter(key, filters[key])
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})