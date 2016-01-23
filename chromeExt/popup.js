document.addEventListener('DOMContentLoaded', function() {

  /* Update with your identity */
  var username = "evan";

  /* Get list of friends */
  var friends = httpGet('http://192.241.182.93:3000/getfriends/' + 
    username);
  updateFriendList(friends);

  /* Add listener for button to troll everyone */
  $('#troll_everyone').click(function () {
    var friends = httpGet('http://192.241.182.93:3000/getfriends/' + 
      username);
    trollEveryone(friends);
  });

});

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
};

function updateFriendList(friends) {
	var parsedFriends = JSON.parse(friends);
	var numOnlineFriends = 0;

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
};

function trollEveryone(friends) {
  var parsedFriends = JSON.parse(friends)
  parsedFriends.forEach(function(friend) {
    if (friend["online"]) {
      friendTroll(friend["name"]);
    }
  });
};