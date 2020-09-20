window.addEventListener('keypress', event => {
  if (event.key === 'Enter') sendMessage()
})
window.addEventListener('beforeunload', () => {
  webSocketClient.send(JSON.stringify({ name: userId, status: 'close' }))
})

let webSocketClient = null
let userId = null 

function creatConnect (name) {
  webSocketClient = new WebSocket('ws://localhost:3000')

  webSocketClient.onopen = () => {
    webSocketClient.send(JSON.stringify({ name, status: 'connect' }))
  }

  webSocketClient.onmessage = event => {
    const data = JSON.parse(event.data)
    if (data.message === undefined) return 
    else createMessageElement(data)
  }
}

function sendMessage () {
  const message = document.getElementById('message').value
  const name = document.getElementById('name').value

  webSocketClient.send(JSON.stringify({ name, message }))
  document.getElementById('message').value = ''
}

function login () {
  userId = document.getElementById('name').value
  if (validation(userId) === false) return
  
  changePage()
  creatConnect(userId)
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

function createMessageElement (data) {
  const messageNode = document.createElement('div')

  if (userId === data.name) messageNode.classList.add('right')
  else messageNode.classList.add('left')
  messageNode.classList.add('message')

  const titleNode = document.createElement('h5')
  titleNode.innerText = data.name

  const contentNode = document.createElement('p')
  contentNode.innerText = data.message

  const chatroom = document.getElementsByClassName('chatroom')[0]

  messageNode.appendChild(titleNode)
  messageNode.appendChild(contentNode)
  chatroom.appendChild(messageNode)
}
