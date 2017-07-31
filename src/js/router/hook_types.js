export const config = {
  all: {
    statusbar: true,
    options(to) {
      return
    }
  },
  public: {
    statusbar: false,
    options(to) {
      return {
        path: '/dashboard'
      }
    }
  },
  private: {
    statusbar: true,
    options(to) {
      return {
        path: '/',
        query: {
          redirect: to.fullPath
        }
      }
    }
  },
  roles: {
    statusbar: true,
    options(to) {
      return {
        path: '/',
        query: {
          redirect: to.fullPath
        }
      }
    }
  },
  notfound: {
    statusbar: true,
    options(to) {
      return {
        path: '/'
      }
    }
  }
}

module.exports = config
