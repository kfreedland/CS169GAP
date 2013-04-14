// Use geddy.io 
//Setup io

 // var io = require('socket.io').listen(8000);
var port = 8000//process.env.PORT || 8000;
geddy.io = require('socket.io').listen(port);
//Configue io to work with heroku
geddy.io.configure(function () { 
	geddy.io.set("transports", ["xhr-polling"]); 
	geddy.io.set("polling duration", 10); 
});
// geddy.io.sockets.on('connection', function(socket) {
// 	geddy.socket = socket;
// });