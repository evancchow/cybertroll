var socket = io.connect('http://192.241.182.93:3000/');
socket.emit('login', {'username':'eugene', 'socket': socket })
//socket.emit('chat message', 'blue');
socket.on('chat message', function(msg){
  alert(msg);
});



