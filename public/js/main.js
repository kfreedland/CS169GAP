//Login Page
function facebookClicked(event) {
  	event.preventDefault();
	//var url = document.location.protocol + window.location.host + $('.btn-facebook').attr('href');
	var url = $('.btn-facebook').attr('href');
	$(location).attr('href', url);
	// $(href + $('.btn-facebook').attr('href') ).show();
    return false;
}