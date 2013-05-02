
$(document).ready(function() {
	$.ajax({
        type: 'GET',
        url: '/events/getmyevents',
        data: {},
        contentType: "application/json",
        dataType: "json",
        success: function(respData) {
        	addMyEvents(respData.pastEvents, "past");
        	addMyEvents(respData.currentEvents, "current");

        	// Reset the notification number
        	$('.badge').hide();
        },
        failure: function(err) {
        	console.log('Failure');
        }
    });
});

var eventIdHash = {};
var noEvents = false;

function addMyEvents(jsonResp, htmlID, shouldPrepend) {
	var geocoder = new google.maps.Geocoder();

	//If no events found previously, remove the text and push new ones
	if (noEvents){
		$("#my_events_" + htmlID).html("");
		console.log("Set html to nothing. " + $("#my_events_" + htmlID).innerHTML);
	}

	if (jsonResp.length === 0) {
		noEvents = true;
		$("#my_events_" + htmlID).html('No events found.');
	}

	// Loop through each activities entry in the dictionary
	$.each(jsonResp, function(index, data) {
		//Check if eventId is in hash so we don't add duplicates
		if (!eventIdHash[data.id]){
			//Add eventId to hash so we don't add duplicates
			eventIdHash[data.id] = true;

			// Create variables for dynamic ids of certain divs
			var index = parseInt(index) + 1;
			index = index.toString();
			var eventID = 'event_'  + htmlID + index;
			var eventPrice = 'event-price_'  + htmlID + index;
			var eventParticipants = 'event-num-participants_'  + htmlID + index;
			var eventDate = 'event-date_'  + htmlID + index;
			var eventTime = 'event-time_'  + htmlID + index;

			// Append the html to the list_activities div
			var newHTML = '<li class="list-item ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-li-has-thumb ui-btn-up-c" id="' + eventID + '">' +
				'<div class="button_result">' +
				'<div class="button_result_left">' +

				'<div class="row-title">' + index + '. ' + data.name + '</div><br>' +
				'<div class="row-description"><b>Description:</b> ' + data.description + '</div>' +
				'<div class="row-date-range" id="' + eventDate + '"></div>' +
				'<div class="row-time-range" id="' + eventTime + '"></div>' +
				'<div class="row-num-participants" id="' + eventParticipants + '"></div>' +
				'</div>' +

				'<div class = "button_result_right">' +
				'<div class="row-category" id="event-category_' + htmlID + index + '"></div><br>' +
				'<div class="row-address" id="event-address_' + htmlID + index + '"></div><br>' +
				'<div class="row-price-range" id ="' + eventPrice + '"></div>' +
				'<div class="row-participants" id="event-invite-participants_' + htmlID + index + '"></div>' +
				
				'</div>' +
				'</div>' +

				'</li>';
			if (shouldPrepend){
				$(newHTML).clone().hide().prependTo("#my_events_"  + htmlID).slideDown();
			} else {
				$("#my_events_"  + htmlID).append(newHTML);
			}

			// Do some additional fixing of the event details
			var t1Str = convertMsToString(data.time1);
			var t2Str = convertMsToString(data.time2);
			$('#' + eventTime).html('<b>Time of Event:</b> ' + t1Str + ' to ' + t2Str);

			var beginDate = new Date(data.begindate);
			var endDate = new Date(data.enddate);
			var dateRangeStr = '<b>Date Range:</b> ' + beginDate.toDateString() + ' to ' + endDate.toDateString();
			if (beginDate.toDateString() === endDate.toDateString()) {
				dateRangeStr = '<b>Date Range:</b> ' + beginDate.toDateString();
			}
			$('#' + eventDate).html(dateRangeStr);

			// Get the Activity Details
			getActivityDetail(data.activityid, data.attendingusers, htmlID + index, function(activityJSON) {
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
		}
	});
}

function getActivityDetail(activityID, attendingusers, eventIndex, callback) {
	var activityJSON = {activityid: activityID};
	$.ajax({
        type: 'GET',
        url: '/activities/getactivitybyid',
        data: activityJSON,
        contentType: "application/json",
        dataType: "json",
        success: function(respData) {
        	console.log("SUCCESS FOR " + eventIndex);
        	handleInsertActivityDetail(respData.activity, attendingusers, eventIndex, callback);
        },
        failure: function(err) {
        	console.log('Failure');
        }
    });
}

function handleInsertActivityDetail(activityJSON, attendingusers, eventIndex, callback) {
	var eventPrice = 'event-price_' + eventIndex;
	var eventNumParticipants = 'event-num-participants_' + eventIndex;
	var eventTime = 'event-time_' + eventIndex;
	var eventCategory = 'event-category_' + eventIndex;

	var participantsStr = 'For ' + activityJSON.lownumparticipants + ' to ' + activityJSON.highnumparticipants + ' people';
	var priceRangeStr = 'Price Range: $' + activityJSON.lowprice + ' to $' + activityJSON.highprice;


	$('#' + eventNumParticipants).html(participantsStr);
	$('#' + eventPrice).html(priceRangeStr);
	$('#' + eventCategory).html(activityJSON.category);

	// Fix some of the event details
	fixPriceRange(parseInt(activityJSON.lowprice), parseInt(activityJSON.highprice), eventPrice);
	fixParticipantsRange(parseInt(activityJSON.lownumparticipants), parseInt(activityJSON.highnumparticipants), eventNumParticipants);

	// Add the invited participants
	var participantsDivID = '#event-invite-participants_' + eventIndex;
	addInvitedParticipants(participantsDivID, attendingusers);
	
	// Calculate the address from the provided latitude and longitude, and insert it into the html
	reverseGeocodeAddress(activityJSON.latitude, activityJSON.longitude, function(address) {
		$('#event-address_' + eventIndex).append('<span class="row-address-name">' + address + '</span>');
		callback(activityJSON);
	});
	
}