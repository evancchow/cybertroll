document.addEventListener("DOMContentLoaded", function() {
  socket = io.connect('http://192.241.182.93:3000/');
  console.log("connected");

  /* Update with your identity */
  /* Sign in if you're new etc. Look into local storage. */
  chrome.storage.sync.get({'username' : 'NULL_VALUE_NAME'}, function(name) {
    console.log(name); // for debugging
    if (name.username == 'NULL_VALUE_NAME' || name.username == null || 
        !name.username || name.username == undefined) {
      var newName = window.prompt('Welcome to CyberTroll! What is your name?', 'Joe Smith').toLowerCase();
      chrome.storage.sync.set({'username' : newName}, function() {
        chrome.storage.sync.get('username', function(n) {
          alert('Good to meet you, ' + n.username);
          startup(n.username);
        });
      });
    } else {
      chrome.storage.sync.get('username', function(n) {
        alert('Welcome back, ' + n.username);
        startup(n.username);
      })
    }
  });
});

function startup(username) {
  console.log('Current user: ' + username);

  var numOnlineFriends = 0;
  $('#numOnlineFriends').text(numOnlineFriends);
  
  /* Get list of friends */
  httpGet('http://192.241.182.93:3000/getfriends/' + 
    username, updateFriendList);

  /* update when online / offline */
  socket.on("online", function(msg) {
    console.log("Online: " + msg);
    httpGet('http://192.241.182.93:3000/getfriends/' + 
    username, updateFriendList);
  });

  socket.on("offline", function(msg) {
    console.log("Offline: " + msg);
    httpGet('http://192.241.182.93:3000/getfriends/' + 
    username, updateFriendList);
  });

   /* Add friend button */
  $('#addfriendbutton').click(function () {
    var newFriend = window.prompt("Enter the name of your friend to add: ", "Albert Einstein");
    addFriend(username, newFriend); // username here works
  });

  /* Add listener for button to troll everyone */
  $('#troll_everyone').click(function () {
    httpGet('http://192.241.182.93:3000/getfriends/' + 
      username, trollEveryone);
  });

  /* Add button to logout user */
  $('#userbutton').click(function() {
    // Empty storage then restart extension
    chrome.storage.sync.clear(function() {
      window.location.href = "login.html";
    });
  });
};

function httpGet(theUrl, callback) {
  jQuery.get(theUrl, callback);
};

function updateFriendList(friends) {
  var parsedFriends = friends
	var numOnlineFriends = 0;
  $('#numOnlineFriends').text(numOnlineFriends);

  parsedFriends.forEach(function(friend) {
    if (friend) { // important b/c parsedFriends may have null values
      var currName = friend["name"];
      if (friend["online"]) { 
        $('#friendlist').append('<li>' + currName)
          .append('<input type="button" value="Troll" id=' +
            '\"' + 'friend_' + currName + '\"' +
            ' />')
          .append('</li>');

        /* Update # of friends */
        numOnlineFriends += 1;
        $('#numOnlineFriends').text(numOnlineFriends);

        /* Create listener for the button */
        $('#friend_' + currName).click( function() {
          friendTroll(currName);
        });
      }
    }
  });
};

function friendTroll(target) {
  /* Send a signal to the server to troll a friend. */
  alert("Trolling" + target);
  socket.emit("privmsg", {"to": target, "msg": "troll"});
};

function trollEveryone(friends) {
  var parsedFriends = friends
  //var parsedFriends = JSON.parse(friends);
  parsedFriends.forEach(function(friend) {
    if (friend["online"]) {
      friendTroll(friend["name"]);
    }
  });
};

function addFriend(name, friend) {
  httpGet('http://192.241.182.93:3000/addfriend/' + name +
    '/' + friend, function(res) { 
      alert(res) 
    });
};
