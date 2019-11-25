/*
 * @Description: 路由配置
 * @Author: 白青
 * @Date: 2019-08-06 09:35:27
 * @LastEditTime: 2019-09-06 10:20:53
 * @LastEditors: 白青
 */
// import Vue from 'vue' ***
import Router from 'vue-router'

import Home from '@/views/Home'
import Main from '@/views/star/main'
// import starInfo from '@/views/star'
import displayInfo from '@/views/display'

import { getToken } from '@/utils/token'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: '',
      component: resolve => require(['@/views/auth/NewLogin'], resolve),
      hidden: true
    },
    {
      path: '/register',
      name: '',
      component: resolve => require(['@/views/auth/Register'], resolve),
      hidden: true
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import('@/views/errorPage/404'),
      hidden: true
    },
    {
      path: '/',
      redirect: '/main',
      component: Home,
      hidden: true,
      children: [
        // 【侧边栏导航配置 start ↓↓↓↓↓↓】
        {
          path: '/main',
          name: '首页',
          component: Main,
          hidden: false,
          meta: { class: 'cls-main', isKeepLive: true }
        },
        {
          path: '/customer',
          name: '客户管理',
          component: () => import('@/views/customer'),
          hidden: false,
          // meta: { class: 'cls-customer-info', isKeepLive: false },
          meta: {
            right: ['view_req_list', 'view_brand', 'view_customer', 'view_contract', 'view_achievement'],
            class: 'cls-star-info',
            isKeepLive: false,
            children: [
              {
                path: 'list',
                name: '客户列表',
                right: ['view_customer'],
                hidden: false
              },
              {
                path: 'contract',
                name: '客户合同',
                right: ['view_contract'],
                hidden: false
              },
              {
                path: 'achievement',
                name: '业绩登记表',
                right: ['view_achievement'],
                hidden: false
              },
              {
                path: 'demand-management',
                name: '需求管理',
                right: ['view_req_list'],
                hidden: false
              },
              {
                path: 'brand-management',
                name: '品牌管理',
                right: ['view_brand'],
                hidden: false
              }
            ]
          }
        },
        {
          path: '/operation-center',
          name: '运营中心',
          hidden: false,
          meta: {
            class: 'cls-customer-info',
            right: ['view_display', 'view_product', 'view_import', 'view_users'],
            isKeepLive: false,
            children: [
              {
                path: 'display-management',
                name: '场次管理',
                right: ['view_display'],
                hidden: false
              },
              {
                path: 'product-management',
                name: '商品管理',
                right: ['view_product'],
                hidden: false
              },
              {
                path: 'import-log',
                name: '导入日志',
                right: ['view_import'],
                hidden: false
              },
              {
                path: 'user-management',
                name: '人员管理',
                right: ['view_users'],
                hidden: false
              }
            ]
          }
        },
        {
          path: '/medium',
          name: '供应商管理',
          meta: {
            right: ['view_company', 'view_kol', 'view_contract'],
            class: 'cls-medium',
            isKeepLive: true,
            children: [
              {
                path: 'medium-list',
                name: '供应商列表',
                right: ['view_company', 'view_kol'],
                hidden: false
              },
              {
                path: 'medium-contract',
                name: '供应商合同',
                right: ['view_contract'],
                hidden: false
              },
              {
                path: 'cost',
                name: '成本安排表',
                right: ['view_cost'],
                hidden: false
              }
            ]
          },
        },
        {
          path: '/contract-approval',
          name: '合同审批',
          component: () => import('@/views/contractApproval'),
          meta: {
            right: ['approve_contract'],
            class: 'cls-approval',
            isKeepLive: true
          },
          hidden: false
        },
        // 【侧边栏导航配置 end ↑↑↑↑↑↑↑↑↑】
        // {
        //   path: '/brand',
        //   name: '品牌需求',
        //   component: resolve => require(['@/views/brand'], resolve),
        //   hidden: false,
        //   meta: {
        //     right: ['view_req_list', 'add_req', 'view_brand'],
        //     class: 'cls-brand',
        //     isKeepLive: false,
        //     children: [
        //       {
        //         path: 'index',
        //         name: '需求统计',
        //         right: 'view_req_list',
        //         hidden: false
        //       },
        //       {
        //         path: 'addrequirement',
        //         name: '新增需求',
        //         right: 'add_req',
        //         hidden: false
        //       },
        //       {
        //         path: 'management',
        //         name: '品牌管理',
        //         right: 'view_brand',
        //         hidden: false
        //       }
        //     ]
        //   }
        // },
        {
          path: '/star-personal',
          name: '主播详情',
          component: () => import('@/views/chart'),
          meta: { class: 'cls-star-personal', isKeepLive: false },
          hidden: true
        },
        // {
        //   path: '/star-info',
        //   name: '合作主播',
        //   component: starInfo,
        //   meta: { class: 'cls-star-info', isKeepLive: false },
        //   hidden: true
        // },
        {
          path: '/medium/personal-detail',
          name: 'KOL详情',
          component: () => import('@/views/medium/personalDetail'),
          meta: { class: 'cls-medium', isKeepLive: false },
          hidden: true
        },
        {
          path: '/operation-center/display-management',
          name: '场次管理',
          component: displayInfo,
          meta: { class: 'cls-display-info', isKeepLive: false },
          hidden: true
        },
        {
          path: '/operation-center/product-management',
          name: '商品管理',
          component: () => import('@/views/product'),
          hidden: true,
          meta: { class: 'cls-product-info', isKeepLive: true }
        },
        {
          path: '/customer/list',
          name: '客户列表',
          component: () => import('@/views/customer'),
          hidden: true,
          meta: { class: 'cls-customer-info', isKeepLive: false }
        },
        {
          path: '/customer/contract',
          name: '客户合同',
          component: () => import('@/views/customer/contract'),
          hidden: true,
          meta: { class: 'cls-customer-info', isKeepLive: true }
        },
        {
          path: '/customer/achievement',
          name: '业绩登记表',
          component: () => import('@/views/customer/achievement'),
          hidden: true,
          meta: { class: 'cls-customer-info', isKeepLive: false }
        },
        {
          path: '/customer/contract-detail',
          name: '合同详情',
          component: () => import('@/views/customer/contractDetail'),
          hidden: true,
          meta: { class: 'cls-customer-info', isKeepLive: false }
        },
        {
          path: '/contract-approval/contract-detail',
          name: '合同审批详情',
          component: () => import('@/views/contractApproval/contractDetail'),
          hidden: true,
          meta: { class: 'cls-customer-info', isKeepLive: false }
        },
        {
          path: '/fans-analyze',
          name: '粉丝画像',
          component: resolve => require(['@/views/fans'], resolve),
          meta: { class: 'cls-fans-info', isKeepLive: false },
          hidden: true
        },
        {
          path: '/operation-center/import-log',
          name: '导入日志',
          component: () => import('@/views/logs'),
          meta: {
            // right: ['view_import'],
            class: 'cls-log',
            isKeepLive: true
          },
          hidden: true
        },
        {
          path: '/operation-center/user-management',
          name: '人员管理',
          component: () => import('@/views/user/index'),
          redirect: '/operation-center/user-management/user',
          children: [
            {
              path: 'user',
              name: '人员管理',
              component: () => import('@/views/user/UserInfo'),
              meta: {
                // right: ['view_users'],
                class: 'cls-user',
                isKeepLive: false
              },
              hidden: true
            },
            {
              path: 'role',
              name: '角色管理',
              component: () => import('@/views/user/RoleInfo'),
              meta: {
                // right: ['view_users'],
                class: 'cls-user',
                isKeepLive: false
              },
              hidden: true
            }
          ],
          meta: {
            // right: ['view_users'],
            class: 'cls-user',
            isKeepLive: true
          },
          hidden: true
        },
        {
          path: '/product-detail',
          name: '商品详情',
          component: () => import('@/views/display/productDetail'),
          hidden: true,
          meta: { isKeepLive: false }
        },
        // {
        //   path: '/requirement-info',
        //   name: '需求详情',
        //   component: resolve => require(['@/views/brand/requirementInfo'], resolve),
        //   hidden: true,
        //   meta: { isKeepLive: false }
        // },
        {
          path: '/plan-info',
          name: '方案详情',
          component: resolve => require(['@/views/brand/planInfo'], resolve),
          hidden: true,
          meta: { isKeepLive: false }
        },
        {
          path: '/customer/demand-management',
          name: '需求管理',
          component: () => import('@/views/brand'),
          hidden: true,
          meta: { class: 'cls-brand', isKeepLive: false }
        },
        {
          path: '/brand/addrequirement',
          name: '新增需求',
          component: resolve =>
            require(['@/views/brand/addRequirement'], resolve),
          hidden: true,
          meta: { class: 'cls-brand', isKeepLive: false }
        },
        {
          path: '/brand/generateplan',
          name: '生成方案',
          component: resolve =>
            require(['@/views/brand/generatePlan'], resolve),
          hidden: true,
          meta: { class: 'cls-brand', isKeepLive: false }
        },
        {
          path: '/customer/brand-management',
          name: '品牌管理',
          component: resolve => require(['@/views/brand/brandManagement'], resolve),
          hidden: true,
          meta: { class: 'cls-brand', isKeepLive: false }
        },
        {
          path: '/brand/match-anchor',
          name: '匹配主播',
          component: resolve => require(['@/views/brand/matchAnchor'], resolve),
          hidden: true,
          meta: { class: 'cls-brand', isKeepLive: false }
        },
        {
          path: '/brand/requirementDetail',
          name: '需求详情',
          component: () => import('@/views/brand/requirementDetail'),
          hidden: true,
          meta: { class: 'cls-brand', isKeepLive: false }
        },
        {
          path: '/customer/detail',
          name: '客户详情',
          component: () => import('@/views/customer/cooperative/customer_detail/'),
          hidden: true,
          meta: { class: 'cls-product-info', isKeepLive: false }
        },
        {
          path: '/medium/detail',
          name: '公司详情',
          component: () => import('@/views/medium/detail'),
          hidden: true,
          meta: { class: 'cls-star-info', isKeepLive: false }
        },
        {
          path: '/medium/medium-list',
          name: '供应商列表',
          component: () => import('@/views/medium'),
          hidden: true,
          meta: { class: 'cls-star-info', isKeepLive: false }
        },
        {
          path: '/medium/medium-contract',
          name: '供应商合同',
          component: () => import('@/views/medium/mediumContract'),
          hidden: true,
          meta: { class: 'cls-star-info', isKeepLive: false }
        },
        {
          path: '/medium/contract-detail',
          name: '供应商合同详情',
          component: () => import('@/views/medium/contractDetail'),
          hidden: true,
          meta: { class: 'cls-star-info', isKeepLive: false }
        },
        {
          path: '/medium/cost',
          name: '成本安排表',
          component: () => import('@/views/customer/cost'),
          hidden: true,
          meta: { class: 'cls-customer-info', isKeepLive: false }
        }
      ]
    },
    {
      path: '/login/register/step',
      name: '会员注册',
      component: resolve => require(['@/views/auth/RegisterStep'], resolve),
      hidden: true
    },
    {
      path: '/login/changePwd/step',
      name: '修改密码',
      component: resolve => require(['@/views/auth/ChangePwd'], resolve),
      hidden: true
    }
  ]
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
})
router.beforeEach((to, from, next) => {
  // if (!(to.fullPath === '/login' || to.fullPath === '/register')) {
  //   if (getToken()) {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // } else {
  //   next()
  // }
  if (to.fullPath.indexOf('login') < 0) {
    if (getToken()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  if (document.querySelector('.list-scrollbar')) {
    document.querySelector('.list-scrollbar').scrollTop = 0
    document.querySelector('.list-scrollbar').scrollLeft = 0
  }
})

export default router
