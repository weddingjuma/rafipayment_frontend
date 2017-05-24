import Vue from 'vue'
import Router from 'vue-router'

import _ from 'lodash'

import { routes } from './routes'
import { publicRoute, privateRoute, notFoundRoute } from './hooks'

Vue.use(Router)

const mode = process.env.NODE_ENV === 'cordova' ? 'hash' : 'history'
const scrollBehavior = (to, from, savedPosition) => {
  return { x: 0, y: 0 }
}

const router = new Router({
  mode,
  routes,
  scrollBehavior
});

router.goBack = () => {
  const back = _.get(router.currentRoute, 'meta.back')
  if (typeof back === 'string') {
    router.push(back)
  } else if (typeof back === 'function') {
    back(router)
  }
}

router.beforeEach((to, from, next) => {
  try {
    if (to.matched.some(route => route.meta.public)) {
      publicRoute(to, from, next)
    } else if (to.matched.some(route => route.name === '404')) {
      notFoundRoute(to, from, next)
    } else {
      privateRoute(to, from, next)
    }
  } catch(e) {
    console.warn(e)
  }
})

export default router
