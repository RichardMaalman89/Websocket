var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

var users = [];

io.on('connection', function(socket) {

  console.log('socket connected %s', socket.id);
  
  users.push(socket.id);

  socket.on('joined', function(data) {
    var usrData = {
      user_id: socket.id,
      user_data: data
    }
    users.push(usrData);
    socket.broadcast.emit('user_joined', usrData);
    socket.emit('init_others', users);
  });

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('image', function(msg) {
    socket.broadcast.emit('image', msg);
  });

  socket.on('disconnect', function() {
    console.log('socket disconnected %s', socket.id);
    socket.broadcast.emit('user_disconnected', socket.id);
    users.splice(users.indexOf(socket.id), 1);
  })
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
