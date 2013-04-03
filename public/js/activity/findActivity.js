

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
			        data: dataResp,
			        contentType: "application/json",
			        dataType: "json",
			        success: function(respData) {
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
    	if ($(this).val() === "startEnd") {
        	$('#start_end_range_find').show();
        } else {
        	$('#start_end_range_find').hide();
        }
	});
	
		/*
	  Show or hide the date range options depending on whether the checkbox is active
	*/
	$('input:checkbox[name="checkbox-1"]').click(function() {
    	if ($(this).is(':checked') == false) {
        	$('#date-start-end-find').show();
        } else {
        	$('#date-start-end-find').hide();
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
  Fix the price range html if necessary

  If the low number and high number are both 0, then change the price range to say that it's free.
  If they are the same, change the range to just one number. (Ex: "Price Range: $3 to $3" to "Price Range: $3")

  @param int lowPrice - The lower bound of the price range
  @param int highPrice - The higher bound of the price range
  @param String priceDivId - The id of the div containing the price range
*/
function fixPriceRange(lowPrice, highPrice, priceDivId) {
	if (lowPrice === 0 && highPrice === 0) {
		$('#' + priceDivId).html('Price Range: Free');
	} else if (lowPrice === highPrice) {
		$('#' + priceDivId).html('Price Range: $' + lowPrice);
	}
}

/*
  Fix the number of participants html if necessary

  If the number of participants is only 1, change people to person. If the low number and high number
  are the same, change the range to just one number. (Ex: "For 2 to 2 people" to "For 2 people")

  @param int lowNumParticipants - The lower bound of number of partcipants
  @param int highNumParticipants - The higher bound of number of partcipants
  @param String participantsDivId - The id of the div containing the range of participants
*/
function fixParticipantsRange(lowNumParticipants, highNumParticipants, participantsDivId) {
	if (lowNumParticipants === 1 && highNumParticipants === 1) {
		$('#' + participantsDivId).html('For 1 person');
	} else if (lowNumParticipants === highNumParticipants) {
		$('#' + participantsDivId).html('For ' + lowNumParticipants + ' people');
	}
}

/*
  Add the time range values to the proper html div

  @param String flag - Flag that signifies what form the times will be in.
  					   Flag values: startEnd, openClose, anyTime, dayTime, nightTime
  @param int time1 - Starting time in ms from midnight, only required if flag = 'startEnd' or 'openClose'
  @param int time2 - Ending time in ms from midnight, only required if flag = 'startEnd' or 'openClose'
  @param String timeDivId - The id of the div to insert the html of the time range values into
*/
function addTimeRange(flag, time1, time2, timeDivId) {
	if (flag === "startEnd") {
		var t1Str = convertMsToString(time1);
		var t2Str = convertMsToString(time2);
		$('#' + timeDivId).html('Suggested Time: ' + t1Str + ' to ' + t2Str);
	} else if (flag === "openClose") {
		var t1Str = convertMsToString(time1);
		var t2Str = convertMsToString(time2);
		$('#' + timeDivId).html('Opens: ' + t1Str + '   Closes: ' + t2Str);
	} else if (flag === "anyTime") {
		$('#' + timeDivId).html('Suggested Time: Any Time');
	} else if (flag === "dayTime") {
		$('#' + timeDivId).html('Suggested Time: Day Time');
	} else if (flag === "nightTime") {
		$('#' + timeDivId).html('Suggested Time: Night Time');
	}
}

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
