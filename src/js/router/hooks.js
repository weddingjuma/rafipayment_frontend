import _ from 'lodash'
import session from '@/session'
import { toggleStatusBar } from '@/utils'

const closeNav = () => {
  if (session.$store.getters.nav_visible) session.$store.dispatch('nav_hide')
}

export const handleRoute = (is_authorized, next, nextArgs) => {
  // console.log({is_authorized});
  is_authorized
    ? next()
    : next(nextArgs)
  closeNav()
}

export const checkPermissions = (route) => {
  const auth = _.get(route, 'meta.auth')
  let is_authorized
  if (auth === undefined) {
    is_authorized = true
  } else if (typeof auth === 'boolean') {
    is_authorized = session.checkAuth() === auth
  } else if (auth instanceof Array) {
    is_authorized = auth.includes(session.$user.role)
  }
  return is_authorized
}

export const privateRoute = (to, from, next) => {
  const is_authorized = checkPermissions(to)
  toggleStatusBar(true)
  handleRoute(is_authorized, next, {
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
