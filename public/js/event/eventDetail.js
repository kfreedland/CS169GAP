
$(document).ready(function() {
	var encodedDataStr = window.location.hash;
	// Remove the # in the front
	var encodedDataFixed = encodedDataStr.slice(1);
	
	var jsonData = $.parseJSON(window.atob(encodedDataFixed));
	handleEventDetailResponse(jsonData);
	inviteMoreFriends(jsonData.id);
});

function handleEventDetailResponse(jsonData) {
	$('#event-title').html(jsonData.name);
	$('#event-description').html('Description: ' + jsonData.description);
	var numParticipantsStr = 'Number of Participants: For ' + jsonData.lownumparticipants + ' to ' + jsonData.highnumparticipants + ' people';
	$('#event-num-participants').html(numParticipantsStr);
	$('#event-category').html('Category: ' + jsonData.category);
	var priceRangeStr = 'Price Range: $' + jsonData.lowprice + ' to $' + jsonData.highprice;
	$('#event-price-range').html(priceRangeStr);
	
	// Do some additional fixing of the event details
	fixPriceRange(parseInt(jsonData.lowprice), parseInt(jsonData.highprice), 'event-price-range');
	fixParticipantsRange(parseInt(jsonData.lownumparticipants), parseInt(jsonData.highnumparticipants), 'event-num-participants');

	// Do some additional fixing of the event details
	var t1Str = convertMsToString(jsonData.time1);
	var t2Str = convertMsToString(jsonData.time2);
	$('#event-time-range').html('Time of Event: ' + t1Str + ' to ' + t2Str);

	// Calculate the address from the provided latitude and longitude, and insert it into the html
	reverseGeocodeAddress(jsonData.latitude, jsonData.longitude, function(address) {
		$("#event-address").append('<span class="row-address-name">Address: ' + address + '</span>');
	});
}

function inviteMoreFriends(eventID) {
	$('#inviteFriendsButton').click(function() {
		var invitedFriends = $('#invitedFriends').val();
		var friendList = invitedFriends.split(',');
		var friendsData = {eventid: eventID, emails: friendList, message: ''};
		$.ajax({
	        type: 'POST',
	        url: '/events/invite',
	        data: JSON.stringify(friendsData),
	        contentType: "application/json",
	        dataType: "json",
	        success: function(respData) {
	        	console.log('Success');
	        	console.log(respData);
	        	// TODO: Need to show confirmation that friend was invited
	        	//location.reload();
	        },
	        failure: function(err) {
	        	console.log('Failure');
	        }
	    });
	});
}