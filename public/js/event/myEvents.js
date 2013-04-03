
$(document).ready(function() {
	$.ajax({
        type: 'GET',
        url: '/events/getmyevents',
        data: {},
        contentType: "application/json",
        dataType: "json",
        success: function(respData) {
        	console.log(respData.events);
        	addMyEvents(respData.events);
        },
        failure: function(err) {
        	console.log('Failure');
        }
    });
});

function addMyEvents(jsonResp) {
	var geocoder = new google.maps.Geocoder();
	if (jsonResp.length === 0) {
		$("#my_events").html('No events found.')
	}
	// Loop through each activities entry in the dictionary
	$.each(jsonResp, function(index, data) {
		// Create variables for dynamic ids of certain divs
		var index = parseInt(index) + 1;
		var index = index.toString();
		var eventID = "event-" + index;
		var eventPrice = 'event-price-' + index;
		var eventParticipants = 'event-participants-' + index;
		var eventTime = 'event-time-' + index;

		// Encode the json object to a string
		var encodedData = window.btoa(JSON.stringify(data));

		// Append the html to the list_activities div
		$("#my_events").append(
			'<li class="list-item ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-li-has-thumb ui-btn-up-c" id="' + eventID + '">' +
			'<div class="button_result">' +
			'<div class="button_result_left">' +

			'<div class="row-title">' + index + '. ' + data.name + '</div><br>' +
			'<div class="row-description">' + data.description + '</div>' +
			'<div class="row-num-participants" id="' + eventParticipants + '">For ' + data.lownumparticipants + ' to ' + data.highnumparticipants + ' people</div>' +
			'<div class="row-time-range" id="' + eventTime + '"></div>' +
			
			'</div>' +
			'<div class = "button_result_right">' +
			'<div class="row-category">' + data.category + '</div><br>' +
			'<div class="row-address" id="event-address-' + index + '"></div><br>' +
			'<div class="row-price-range" id ="' + eventPrice + '">Price Range: $' + data.lowprice + ' to $' + data.highprice + '</div>' +
			'<div class="row-participants" id="event-participants' + index + '"></div><br>' +
			'</div>' +
			'</li>'
		);

		// Add on click functionality to the event
		$('#' + eventID).click(function() {
			window.location = '/events/eventdetail#' + encodedData;
		});

		// Do some additional fixing of the event details
		fixPriceRange(parseInt(data.lowprice), parseInt(data.highprice), eventPrice);
		fixParticipantsRange(parseInt(data.lownumparticipants), parseInt(data.highnumparticipants), eventParticipants);
		addTimeRange(data.flag, data.time1, data.time2, eventTime);

		// Add the invited participants
		var participantsDivID = 'event-participants' + index;
		console.log(data.attendingusers);
		addInvitedParticipants(participantsDivID, data.attendingusers);

		// Calculate the address from the provided latitude and longitude, and insert it into the html
		reverseGeocodeAddress(data.latitude, data.longitude, function(address) {
			$("#event-address-" + index).append('<span class="row-address-name">' + address + '</span>');
		});
	});
}

function addInvitedParticipants(participantsDivID, participantsList) {
	var participantsStr = "Invited Participants: ";
	$.each(participantsList, function(index, data) {
		participantsStr = participantsStr + data + ', ';
	});
	console.log(participantsStr);
	$(participantsDivID).html(participantsStr);
}