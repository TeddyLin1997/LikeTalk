const express = require('express')
const webSocketServer = require('ws').Server

// basic config
const config = {
  port: 3000,
  start: () => { console.log(`Server: is runing on port:${config.port}`) }
}

// user express server to new webSocketServer object
const server = express().listen(config.port, config.start)
const webSocketInstance = new webSocketServer({ server })

// listen connection event
webSocketInstance.on('connection', (...client) => {
  console.log('--client--', client)
  console.log('client connected!!')
})

webSocketInstance.on('close', (...args)=> {
  console.log('--close--', args)
  console.log('client close connected!!')
})