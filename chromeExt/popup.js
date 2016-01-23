document.addEventListener('DOMContentLoaded', function() {
  var trollButton = document.getElementById('trollbutton');
  trollButton.addEventListener('click', function() {
    console.log("here")
    var socket = io.connect('http://192.241.182.93:3000/');
    socket.emit('chat message', 'troll');
  })
})