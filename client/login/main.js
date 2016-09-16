import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import { AV } from '../../config/config'

window.AV = AV

Vue.use(VueResource)

new Vue({
  el: '#app',
  render: h => h(App)
})
