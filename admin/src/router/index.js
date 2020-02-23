import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: "history",
    base: '/qianlei/',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/home',
                    component: resolve => require(['../components/page/home.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    // 菜单分类
                    path: '/MenuManagement',
                    component: resolve => require(['../components/page/MenuManagement.vue'], resolve),
                    meta: { title: '菜单分类' }
                },
                {
                    // 文章管理
                    path: '/Articles',
                    component: resolve => require(['../components/page/Articles.vue'], resolve),
                    meta: { title: '文章管理' }
                },
                {
                    // 文件管理
                    path: '/File',
                    component: resolve => require(['../components/page/File.vue'], resolve),
                    meta: { title: '文件管理' }
                },
                {
                    // 管理员设置
                    path: '/adminSet',
                    component: resolve => require(['../components/page/adminSet.vue'], resolve),
                    meta: { title: '账号设置' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
