const Hapi = require('hapi')
const server = new Hapi.Server({
  port: 5000,
  host: 'localhost',
  routes: {
    cors: true
  }
})
const routes = require('./routes')
const connectMongo = require('./utils/mongoConnect')()

routes.forEach(route => {
    server.route(route)
})

module.exports = server
