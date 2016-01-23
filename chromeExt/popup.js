document.addEventListener('DOMContentLoaded', function() {
  var trollButton = document.getElementById('trollbutton');
  trollButton.addEventListener('click', function() {
    var socket = io.connect('http://192.241.182.93:3000/');
    var username = "eugene"
    socket.emit('privmsg', {'to': username, 'msg':'hi'});
    socket.emit('chat message', 'hi all')
  })
})