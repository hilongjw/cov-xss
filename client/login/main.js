import Vue from 'vue'
import App from './App.vue'
import AV from '../../config/leancloud'

window.AV = AV

new Vue({
  el: '#app',
  render: h => h(App)
})
