const http = require('http')
const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

io.on('connection',(socket) => {
    console.log("New Connection")

    socket.emit('message','Welcome')
    socket.broadcast.emit('message','A new user has joined') //broadcast emits to everyone except himself

    socket.on('sendMessage',(message,callback) => {
        const filter = new Filter()

        if(filter.isProfane(message))
        {
            return callback('Profanity is not allowed')
        }
        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation',(coords, callback) => {
        io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })

    socket.on('disconnect',() => {
        io.emit('message','A user has left!')
    })

    

})  //event, callback function

server.listen(port, () => {
    console.log("Listening on port "+port)
})