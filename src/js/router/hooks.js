import session from '@/session'
import { toggleStatusBar } from '@/utils'

const closeNav = () => {
  if (session.$store.getters.nav_visible) session.$store.dispatch('nav_hide')
}

export const handleRoute = (isPrivate, next, nextArgs) => {
  session.checkAuth() === isPrivate ? next() : next(nextArgs)
  closeNav()
}

export const privateRoute = (to, from, next) => {
  toggleStatusBar(true)
  handleRoute(true, next, {
    path: '/',
    query: { redirect: to.fullPath }
  })
}

export const publicRoute = (to, from, next) => {
  toggleStatusBar(false)
  handleRoute(false, next, {
    path: '/dashboard'
  })
}

export const notFoundRoute = (to, from, next) => {
  handleRoute(true, next, {
    path: '/'
  })
}
