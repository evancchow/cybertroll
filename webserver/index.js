var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
mongoose.connect("mongodb://user:password@ds037215.mongolab.com:37215/cybertroll");

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: { type: String, unique: true },
});
var User = mongoose.model('User', UserSchema);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/createuser', function(req, res) {
	var new_user = new User({name: req.param.username})
	new_user.save(function(err) {
		if (err) return handleError(err)
		else {
			res.send('Success')
		}
	})
})

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
