//writing client site js stuff
//client should listen to welcome message
const socket = io()

//Elemetns
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

//location elements
const $sendLocation = document.querySelector('#send-location')

socket.on('message', (message)=>{
    console.log(message)
})

$messageForm.addEventListener('submit', (e)=>{
    //to prevent web-page reload
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')
    //disable
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        //enable
        if(error){
            return console.log(error)
        }
        console.log("message was delivered")
    })
})

$sendLocation.addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('GeoLocation is not supported by your browser')
    }
    //disabling after hittin click
    $sendLocation.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position)=>{
        //console.log(location)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, ()=>{
            console.log('location shared')
            //enable button after getting ack
            $sendLocation.removeAttribute('disabled')
        })
    })

})