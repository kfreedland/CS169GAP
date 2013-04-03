
$(document).ready(function() {
	
	console.log('test');
	$.ajax({
        type: 'GET',
        url: '/events/getmyevents',
        contentType: "application/json",
        data: {},
        dataType: "json",
        success: function(respData) {
        	console.log('Successful');
        	console.log(respData);
        	handleMyEventsResponse(respData);
        },
        failure: function(err) {
        	console.log('Failure');
        }
    });
});

function handleMyEventsResponse(respData) {
	// TODO: Depends on what the getmyevents function returns
}