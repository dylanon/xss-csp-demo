const urlParams = new URLSearchParams(location.search)
const user = urlParams.get('user') || 'Anonymous'
document.cookie = `auth=${user}sAuthCookie`

localStorage.setItem('userName', user)
localStorage.setItem('lastLoggedIn', Date.now())

document
  .querySelector('h1')
  .insertAdjacentText('afterbegin', `${user}'s chat session - `)

const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log('client connected')
})

function displayMessage({ sender, content }) {
  document
    .querySelector('ul')
    .insertAdjacentHTML('beforeend', `<li>${sender}: ${content}</li>`)
}

socket.on('message', data => {
  displayMessage(data)
})

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault()
  const input = document.querySelector('textarea')
  const message = {
    sender: user,
    content: input.value,
  }
  socket.emit('message', message, () => {
    displayMessage(message)
    input.value = ''
  })
})
