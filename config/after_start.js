// Use geddy.io 
//Setup io

 // var io = require('socket.io').listen(8000);
var port = process.env.PORT || 8000;
geddy.io = require('socket.io').listen(port);
//Configue io to work with heroku
geddy.io.configure(function () { 
	io.set("transports", ["xhr-polling"]); 
	io.set("polling duration", 10); 
});
// geddy.io.sockets.on('connection', function(socket) {
// 	geddy.socket = socket;
// });