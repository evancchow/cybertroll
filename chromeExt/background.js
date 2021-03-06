function httpGet(theUrl, callback) {
  jQuery.get(theUrl, callback);
};

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

    chrome.tabs.getAllInWindow( null, function( tabs ){
        console.log("Initial tab count: " + tabs.length);
        num_tabs = tabs.length;
    });
    chrome.tabs.onCreated.addListener(function(tab){
        num_tabs++;
        console.log("Tab created event caught. Open tabs #: " + num_tabs);
    });
    chrome.tabs.onRemoved.addListener(function(tabId){
        num_tabs--;
        console.log("Tab removed event caught. Open tabs #: " + num_tabs);
        if( num_tabs == 0 )
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

