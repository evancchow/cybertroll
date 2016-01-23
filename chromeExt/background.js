var socket = io.connect('http://192.241.182.93:3000/');
console.log("connected")
socket.emit('login', {'username':'evan' + Math.floor((Math.random() * 100) + 1) })
//socket.emit('chat message', 'blue');
socket.on('privmsg', function(msg) {
  alert('Private message: ' + msg)
})
socket.on('chat message', function(msg){
  alert(msg);
});



