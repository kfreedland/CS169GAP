

$(document).ready(function() {
	/*
	  When the Back button is clicked, return to the 
	*/
	$('#list_back_button').click(function() {
		console.log('test');
		location.reload();
	});
});

function createActivityList(jsonResp) {
	var geocoder = new google.maps.Geocoder();

	// Loop through each activities entry in the dictionary
	$.each(jsonResp, function(index, data) {
		// Create variables for dynamic ids of certain divs
		var index = parseInt(index) + 1;
		var index = index.toString();
		var activityID = "activity-" + index;
		var activityPrice = 'activity-price-' + index;
		var activityParticipants = 'activity-participants-' + index;
		var activityTime = 'activity-time-' + index;

		// Encode the json object to a string
		var encodedData = window.btoa(JSON.stringify(data));

		// Append the html to the list_activities div
		$("#list_activities").append(
			'<li class="list-item ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-li-has-thumb ui-btn-up-c" id="' + activityID + '">' +
			'<div class="button_result">' +
			'<div class="button_result_left">' +

			'<div class="row-title">' + index + '. ' + data.name + '</div><br>' +
			'<div class="row-description">' + data.description + '</div>' +
			'<div class="row-num-participants" id="' + activityParticipants + '">For ' + data.lownumparticipants + ' to ' + data.highnumparticipants + ' people</div>' +
			'<div class="row-time-range" id="' + activityTime + '"></div>' +
			
			'</div>' +
			'<div class = "button_result_right">' +
			'<div class="row-category">' + data.category + '</div><br>' +
			'<div class="row-address" id="activity-address-' + index + '"></div><br>' +
			'<div class="row-price-range" id ="' + activityPrice + '">Price Range: $' + data.lowprice + ' to $' + data.highprice + '</div>' +
			
			'</div>' +
			'</li>'
		);

		// Add on click functionality to the activity
		$('#' + activityID).click(function() {
			window.location = '/activities/activitydetail#' + encodedData;
		});

		// Do some additional fixing of the activity details
		fixPriceRange(parseInt(data.lowprice), parseInt(data.highprice), activityPrice);
		fixParticipantsRange(parseInt(data.lownumparticipants), parseInt(data.highnumparticipants), activityParticipants);
		addTimeRange(data.flag, data.time1, data.time2, activityTime);

		// Calculate the address from the provided latitude and longitude, and insert it into the html
		reverseGeocodeAddress(data.latitude, data.longitude, function(address) {
			$("#activity-address-" + index).append('<span class="row-address-name">' + address + '</span>');
		});
	});
}