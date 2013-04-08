// Use geddy.io 
//Setup io

 // var io = require('socket.io').listen(8000);
geddy.io = require('socket.io').listen(8000);
geddy.io.sockets.on('connection', function(socket) {
	socket.emit('hello', {message: 'world'});
	socket.on('message', function(message) {
		geddy.log.notice(message);
		geddy.log.notice("BOOOOO");
	});
});