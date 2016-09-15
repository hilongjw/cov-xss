import VueRouter from 'vue-router'

import Home from './views/Home.vue'
import Module from './views/Module.vue'

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        { path: '/home', component: Home },
        { path: '/module', component: Module }
    ],
    redirect: {
        '*': '/home'
    }
})

export default router
