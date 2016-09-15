import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import router from './router'
import AV from '../../config/leancloud'

window.AV = AV

Vue.use(VueRouter)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})