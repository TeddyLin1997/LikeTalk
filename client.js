// client connected websocket server
const webSocketClient = new WebSocket('ws://localhost:3000')

// listen event 
webSocketClient.onopen = () => {
  console.log('Client: connected!!')
}

webSocketClient.onclose = () => {
  console.log('Client: close!!')
}

webSocketClient.onmessage = event => {
  console.log(JSON.parse(event.data))
}
