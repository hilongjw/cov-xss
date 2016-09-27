import VueRouter from 'vue-router'

import Home from './views/Home.vue'
import Module from './views/Module.vue'
import Project from './views/Project.vue'
import Screenshot from './views/Screenshot.vue'
import Setting from './views/Setting.vue'
import ModuleStore from './views/ModuleStore.vue'
import Invite from './views/Invite.vue'
import Help from './views/Help.vue'
import Run from './views/Run.vue'

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: Home },
        { path: '/module', component: Module },
        { path: '/store', component: ModuleStore },
        { path: '/project', component: Project },
        { path: '/screenshot', component: Screenshot },
        { path: '/setting', component: Setting },
        { path: '/help', component: Help },
        { path: '/run', component: Run },
        { 
            path: '/invite',
            component: Invite
        },
    ]
})


export default router
