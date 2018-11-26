import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main/main.vue'
import Home from '@/views/main/pages/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
      //登录
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/login.vue")
    },
      //主页
    {
        path: "/",
        name: "index",
        redirect: "/home",
        component: Main,
        meta: {
          title: "首页",
          hideInMenu: true
        },
        children: [
          {
            path: "/home",
            name: "Main",
            meta: {
              title: "首页",
              hideInMenu: false
            },
            component: Home
          },
          {
            path: "/createcode",
            name: "createcode",
            meta: {
              title: "代码生成",
              hideInMenu: false
            },
            component: () => import('@/views/main/pages/createcode.vue')
          },
          {
            path: "/resource",
            name: "Resource",
            meta: {
              title: "资源目录",
              hideInMenu: false
            },
            component: () => import('@/views/main/pages/Resource.vue')
          },
          {
            path: "/resource/dataset/:dataobj",
            name: "viewDataset",
            meta: {
              title: "数据集",
              hideInMenu: true
            },
            component: () => import('@/views/main/pages/viewDataset.vue')
          },
          {
            path: "/resource/object/:dataset",
            name: "viewDataObj",
            meta: {
              title: "数据对象",
              hideInMenu: true
            },
            component: () => import('@/views/main/pages/viewDataObj.vue')
          },
          {
            path: "/resource/:dataset/data",
            name: "viewDataObj",
            meta: {
              title: "数据",
              hideInMenu: true
            },
            component: () => import('@/views/main/pages/viewData.vue')
          }
        ],
    },
    { 
        path: '*', 
        name:'error_404',
        component: () => import("@/views/error-page/404.vue") 
    }
]
})
