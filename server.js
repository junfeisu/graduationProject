const Hapi = require('hapi')
const server = new Hapi.Server()
const routes = require('./routes')
const connectMongo = require('./utils/mongoConnect')()

const serverConf = {
  port: 8000,
  host: 'localhost',
  routes: {
    cors: true
  }
}

server.connection(serverConf)

routes.forEach(route => {
    server.route(route)
})

module.exports = {
    server: server,
    conf: serverConf
}