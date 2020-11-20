const socket = io();


// socket.on('countUpdated', (count) => {
//     console.log('count has been updated :' + count);
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('clicked');
//     socket.emit('increment');
// })
document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // const message = document.querySelector('input').value;
    const message = e.target.elements.message

    socket.emit('SendMessage', message);
})

socket.on('message', (msg) => {
    console.log(msg);
})