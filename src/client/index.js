window.addEventListener('keypress', event => {
  if (event.key === 'Enter') sendMessage()
})

function creatConnect (name) {
  // client connected websocket server
  var webSocketClient = new WebSocket('ws://localhost:3000')

  webSocketClient.onopen = () => {
    webSocketClient.send(JSON.stringify({ name }))
  }

  webSocketClient.onclose = () => {
    webSocketClient.send(JSON.stringify({ name }))
  }

  webSocketClient.onmessage = event => {
    console.log(JSON.parse(event.data))
  }
}

function sendMessage () {
  const webSocketClient = new WebSocket('ws://localhost:3000')
  const message = document.getElementById('message').value
  const name = document.getElementById('name').value

  webSocketClient.send(JSON.stringify({ name, message }))
}

function login () {
  const name = document.getElementById('name').value
  if (validation(name) === false) return
  
  changePage()
  creatConnect(name)
}

function changePage () {
  const login = document.getElementsByClassName('login')[0]
  const chatroom = document.getElementsByClassName('chatroom')[0]

  login.style.display = 'none'
  chatroom.style.display = 'unset'
}

function validation (name) {
  const errorLabel = document.getElementsByClassName('error')[0]
  let result = true

  if (name === '') {
    errorLabel.style.display = 'unset'
    result = false
  } else {
    errorLabel.style.display = 'none'
    result = true
  }

  return result
}