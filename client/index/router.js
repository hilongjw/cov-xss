import VueRouter from 'vue-router'

import Home from './views/Home.vue'
import Module from './views/Module.vue'
import Project from './views/Project.vue'
import Screenshot from './views/Screenshot.vue'

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: Home },
        { path: '/module', component: Module },
        { path: '/project', component: Project },
        { path: '/screenshot', component: Screenshot }
    ]
})

export default router
