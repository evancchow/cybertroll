var socket = io.connect('http://192.241.182.93:3000/');
console.log("connected")
chrome.storage.sync.get({'username' : 'NULL_VALUE_NAME'}, function(name) {
  console.log(name); // for debugging
  if (name.username == 'NULL_VALUE_NAME' || name.username == null || 
      !name.username || name.username == undefined) {
    window.location.href = "login.html";
  } else {
    chrome.storage.sync.get('username', function(n) {
      username = n.username
      if (username === null || username === undefined) {
        return
      }
      console.log(username)
      socket.on(username, function(msg) {
        console.log('Private message: ' + msg)
        alert('Private message: ' + msg)
      })
      socket.on('chat message', function(msg) {
        alert('Public message: ' + msg)
      })
    })

    $(window).bind('beforeunload', function() {
        httpGet('http://192.241.182.93:3000/gooffline/' + 
        username, function(res) {
        console.log(res)
        if (res == "Success") {
          socket.emit("offline", username)
        }
      })
    }); 
  }
});




