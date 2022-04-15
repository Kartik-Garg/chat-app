//writing client site js stuff
//client should listen to welcome message
const socket = io()
socket.on('message', (message)=>{
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e)=>{
    //to prevent web-page reload
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error)=>{
        if(error){
            return console.log(error)
        }
        console.log("message was delivered")
    })
})

document.querySelector('#send-location').addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('GeoLocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        //console.log(location)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })

})