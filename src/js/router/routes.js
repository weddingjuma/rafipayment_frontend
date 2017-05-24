let routes = []
let env_routes

if (process.env.NODE_ENV === 'ui') {
  env_routes = require('./env/ui-routes')
} else {
  env_routes = require('./env/default-routes')
}

routes.push(...env_routes.routes)

export { routes }
