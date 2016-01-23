var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
mongoose.connect("mongodb://user:password@ds037215.mongolab.com:37215/cybertroll");

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: { type: String, required: true, dropDups: true },
  online: { type: Boolean, required: true },
  friends: [{ type: String, dropDups: true }]
});
var User = mongoose.model('User', UserSchema);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// create new user
app.get('/createuser/:username', function(req, res) {
	User.findOne({ 'name': req.params.username }, 'name', function (err, person) {
		if (err) { console.log(err); return }
		if (person !== null) {
			res.send('Username already taken')
			return
		}
	})
	var new_user = new User({name: req.params.username, 'online': true, 'friends': []})
	new_user.save(function(err) {
		if (err) { console.log(err); return }
		res.send('Success')
	})
})

// add friend
app.get('/addfriend/:user1/:user2', function(req, res) {
	user1 = req.params.user1
	user2 = req.params.user2
	if (user1 == user2) {
		res.send('You cannot be friends with yourself')
		return
	}
	User.findOne({ 'name': user1 }, 'name friends', function (err, person1) {
		if (err) { console.log(err); return }
		if (person1 === null) {
			res.send('User ' + user1 + ' does not exist')
			return
		}
		User.findOne({ 'name': user2 }, 'name friends', function (err, person2) {
			if (err) { console.log(err); return }
			if (person2 === null) {
				res.send('User ' + user2 + ' does not exist')
				return
			}
			if (person1.friends.indexOf(user2) >= 0) {
				res.send('Already friends')
				return
			}s
			person1.friends.push(user2)		
			person2.friends.push(user1)
			person1.save(function(err) {
				if (err) { console.log(err); return }
			})
			person2.save(function(err) {
				if (err) { console.log(err); return }
			})
			res.send('Success')
		})
	})
})

// remove friend
app.get('/removefriend/:user1/:user2', function(req, res) {
	user1 = req.params.user1
	user2 = req.params.user2
	if (user1 == user2) {
		res.send('You cannot be unfriend yourself')
		return
	}
	User.findOne({ 'name': user1 }, 'name friends', function (err, person1) {
		if (err) { console.log(err); return }
		if (person1 === null) {
			res.send('User ' + user1 + ' does not exist')
			return
		}
		User.findOne({ 'name': user2 }, 'name friends', function (err, person2) {
			if (err) { console.log(err); return }
			if (person2 === null) {
				res.send('User ' + user2 + ' does not exist')
				return
			}
			var index1 = person1.friends.indexOf(user2)
			var index2 = person2.friends.indexOf(user1)
			if (index1 < 0 && index2 < 0) {
				res.send('Already not friends')
				return
			}
			if (index1 < 0 || index2 < 0) {
				res.send("STRANGE ERROR. One person is friends with one, but not the other")
				return
			}
			person1.friends.splice(index1, 1)
			person2.friends.splice(index2, 1)
			person1.save(function(err) {
				if (err) { console.log(err); return }
			})
			person2.save(function(err) {
				if (err) { console.log(err); return }
			})
			res.send('Success')
		})
	})
})

// go online
app.get('/goonline/:username', function(req, res) {
	User.findOne({ 'name': req.params.username }, 'name online', function (err, person) {
		if (person === null) {
			res.send('User ' + req.params.username + ' does not exist')
			return
		}
		person.online = true
		person.save(function(err) {
			if (err) { console.log(err); return }
		})
		res.send("Success")
	})
})

// go offline
app.get('/gooffline/:username', function(req, res) {
	User.findOne({ 'name': req.params.username }, 'name online', function (err, person) {
		if (person === null) {
			res.send('User ' + req.params.username + ' does not exist')
			return
		}
		person.online = false
		person.save(function(err) {
			if (err) { console.log(err); return }
		})
		res.send("Success")
	})
})

// get friends
app.get('/getfriends/:username', function(req, res) {
	User.findOne({ 'name': req.params.username }, 'name friends', function (err, person) {
		if (person === null) {
			res.send('User ' + req.params.username + ' does not exist')
			return
		}
		var friends_statuses = []
		console.log(person.friends)
		console.log(person.friends.length)
		for (i = 0; i < person.friends.length; i++) {
			console.log(i)
			User.findOne({ 'name': person.friends[i] }, 'name online', function (err, p) {
				friends_statuses.push(p)
				if (friends_statuses.length == person.friends.length) {
					res.send(friends_statuses)
				}
			})			
		}
	})
})

var users = []
io.on('connection', function(socket){
 	socket.on('login', function(msg) {
 		console.log(msg)
 		//users.push(msg)
 	})
  	socket.on('chat message', function(msg){
    	io.emit('chat message', msg);
  	}); 
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
