const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')

const app = express()
app.use(
  cors({
    origin: 'http://localhost:4000',
    credentials: true,
  })
)
const port = 3000
const server = http.createServer(app)

const io = socketio(server)
io.on('connection', socket => {
  console.log('client connected')

  socket.on('message', (data, confirmSuccess) => {
    console.log(`received message: (${data.user}) ${data.content}`)
    socket.broadcast.emit('message', data)
    confirmSuccess()
  })
})

server.listen(port)
console.log(`listening on port ${port}`)
