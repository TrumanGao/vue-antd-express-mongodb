import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from '@/page/login.vue'
import Register from '@/page/register.vue'
import Home from '@/page/home.vue'

const router = new Router({
    mode: 'history',
    routes: [{
            name: 'home',
            path: '/',
            component: Home,
        }, {
            name: 'login',
            path: '/login',
            component: Login,
        },
        {
            name: 'register',
            path: '/register',
            component: Register,
        }
    ]
})

export default router