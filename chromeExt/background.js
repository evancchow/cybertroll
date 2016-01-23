var socket = io.connect('http://192.241.182.93:3000/');
console.log("connected")
var username = 'eugene'
socket.emit('login', {'username': username})
//socket.emit('chat message', 'blue');
socket.on('privmsg', function(msg) {
  alert('Private message: ' + msg)
})



