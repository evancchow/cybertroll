document.addEventListener("DOMContentLoaded", function() {
  socket = io.connect('http://192.241.182.93:3000/');
  console.log("connected");

  /* Update with your identity */
  /* Sign in if you're new etc. Look into local storage. */
  chrome.storage.sync.get({'username' : 'NULL_VALUE_NAME'}, function(name) {
    console.log(name); // for debugging
    if (name.username == 'NULL_VALUE_NAME' || name.username == null || 
        !name.username || name.username == undefined) {
      window.location.href = "login.html";
    } else {
      chrome.storage.sync.get('username', function(n) {
        username = n.username
        startup(n.username);
      })
    }
  });
});

function update_toggle() {
  console.log($('#onlinetoggle').prop('checked'))
  if ($('#onlinetoggle').prop('checked')) {
      $(".switch-button-label:contains('available')").css('color', 'green')
      $(".switch-button-label:contains('busy')").css('color', '#adadad')
      httpGet('http://192.241.182.93:3000/goonline/' + 
      username, function(res) {
        console.log(res)
        if (res == "Success") {
          socket.emit("online", username)
        }
      })
  } else {
      $(".switch-button-label:contains('busy')").css('color', 'red')
      $(".switch-button-label:contains('available')").css('color', '#adadad')
      httpGet('http://192.241.182.93:3000/gooffline/' + 
      username, function(res) {
        console.log(res)
        if (res == "Success") {
          socket.emit("offline", username)
        }
      })
  }
}

function startup(username) {
  $('#current_user').text(username.toUpperCase()); // update your name in the externsion

  httpGet('http://192.241.182.93:3000/goonline/' + 
    username, function(res) {
      console.log(res)
      if (res == "Success") {
        socket.emit("online", username)
      }
    })
  
  $("#onlinetoggle").switchButton({
    on_label: 'available',
    off_label: 'busy'
  });

  $(".switch-button-label:contains('available')").css('color', 'green')
  $(".switch-button-label:contains('busy')").css('color', '#adadad')
  $("#onlinetoggle").change(function(e) {
    update_toggle()
  })
  
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
  $('#friendlist li').remove()

  parsedFriends.forEach(function(friend) {
    if (friend) { // important b/c parsedFriends may have null values
      var currName = friend["name"];
      if (friend["online"]) { 
        $('#friendlist').append('<li>' + currName + '<input type="button" value="Troll" id=' +
            '\"' + 'friend_' + currName + '\"' +
            ' />' + '</li>');

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
  // alert("Trolling" + target);
  /* here: maybe update profile picture or icon next to friend? */
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
      httpGet('http://192.241.182.93:3000/getfriends/' + 
      username, updateFriendList);
      alert(res)
    });
};
