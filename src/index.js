const express = require('express')
const path = require('path')
//const socketio = require('socket.io')

const app = express()
const PORT = 3000

const publicDirPath = path.join(__dirname, "../public")
//use express middleware to serve public content
app.use(express.static(publicDirPath))

const server = app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
})

//let for this block and var is global
let count = 0

//setup socketio with server
const io = require('socket.io')(server)

//socket here is an object which contains information about new connection
io.on('connection', (socket)=>{
    console.log('New WebSocket connection', count)

    //send welcome to new connections, so have to use socket, because already connected ones should not 
    //recieve any new messages
    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined')
    socket.on('sendMessage', (message)=>{
        io.emit('message',message)
    })

    //sending a message if a user disconnects
    socket.on('disconnect', ()=>{
        io.emit('message', 'A user has left')
    })

    //receiing location from client
    socket.on('sendLocation', (location)=>{
        socket.broadcast.emit('message', `https://google.com/maps?q=${location.latitude},${location.longitude}`)
    })
})