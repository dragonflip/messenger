import Vue from 'vue'
import Router from 'vue-router'
//import Home from '../views/Home.vue'
import Authorization from '../views/Authorization.vue'
import Main from '../views/Main.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        /*
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/category',
            name: 'category',
            component: () => { return import ('../views/Category.vue') }
        },*/

        {
            path: '/',
            name: 'Authorization',
            component: Authorization
        },

        {
            path: '/main',
            name: 'Main',
            component: Main
        },

    ]
})

