import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2a54e7c0 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _2437fb5a = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _c2e46e46 = () => interopDefault(import('../pages/signup/index.vue' /* webpackChunkName: "pages/signup/index" */))
const _68804d94 = () => interopDefault(import('../pages/users.vue' /* webpackChunkName: "pages/users" */))
const _25161f39 = () => interopDefault(import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */))
const _4e2a14b8 = () => interopDefault(import('../pages/users/_id/index.vue' /* webpackChunkName: "pages/users/_id/index" */))
const _9f1d9e6e = () => interopDefault(import('../pages/admin/expense/index.vue' /* webpackChunkName: "pages/admin/expense/index" */))
const _60c61124 = () => interopDefault(import('../pages/admin/income/index.vue' /* webpackChunkName: "pages/admin/income/index" */))
const _16b0e166 = () => interopDefault(import('../pages/admin/inventory/index.vue' /* webpackChunkName: "pages/admin/inventory/index" */))
const _1fb7eea6 = () => interopDefault(import('../pages/admin/search/index.vue' /* webpackChunkName: "pages/admin/search/index" */))
const _f3540200 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _2a54e7c0,
    name: "admin"
  }, {
    path: "/login",
    component: _2437fb5a,
    name: "login"
  }, {
    path: "/signup",
    component: _c2e46e46,
    name: "signup"
  }, {
    path: "/users",
    component: _68804d94,
    children: [{
      path: "",
      component: _25161f39,
      name: "users"
    }, {
      path: ":id",
      component: _4e2a14b8,
      name: "users-id"
    }]
  }, {
    path: "/admin/expense",
    component: _9f1d9e6e,
    name: "admin-expense"
  }, {
    path: "/admin/income",
    component: _60c61124,
    name: "admin-income"
  }, {
    path: "/admin/inventory",
    component: _16b0e166,
    name: "admin-inventory"
  }, {
    path: "/admin/search",
    component: _1fb7eea6,
    name: "admin-search"
  }, {
    path: "/",
    component: _f3540200,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
