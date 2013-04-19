
$(document).ready(function() {
	var encodedDataStr = window.location.hash;
	// Remove the # in the front
	var encodedDataFixed = encodedDataStr.slice(1);
	
	var jsonData = $.parseJSON(window.atob(encodedDataFixed));
	handleEventDetailResponse(jsonData);
	inviteMoreFriends(jsonData.id);
	removeEvent(jsonData);
	addComment(jsonData);
	getComments(jsonData.id);
});

function handleEventDetailResponse(jsonData) {
	$('#event-title').html(jsonData.name);
	$('#event-description').html('<b>Description:</b> ' + jsonData.description);
	var numParticipantsStr = '<b>Number of Participants:</b> For ' + jsonData.lownumparticipants + ' to ' + jsonData.highnumparticipants + ' people';
	$('#event-num-participants').html(numParticipantsStr);
	$('#event-category').html('<b>Category:</b> ' + jsonData.category);
	var priceRangeStr = '<b>Price Range:</b> $' + jsonData.lowprice + ' to $' + jsonData.highprice;
	$('#event-price-range').html(priceRangeStr);

	var beginDate = new Date(jsonData.begindate);
	var endDate = new Date(jsonData.enddate);
	var dateRangeStr = '<b>Date Range:</b> ' + beginDate.toDateString() + ' to ' + endDate.toDateString();
	if (beginDate.toDateString() === endDate.toDateString()) {
		dateRangeStr = '<b>Date Range:</b> ' + beginDate.toDateString();
	}
	$('#event-date-range').html(dateRangeStr);
	
	// Do some additional fixing of the event details
	fixPriceRange(parseInt(jsonData.lowprice), parseInt(jsonData.highprice), 'event-price-range');
	fixParticipantsRange(parseInt(jsonData.lownumparticipants), parseInt(jsonData.highnumparticipants), 'event-num-participants');
	addInvitedParticipants('#event-participants', jsonData.attendingusers);
	var t1Str = convertMsToString(jsonData.time1);
	var t2Str = convertMsToString(jsonData.time2);
	$('#event-time-range').html('<b>Time of Event:</b> ' + t1Str + ' to ' + t2Str);

	// Calculate the address from the provided latitude and longitude, and insert it into the html
	reverseGeocodeAddress(jsonData.latitude, jsonData.longitude, function(address) {
		$("#event-address").append('<span class="row-address-name"><b>Address:</b> ' + address + '</span>');
	});
}

function inviteMoreFriends(eventID) {
	$('#inviteFriendsButton').click(function() {
		var invitedFriends = $('#invitedFriends').val();
		var friendsData = {eventid: eventID, usernames: invitedFriends};
		$.ajax({
	        type: 'POST',
	        url: '/events/adduserstoevent',
	        data: JSON.stringify(friendsData),
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

function getComments(eventID) {
	data = {eventid: eventID};
	$.ajax({
        type: 'GET',
        url: '/comments/getcommentsforevent',
        data: data,
        contentType: "application/json",
        dataType: "json",
        success: function(respData) {
        	console.log('Success');
        	console.log(respData);
        	handleGetCommentsResponse(respData.comments);
        },
        failure: function(err) {
        	console.log('Failure');
        }
    });
}

function handleGetCommentsResponse(commentData) {
	// Loop through each comments entry in the dictionary
	$.each(commentData, function(index, data) {
		// Append the html to the list_activities div
		$('#comments_list').append(
			// '<div class="comment_box">' + commentStr + '</div>'
			'<div class="comment_box">' +
			
			'<div class="comment_username">' +
				'<b>' + data.userid + ':</b>' +
			'</div>' +
			'<div class="comment_text">' +
				data.text +
			'</div>' +

			'</div>'
		);
	});
}