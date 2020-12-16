const http = require('http')
const express = require('express')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

io.on('connection',() => {
    console.log("New Connection")
})  //event, callback function

server.listen(port, () => {
    console.log("Listening on port "+port)
})