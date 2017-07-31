import _ from 'lodash'
import session from '@/session'
import { toggleStatusBar } from '@/utils'

export default (to, from, next) => {
  const route_type = getRouteType(to)
  const is_authorized = checkPermissions(to, route_type)
  const config = require(`./hook_types`)[route_type]
  const options = config.options(to)
  handleRoute(is_authorized, next, options)
  toggleStatusBar(config.statusbar)
  closeNav()
}

const getRouteType = (route) => {
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

const checkPermissions = (route, type) => {
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

const handleRoute = (is_authorized, next, options) => {
  const args = is_authorized
    ? undefined
    : options
  next(args)
}

const closeNav = () => {
  if (session.$store.getters.nav_visible) {
    session.$store.dispatch('nav_hide')
  }
}
