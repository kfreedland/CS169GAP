

$(document).ready(function() {
	$('#list_activities_container').hide();
	/*
	  When the Find Activities button is clicked, send an ajax call to /activities/search with the form data
	*/
	$('#find_activity_button').click(function() {
		// Get the values from the form inputs
		pullAndReturnData('find', function(dataResp) {
			// Validate the dictionary object before sending it
			// TODO: Write the success and failure functions
			validateData(dataResp, function(validData) {
				$.ajax({
			        type: 'GET',
			        url: '/activities/search',
			        data: JSON.stringify(dataResp),
			        contentType: "application/json",
			        dataType: "json",
			        success: function(respData) {
			        	console.log('Successful Find Activity Call');
			        	console.log(respData);
			        	handleFindActivityResponse(respData);
			        },
			        failure: function(err) {
			        	console.log('Failure');
			        }
			    });
			});
		});
	    return false;
	});

	/*
	  Show or hide the time range options depending on which radio button is active
	*/
	$('input:radio[name="time_range_find"]').change(function() {
    	if ($(this).val() === "start_end") {
        	$('#start_end_range_find').show();
        } else {
        	$('#start_end_range_find').hide();
        }
	});
	
	autocomplete_init('find');

	var currentPosition = getCurrentPosition(function(pos) {
		$("#loc_link_find").click(function() {
			$("#location_input_find").val(pos);
		});
	});	
});

/*
  Function to handle the response from clicking on the 'Find Activities' button

  Take the JSON object from the AJAX response and populate the html with the list of suggested activities.

  @param Dict jsonResp - The JSON object returned from the AJAX call to Find Activities
*/
function handleFindActivityResponse(jsonResp) {
	// Hide the find activities form and show the suggested activities list
	$('#find_activity').hide();
	window.scrollTo(0, 0);
	$('#list_activities_container').show();

	var geocoder = new google.maps.Geocoder();

	// Loop through each activities entry in the dictionary
	$.each(jsonResp, function(index, data) {
		// Create variables for dynamic ids of certain divs
		var index = parseInt(index)+1;
		var index = index.toString();
		var activityID = "activity-" + index;
		var activityPrice = 'activity-price-' + index;
		var activityParticipants = 'activity-participants-' + index;
		var activityTime = 'activity-time-' + index;
		// Append the html to the list_activities div
		$("#list_activities").append(
			'<li class="list-item ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-li-has-thumb ui-btn-up-c id="' + activityID + '">' +
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
