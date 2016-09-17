import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import router from './router'
import store from './store/index'
import * as filters from './filters/index'
import { AV, SERVER_CONFIG } from '../../config/config'

const NODE_ENV = process.env.NODE_ENV || 'development'
window.SERVER_CONFIG = SERVER_CONFIG[NODE_ENV]
window.AV = AV

Vue.prototype.$Notify = (type, title, content, delay = 3000) => {
    store.dispatch('addNotification', {
        item: {
            title: title,
            type: type,
            content: content,
            delay: delay
        }
    })
}

Vue.use(VueRouter)
Vue.use(VueResource)

Object.keys(filters).map(key => {
    Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})