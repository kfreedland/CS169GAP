//Login Page
function facebookClicked(event) {
  	event.preventDefault();
	//var url = document.location.protocol + window.location.host + $('.btn-facebook').attr('href');
	var url = $('.btn-facebook').attr('href');
	$(location).attr('href', url);
	// $(href + $('.btn-facebook').attr('href') ).show();
    return false;
}

//Remove any parameters from the URL when changing views
$('.ui-btn').on("click", function(){
	if ($(location).attr('href').indexOf("errCode") !== -1)){
		document.location.search = "";
		// document.url = window.location.pathname;
	}
	return true;
});