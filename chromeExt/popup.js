document.addEventListener('DOMContentLoaded', function() {
  var trollButton = document.getElementById('trollbutton');
  trollButton.addEventListener('click', function() {
    console.log("here")
    var socket = io.connect('http://192.241.182.93:3000/');
    socket.emit('privmsg', {'to': 'eugene', 'msg':'hi'});
    socket.emit('chat message', 'hi all')
  });

  /* Update with your identity */
  var username = "evan";
  console.log("THIS WORKS ");

  /* Update the friendlist w/online friends when the 
  	extension is loaded. */
  var start_url = 'http://192.241.182.93:3000/getfriends/' + username;
  var friends = httpGet(start_url);
  console.log(friends);
  updateFriendList(friends);

  // $('#friendlist').append('<li>Evan Chow</li>');
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
	for (i = 0; i < parsedFriends.length; i++) {
		var currName = parsedFriends[i]["name"];
		console.log(currName);
		if (parsedFriends[i]["online"] == true) {			
			$('#friendlist').append('<li>' + currName)
        .append('<input type="button" value="Troll" id=' +
          '\"' + currName + '\"' +
          ' />');
      /*  */
			numOnlineFriends += 1;
		}
	}
	$('#numOnlineFriends').text(numOnlineFriends);
};