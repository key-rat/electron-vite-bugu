import { App } from 'vue'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
export const Layout = (): object => import('../layout/index.vue')

export const RootRoute: RouteRecordRaw = {
  path: '',
  name: 'Root',
  // redirect: { name: 'Artdatabase' },
  component: Layout,
  meta: {
    title: 'Root'
  },
  children: []
}

export const RedirectRoute: RouteRecordRaw = {
  path: '/redirect',
  component: Layout,
  name: 'Redirect',
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: () => import('../views/redirect/index.vue'),
      meta: {}
    }
  ]
  // meta: {
  //   hidden: true,
  //   noTagsView: true
  // }
}
export const ErrorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/403',
    component: () => import('../views/error/403.vue'),
    name: 'NoAccess',
    meta: {
      hidden: true,
      title: '403',
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('../views/Error/404.vue'),
    name: 'NoFound',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  },
  {
    path: '/500',
    component: () => import('../views/Error/500.vue'),
    name: 'Error',
    meta: {
      hidden: true,
      title: '500',
      noTagsView: true
    }
  }
]

//普通路由 无需验证权限
export const constantRouter: RouteRecordRaw[] = [RedirectRoute, RootRoute]

const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app: App): void {
  app.use(router)
  // 创建路由守卫
  // createRouterGuards(router);
}

export default router
