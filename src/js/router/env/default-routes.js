import Login from '@/views/login'
import Forgot from '@/views/forgot'
import Reset from '@/views/reset'
import NotFound from '@/views/404'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/activate',
    component(resolve) {
      require(['@/views/activate'], resolve)
    }
  },
  {
    path: '/forgot',
    component: Forgot
  },
  {
    path: '/reset',
    component: Reset
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    redirect: '/dashboard/current',
    meta: {
      auth: ['tenant']
    },
    component(resolve) {
      require(['@/views/dashboard'], resolve)
    },
    children: [
      {
        name: 'Current Bills',
        path: 'current',
        meta: {
          auth: ['tenant']
        },
        component(resolve) {
          require(['@/views/bills/current'], resolve)
        }
      },
      {
        name: 'Past Bills',
        path: 'past',
        meta: {
          auth: ['tenant']
        },
        component(resolve) {
          require(['@/views/bills/past'], resolve)
        }
      }
    ]
  },
  {
    meta: {
      auth: true
    },
    path: '/bills',
    redirect: '/dashboard/current'
  },
  // legacy paths to support deep linking for old app paths
  // remove this when we replace the backbone app
  {
    meta: {
      auth: ['tenant']
    },
    path: '/dashboard/current/:id',
    redirect: '/bills/:id'
  },
  {
    meta: {
      auth: ['tenant']
    },
    path: '/dashboard/past/:id',
    redirect: '/bills/:id'
  },
  {
    name: 'Balance',
    path: '/bills/:id',
    component(resolve) {
      require(['@/views/bills/detail'], resolve)
    },
    meta: {
      auth: true,
      back($router) {
        $router.back()
      }
    }
  },
  {
    name: 'Transfer Details',
    path: '/bills/:id/transfers/:transfer_id',
    component(resolve) {
      require(['@/views/transfers/detail'], resolve)
    },
    meta: {
      auth: true,
      back($router) {
        $router.back()
      }
    }
  },
  {
    name: 'My Account',
    path: '/account',
    redirect: '/account/profile',
    meta: {
      auth: true
    },
    component(resolve) {
      require(['@/views/account'], resolve)
    },
    children: [
      {
        name: 'Profile',
        path: 'profile',
        meta: {
          auth: true
        },
        component(resolve) {
          require(['@/views/account/profile'], resolve)
        }
      },
      // {
      //   name: 'Contact',
      //   path: 'contact',
      //   component(resolve) {
      //     require(['@/views/account/contact'], resolve)
      //   }
      // },
      {
        name: 'Payment',
        path: 'payment',
        component(resolve) {
          require(['@/views/account/payment'], resolve)
        },
        meta: {
          auth: true,
          back($router) {
            $router.back()
          }
        }
      }
      // {
      //   name: 'Transfers',
      //   path: 'transfers',
      //   component(resolve) {
      //     require(['@/views/account/transfers'], resolve)
      //   }
      // },
      // {
      //   name: 'Transfer Details',
      //   path: 'transfers/:id',
      //   component(resolve) {
      //     require(['@/views/account/transfers/detail'], resolve)
      //   },
      //   meta: {
      //     back: '/account/transfers'
      //   }
      // }
    ]
  },
  {
    name: 'Leases',
    path: '/leases',
    meta: {
      auth: true
    },
    component(resolve) {
      require(['@/views/leases'], resolve)
    }
  },
  {
    name: 'Lease Details',
    path: '/leases/:id',
    component(resolve) {
      require(['@/views/leases/detail'], resolve)
    },
    meta: {
      auth: true,
      back: '/leases'
    }
  },
  {
    name: 'Admins',
    path: '/admins',
    meta: {
      auth: ['superadmin', 'admin']
    },
    component(resolve) {
      require(['@/views/admins'], resolve)
    }
  },
  {
    name: 'Managers',
    path: '/managers',
    meta: {
      auth: ['superadmin', 'admin', 'manager']
    },
    component(resolve) {
      require(['@/views/managers'], resolve)
    }
  },
  {
    name: 'Tenants',
    path: '/tenants',
    meta: {
      auth: ['superadmin', 'admin', 'mananger']
    },
    component(resolve) {
      require(['@/views/tenants'], resolve)
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

export { routes }
