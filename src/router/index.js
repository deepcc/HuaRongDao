/*
 * @Author: link 
 * @Date: 2017-11-21 09:54:36 
 * @Last Modified by: link
 * @Last Modified time: 2017-11-21 10:49:28
 */
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import hrd from '@/components/hrd'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'hrd',
        component: hrd
    }]
})