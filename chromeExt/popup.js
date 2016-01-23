document.addEventListener("DOMContentLoaded", function() {
  socket = io.connect('http://192.241.182.93:3000/');
  console.log("connected");

  /* Update with your identity */
  var username = "evan";

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
  })

  socket.on("offline", function(msg) {
    console.log("Offline: " + msg);
    httpGet('http://192.241.182.93:3000/getfriends/' + 
    username, updateFriendList);
  })

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
});

function httpGet(theUrl, callback) {
  jQuery.get(theUrl, callback);
};

function updateFriendList(friends) {
  var parsedFriends = friends
	var numOnlineFriends = 0;
  $('#numOnlineFriends').text(numOnlineFriends);

  parsedFriends.forEach(function(friend) {
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
