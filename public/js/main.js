//Remove any parameters from the URL when changing views
$('#findActivityButton').live("click tap", function() {
	//If you are on another URL, this button should go back to main url
	if (document.location.pathname != "/"){
		document.location.pathname = "/";
	}
	//If there are params, remove them so it doesn't save them on page load
	if (document.location.search != ""){
		document.location.search = "";
	}
	return true;
});

//This doesn't work yet because the search="" refreshes page and the anchor doesn't work then
$('#createActivityButton').live("click tap", function() {
	//If you are on another URL, this button should go back to main url
	console.log("pathname = " + document.location.pathname);
	if (document.location.pathname != "/"){
		document.location.pathname = "/";
		document.location.hash = "create_activity_page";
	}
	// if (document.location.search != ""){
	// 	document.location.search = "";
	// 	document.location.hash = "";
	// 	document.location.hash = "create_activity_page";
	// }
	return true;
});

var href = document.location.protocol + document.location.hostname + ':8000';
console.log('href =' + href);
var socket = io.connect(href);
	socket.on('bobEvent', function (data) {
	console.log(data);
	socket.emit('bobReturn', { my: 'data' });
});