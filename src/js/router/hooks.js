import session from './../session'

const closeNav = () => {
  if (session.$store.getters.nav_visible) session.$store.dispatch('nav_hide')
}

export const handleRoute = (isPrivate, next, nextArgs) => {
  session.checkAuth() === isPrivate ? next() : next(nextArgs)
  closeNav()
}

export const privateRoute = (to, from, next) => {
  if (process.env.NODE_ENV === 'cordova') {
    try {
      StatusBar.show() // eslint-disable-line no-undef
    } catch(e) {
      console.warn(e)
    }
  }
  handleRoute(true, next, {
    path: '/',
    query: { redirect: to.fullPath }
  })
}

export const publicRoute = (to, from, next) => {
  if (process.env.NODE_ENV === 'cordova') {
    try {
      StatusBar.hide() // eslint-disable-line no-undef
    } catch(e) {
      console.warn(e)
    }
  }
  handleRoute(false, next, {
    path: '/dashboard'
  })
}

export const notFoundRoute = (to, from, next) => {
  handleRoute(true, next, {
    path: '/'
  })
}
