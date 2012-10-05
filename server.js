var io = require('socket.io'),
    express = require('express');

console.log('Server started');

var app = express.createServer();
app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

var sio = io.listen(app);
 
sio.on('connection', function (socket) {
    console.log('A socket connected!');
    // do all the session stuff
    socket.join(socket.handshake.sessionID);
    // socket.io will leave the room upon disconnect
    
    socket.emit('news', { hello: 'world' });
    socket.on('motion', function (data) {
      console.log(data);
    });
});
 
app.get('/', function (req, res) {
    sio.sockets.in(req.sessionID).send('Man, good to see you back!');
});

app.listen(3000);