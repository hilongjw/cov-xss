import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import router from './router'
import store from './store/index'
import loadMore from './directives/loadMore'
import * as filters from './filters/index'
import plugins from './plugin'
import { AV, SERVER_CONFIG } from '../../config/config'

const NODE_ENV = process.env.NODE_ENV || 'development'
window.SERVER_CONFIG = SERVER_CONFIG[NODE_ENV]
window.AV = AV

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueLazyload, {})
Vue.use(loadMore)
Vue.use(plugins, store)

Object.keys(filters).map(key => {
    Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})