
$(document).ready(function() {
	$.ajax({
        type: 'GET',
        url: '/events/getmyevents',
        data: {},
        contentType: "application/json",
        dataType: "json",
        success: function(respData) {
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

		// Append the html to the list_activities div
		$("#my_events").append(
			'<li class="list-item ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-li-has-thumb ui-btn-up-c" id="' + eventID + '">' +
			'<div class="button_result">' +
			'<div class="button_result_left">' +

			'<div class="row-title">' + index + '. ' + data.name + '</div><br>' +
			'<div class="row-description">' + data.description + '</div>' +
			'<div class="row-num-participants" id="' + eventParticipants + '"></div>' +
			'<div class="row-time-range" id="' + eventTime + '"></div>' +
			'<div class="row-participants" id="event-participants' + index + '"></div>' +
			'</div>' +

			'<div class = "button_result_right">' +
			'<div class="row-category" id="event-category-' + index + '"></div><br>' +
			'<div class="row-address" id="event-address-' + index + '"></div><br>' +
			'<div class="row-price-range" id ="' + eventPrice + '"></div>' +
			
			'</div>' +

			'</li>'
		);

		// Do some additional fixing of the event details
		var t1Str = convertMsToString(data.time1);
		var t2Str = convertMsToString(data.time2);
		$('#' + eventTime).html('Time of Event: ' + t1Str + ' to ' + t2Str);

		// Add the invited participants
		var participantsDivID = '#event-participants' + index;
		addInvitedParticipants(participantsDivID, data.attendingusers);

		// Get the Activity Details
		getActivityDetail(data.activityid, index, function(activityJSON) {
			var eventData = data;
			eventData.category = activityJSON.category;
			eventData.lowprice = activityJSON.lowprice;
			eventData.highprice = activityJSON.highprice;
			eventData.lownumparticipants = activityJSON.lownumparticipants;
			eventData.highnumparticipants = activityJSON.highnumparticipants;
			eventData.latitude = activityJSON.latitude;
			eventData.longitude = activityJSON.longitude;

			// Encode the json object to a string
			var encodedData = window.btoa(JSON.stringify(eventData));

			// Add on click functionality to the event
			$('#' + eventID).click(function() {
				window.location = '/events/eventdetail#' + encodedData;
			});
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

function getActivityDetail(activityID, eventIndex, callback) {
	var activityJSON = {activityid: activityID};
	$.ajax({
        type: 'GET',
        url: '/activities/getactivitybyid',
        data: activityJSON,
        contentType: "application/json",
        dataType: "json",
        success: function(respData) {
        	handleInsertActivityDetail(respData.activity, eventIndex);
        	callback(respData.activity);
        },
        failure: function(err) {
        	console.log('Failure');
        }
    });
}

function handleInsertActivityDetail(activityJSON, eventIndex) {
	var eventPrice = 'event-price-' + eventIndex;
	var eventParticipants = 'event-participants-' + eventIndex;
	var eventTime = 'event-time-' + eventIndex;
	var eventCategory = 'event-category-' + eventIndex;

	var participantsStr = 'For ' + activityJSON.lownumparticipants + ' to ' + activityJSON.highnumparticipants + ' people';
	var priceRangeStr = 'Price Range: $' + activityJSON.lowprice + ' to $' + activityJSON.highprice;


	$('#' + eventParticipants).html(participantsStr);
	$('#' + eventPrice).html(priceRangeStr);
	$('#' + eventCategory).html(activityJSON.category);

	// Fix some of the event details
	fixPriceRange(parseInt(activityJSON.lowprice), parseInt(activityJSON.highprice), eventPrice);
	fixParticipantsRange(parseInt(activityJSON.lownumparticipants), parseInt(activityJSON.highnumparticipants), eventParticipants);

	// Calculate the address from the provided latitude and longitude, and insert it into the html
	reverseGeocodeAddress(activityJSON.latitude, activityJSON.longitude, function(address) {
		$("#event-address-" + eventIndex).append('<span class="row-address-name">' + address + '</span>');
	});
	
}