import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main/main.vue'
import Home from '@/views/main/pages/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/datacenter/',
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
        redirect: "/resource",
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
            path: "/demo",
            name: "demo",
            meta: {
              title: "demo",
              hideInMenu: false
            },
            component: () => import('@/views/main/pages/DataCenterUser.vue')
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
            path: "/createpartcode",
            name: "createpartcode",
            meta: {
              title: "代码片段生成",
              hideInMenu: false
            },
            component: () => import('@/views/main/pages/createpartcode.vue')
          },
          {
            path: "/resource",
            name: "Resource",
            meta: {
              title: "资源目录",
              hideInMenu: false,
              keepAlive: true
            },
            component: () => import('@/views/main/pages/Resource.vue')
          },
          {
            path: "/resourcetype",
            name: "ResourceType",
            meta: {
              title: "资源分类",
              hideInMenu: false,
              keepAlive: true
            },
            component: () => import('@/views/main/pages/ResourceType.vue')
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
          },
          {// 查看数据集数据
            path: "/resource/:dataset/dataset",
            name: "viewDataSet",
            meta: {
              title: "数据集",
              hideInMenu: true
            },
            component: () => import('@/views/main/pages/viewDatas.vue')
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
