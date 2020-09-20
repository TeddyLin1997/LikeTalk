window.addEventListener('keypress', event => {
  if (event.key === 'Enter') sendMessage()
})

var webSocketClient = null

function creatConnect (name) {
  webSocketClient = new WebSocket('ws://localhost:3000')

  webSocketClient.onopen = () => {
    console.log('open')
    webSocketClient.send(JSON.stringify({ name }))
  }

  webSocketClient.onclose = () => {
    console.log('close')
    webSocketClient.send(JSON.stringify({ name }))
  }

  webSocketClient.onmessage = event => {
    console.log(event.data)
    const data = JSON.parse(event.data)

    if (data.message === undefined) return 
    const messageNode = document.createElement('div')
    messageNode.classList.add('message')
    if (name === event.name) messageNode.classList.add('right')
    else messageNode.classList.add('left')

    const titleNode = document.createElement('h5')
    titleNode.innerText = data.name

    const contentNode = document.createElement('p')
    contentNode.innerText = data.message

    const chatroom = document.getElementsByClassName('chatroom')[0]

    messageNode.appendChild(titleNode)
    messageNode.appendChild(contentNode)
    chatroom.appendChild(messageNode)
  }
}

function sendMessage () {
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