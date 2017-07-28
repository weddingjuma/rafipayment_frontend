import _ from 'lodash'
import session from '@/session'
import { toggleStatusBar } from '@/utils'

export default function routeHook (to, from, next) {
  return new RouteHook(to, from, next)
}

class RouteHook {
  constructor(to, from, next) {
    const route_type = this.getRouteType(to)
    const is_authorized = this.checkPermissions(to, route_type)
    this[`setup_${route_type}`](to, from, next)
    this.handleRoute(is_authorized, next)
    this.toggleStatusBar()
    return this
  }
  setup_all(to) {
    this.statusbar = true
  }

  setup_public(to) {
    this.options = {
      path: '/dashboard'
    }
    this.statusbar = false
  }
  setup_private(to) {
    this.options = {
      path: '/',
      query: {
        redirect: to.fullPath
      }
    }
    this.statusbar = true
  }
  setup_roles(to) {
    this.options = {
      path: '/',
      query: {
        redirect: to.fullPath
      }
    }
    this.statusbar = true
  }
  setup_notfound(to) {
    this.options = {
      path: '/'
    }
    this.statusbar = true
  }
  getRouteType(route) {
    const auth = _.get(route, 'meta.auth')
    let type
    if (auth === undefined) {
      type = 'all'
    } else if (auth === false) {
      type = 'public'
    } else if (auth === true) {
      type = 'private'
    } else if (auth instanceof Array) {
      type = 'roles'
    }
    return type
  }
  checkPermissions(route, type) {
    const auth = _.get(route, 'meta.auth')
    let is_authorized
    if (type === 'all') {
      is_authorized = true
    } else if (typeof auth === 'boolean') {
      is_authorized = session.checkAuth() === auth
    } else if (type === 'roles') {
      is_authorized = auth.includes(session.$user.role)
    }
    return is_authorized
  }
  handleRoute(is_authorized, next) {
    const args = is_authorized
      ? undefined
      : this.options
    next(args)
    closeNav()
  }
  toggleStatusBar() {
    toggleStatusBar(this.statusbar)
  }
}

const closeNav = () => {
  if (session.$store.getters.nav_visible) {
    session.$store.dispatch('nav_hide')
  }
}

// export const handleRoute = (is_authorized, next, nextArgs) => {
//   // console.log({is_authorized});
//   const args = is_authorized
//     ? undefined
//     : nextArgs
//   next(args)
//   closeNav()
// }

// const privateRoute = (to, from, next) => {
//   const is_authorized = checkPermissions(to)
//   toggleStatusBar(true)
//   handleRoute(is_authorized, next, {
//     path: '/',
//     query: { redirect: to.fullPath }
//   })
// }

// const publicRoute = (to, from, next) => {
//   toggleStatusBar(false)
//   handleRoute(false, next, {
//     path: '/dashboard'
//   })
// }

// const notFoundRoute = (to, from, next) => {
//   handleRoute(true, next, {
//     path: '/'
//   })
// }
