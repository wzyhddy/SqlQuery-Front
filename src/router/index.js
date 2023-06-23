import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../Home.vue'

import Index from '../Index.vue'
import Router from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/index',
      name: 'Index',
      meta:{
        title:'首页'
      },
      component: Index
    },
  
  ]

    const router = new VueRouter({
      // mode: 'history',

      routes
    })
    export default router