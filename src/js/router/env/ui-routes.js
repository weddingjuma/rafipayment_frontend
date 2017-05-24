const routes = [
  {
    path: '/',
    meta: {
      public: true
    },
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    redirect: '/ui'
  },
  {
    path: '/ui',
    meta: {
      public: true
    },
    component: function(resolve) {
      require(['@/views/ui/index'], resolve)
    },
    redirect: '/ui/typography',
    children: [
      {
        path: 'typography',
        component: function(resolve) {
          require(['@/views/ui/components/typography'], resolve)
        }
      },
      {
        path: 'flags',
        component: function(resolve) {
          require(['@/views/ui/components/flags'], resolve)
        }
      },
      {
        path: 'buttons',
        component: function(resolve) {
          require(['@/views/ui/components/buttons'], resolve)
        }
      },
      {
        path: 'inputs',
        component: function(resolve) {
          require(['@/views/ui/components/inputs'], resolve)
        }
      },
      {
        path: 'forms',
        component: function(resolve) {
          require(['@/views/ui/components/forms'], resolve)
        }
      },
      {
        path: 'cards',
        component: function(resolve) {
          require(['@/views/ui/components/cards'], resolve)
        }
      },
      {
        path: 'modals',
        component: function(resolve) {
          require(['@/views/ui/components/modals'], resolve)
        }
      },
      {
        path: 'plugins',
        component: function(resolve) {
          require(['@/views/ui/components/plugins'], resolve)
        }
      },
      {
        path: 'transitions',
        component: function(resolve) {
          require(['@/views/ui/components/transitions'], resolve)
        }
      },
      {
        path: 'loaders',
        component: function(resolve) {
          require(['@/views/ui/components/loaders'], resolve)
        }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    redirect: '/ui'
  }
]

export { routes }
