$(document).ready(function() {
	var encodedDataStr = window.location.hash;
	// Remove the # in the front
	var encodedDataFixed = encodedDataStr.slice(1);
	var jsonData = $.parseJSON(window.atob(encodedDataFixed));

	var name = jsonData.name;
	var desc = jsonData.description;
	var date1 = jsonData.begindate;
	var date2 = jsonData.enddate;
	var time1 = jsonData.time1;
	var time2 = jsonData.time2;
	var flag = jsonData.flag;
	var longitude = jsonData.longitude;
	var latitude = jsonData.latitude;
	var lowprice = jsonData.lowprice;
	var highprice = jsonData.highprice;
	var highpart = jsonData.highnumparticipants;
	var lowpart = jsonData.lownumparticipants;
	var category = jsonData.category;
	var id = jsonData.id;

	deleteEvent(id);
});


function deleteEvent(activityId) {
	('#deleteEventButton').click(function() {
		$.ajax({
	        type: 'POST',
	        url: '/events/delete',
	        data: JSON.stringify(eventData),
	        contentType: "application/json",
	        dataType: "json",
	        success: function(respData) {
	        	console.log('Success');
	        	console.log(respData);
	        	window.location = '/events/myevents';
	        },
	        failure: function(err) {
	        	console.log('Failure');
	        }
	    });
	});

}