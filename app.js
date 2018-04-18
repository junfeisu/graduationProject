const server = require('./server').server

server.start(err => {
  if (err) {
    console.log('err is ' + err)
    throw err
  }

  console.log('server is start at ' + server.info.uri)
})