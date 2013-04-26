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





//Make fullscreen
function hideAddressBar()
{
    if(!window.location.hash)
    {
        if(document.height <= window.outerHeight + 10)
        {
            document.body.style.height = (window.outerHeight + 50) +'px';
            setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
        }
        else
        {
            setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
        }
    }
}
 
window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
window.addEventListener("orientationchange", hideAddressBar );


//Make content size big in case it doesn't fill full screen
window.addEventListener("load", function(){
       if(document.height <= window.outerHeight)
       {
           document.body.style.height = (window.outerHeight + 50) + 'px';
           setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
       }
       else
       {
           setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
       }
   }
);

//Handle if you were directed to page via an anchor
if( !window.location.hash )
{
    window.addEventListener("load", function(){
        if(document.height <= window.outerHeight + 10)
        {
            document.body.style.height = (window.outerHeight + 50) +'px';
            setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
        }
        else
        {
            setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
        }
    }
    );
}


//Make all links not open a new safari
