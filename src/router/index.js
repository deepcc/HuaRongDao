/*
 * @Author: link 
 * @Date: 2017-11-21 09:54:36 
 * @Last Modified by: link
 * @Last Modified time: 2018-04-13 09:14:29
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