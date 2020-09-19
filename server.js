const express = require('express')
const webSocket = require('ws').Server

// basic config
const config = {
  port: 3000,
  start: () => { console.log(`Server: is runing on port:${config.port}`) }
}

// create websocket server
const server = express().listen(config.port, config.start)
const webSocketServer = new webSocket({ server })

// listen connection event
webSocketServer.on('connection', webSocket => {
  
  webSocket.on('message', data => {
    webSocketServer.clients.forEach(client => {
      client.send(data)
    })
  })

  webSocket.on('close', ()=> {
    console.log('Server: client close connected!!')
  })
})
