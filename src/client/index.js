let webSocketClient = null
let userId = null 
const chatroom = document.getElementsByClassName('chatroom')[0]


window.addEventListener('keypress', event => {
  if (event.key !== 'Enter') return
  if (userId) sendMessage()
  else login()
})
window.addEventListener('beforeunload', () => {
  webSocketClient.send(JSON.stringify({ name: userId, status: 'close' }))
})

function creatConnect (name) {
  webSocketClient = new WebSocket('ws://localhost:3000')

  webSocketClient.onopen = () => {
    webSocketClient.send(JSON.stringify({ name, status: 'connect' }))
  }

  webSocketClient.onmessage = event => {
    const data = JSON.parse(event.data)
    if (data.message) createMessageElement(data)
    else userStatusElement(data)
  }
}

function login () {
  userId = document.getElementById('name').value
  if (validation(userId) === false) return
  
  changePage()
  creatConnect(userId)
}

function changePage () {
  const login = document.getElementsByClassName('login')[0]

  login.style.display = 'none'
  chatroom.style.display = 'unset'
}

function validation (name) {
  const errorLabel = document.getElementsByClassName('error')[0]
  errorLabel.style.display = name ? 'unset' : 'none'

  return Boolean(name)
}

function sendMessage () {
  const message = document.getElementById('message').value
  if (message === '') return

  webSocketClient.send(JSON.stringify({ name: userId, message }))
  document.getElementById('message').value = ''
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

  messageNode.appendChild(titleNode)
  messageNode.appendChild(contentNode)

  appendElement(messageNode)
}

function userStatusElement (data) {
  const statusMessage = document.createElement('div')
  const status = data.status === 'connect' ? 'join' : 'leave'

  statusMessage.innerText = `${data.name}  ${status} the chatroom`
  statusMessage.classList.add('center')

  appendElement(statusMessage)
}

function appendElement (node) {
  chatroom.appendChild(node)
  chatroom.scrollTo({ top: chatroom.scrollHeight, behavior: 'smooth' })
}
