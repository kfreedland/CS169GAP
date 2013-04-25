$(function(){
  // Bind the event.
  $(window).hashchange(setupClickHandlers);

  // Trigger the event (useful on page load).
  setupClickHandlers();
});


function setupClickHandlers() {
	//Remove any parameters from the URL when changing views

	//Remove handlers so they don't fire twice
	$('#findActivityButton').die("click tap");
	$('#findActivityButton').live("click tap", function() {
		//If you are on another URL, this button should go back to main url
		if (window.location.pathname != "/"){
			window.location.pathname = "/";
		}
		//If there are params, remove them so it doesn't save them on page load
		if (window.location.search != ""){
			window.location.search = "";
		}
		if (window.location.hash != ""){
			window.location.hash = "";
		}
		return false;
	});

	//This doesn't work yet because the search="" refreshes page and the anchor doesn't work then

	//Remove handlers so they don't fire twice
	$('#createActivityButton').die("click tap");
	$('#createActivityButton').live("click tap", function() {
		//If you are on another URL, this button should go back to main url
		console.log("pathname = " + window.location.pathname);
		//If you are on another URL, this button should go back to main url
		if (window.location.pathname != "/"){
			window.location.pathname = "/";
		}
		//If there are params, remove them so it doesn't save them on page load
		if (window.location.search != ""){
			window.location.search = "";
		}
		window.location.hash = "create_activity_page";
		// if (document.location.search != ""){
		// 	document.location.search = "";
		// 	document.location.hash = "";
		// 	document.location.hash = "create_activity_page";
		// }
		return false;
	});
}