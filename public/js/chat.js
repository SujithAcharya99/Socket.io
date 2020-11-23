const socket = io();

//Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');


//templetes
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locatioMessageTemplate = document.querySelector('#location-message-template').innerHTML;

//options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true})


socket.on('message', (msg) => {
    console.log(msg);
    const html = Mustache.render(messageTemplate, {
        msg: msg.text,
        // createdAt: msg.createdAt
        createdAt: moment(msg.createdA).format('hh:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
})

socket.on('locationMessage', (message) => {
    console.log(message);
    const html = Mustache.render(locatioMessageTemplate, {
        url: message.url,
        createdAt: moment(message.createdAt).format('hh:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
})


$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled');

     //disable
    const sendmsg = e.target.elements.message.value;

    socket.emit('SendMessage', sendmsg, (error) =>{
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus()

        if (error) {
            return console.log(error);
        }

        console.log('message delivered');
    });


})

$sendLocationButton.addEventListener('click' , () => {
    if (!navigator.geolocation) {
        return alert('Geo location is not supported by your browser. Pls update your browser...');
    }
    $sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        //console.log(position);
        // const position;
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Loction Shared');
        });
    })
    
})

socket.emit('join', {username, room})
