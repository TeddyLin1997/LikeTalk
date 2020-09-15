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
webSocketServer.on('connection', (...client) => {
  console.log('Server: client connected!!')
})

webSocketServer.on('close', (...args)=> {
  console.log('Server: client close connected!!')
})