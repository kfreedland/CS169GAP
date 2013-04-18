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

	// Calculate the address from the provided latitude and longitude, and insert it into the html
	reverseGeocodeAddress(jsonData.latitude, jsonData.longitude, function(address) {
		$("#addressReadOnly").val(address);
	});

	$('#name').val(name);
	$('#activityDescription').val(desc);

	if (time1 != null && time2 != null) {
		console.log(time1 + "time2 is " + time2);
		var correctedTime1 = convertMsToString(time1);
		var correctedTime2 = convertMsToString(time2);
		$('#startTimeEvent').val(correctedTime1);
		$('#endTimeEvent').val(correctedTime2);
	}

	$('#minPrice').val(lowprice);
	$('#maxPrice').val(highprice);
	$('#lowNumPart').val(lowpart);
	$('#highNumPart').val(highpart);
	$('#category').val(category);

	createEvent(id);
});

function createEvent(activityId) {
	$('#createEventButton').click(function() {
		// Create JSON Dict for event data
		var eventData = {};

		var beginDate = $('#beginDate').val();
		var endDate = $('#endDate').val();
		var startTime = $('#startTimeEvent').val();
		var endTime = $('#endTimeEvent').val();
	    // Convert the dates and times to milliseconds
		var epochStartDate = convertDateToEpoch(beginDate);
		var epochEndDate = convertDateToEpoch(endDate);
		var time1 = findMsFromMidnight(startTime);
		var time2 = findMsFromMidnight(endTime);

		eventData.name = $('#name').val();
		eventData.activityid = activityId;
		eventData.time1 = time1;
	    eventData.time2 = time2;
	    eventData.begindate = epochStartDate;
	    eventData.enddate = epochEndDate;
	    eventData.description = $('#activityDescription').val();
	    var fullname = $('.full_name').text();
	    fullname = fullname.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	    eventData.inviter = fullname;

		var invitedFriends = $('#invitedFriends').val();
		eventData.attendingusers = invitedFriends;
		console.log("EVENT DATA:");
		console.log(eventData);
		$.ajax({
	        type: 'POST',
	        url: '/events/create',
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
