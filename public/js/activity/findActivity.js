

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
			        	/*
			        	handleFindActivityResponse(respData);
			        	*/
			        	resp = {
			        		0: {
			        			name: 'Activity1',
			        			description: 'Activity1 Description located here.',
			        			time1: '',
			        			time2: '',
			        			flag: 'dayTime',
			        			low_price: '30',
			        			high_price: '50',
			        			low_num_participants: '5',
			        			high_num_participants: '10',
			        			latitude: '37.867417',
			        			longitude: '-122.260408',
			        			category: 'Sports'
			        		},
			        		1: {
			        			name: 'Activity2',
			        			description: 'Activity2 Description located here.',
			        			time1: '',
			        			time2: '',
			        			flag: 'nightTime',
			        			low_price: '0',
			        			high_price: '0',
			        			low_num_participants: '1',
			        			high_num_participants: '4',
			        			latitude: '37.867417',
			        			longitude: '-122.260408',
			        			category: 'Sports'
			        		},
			        		2: {
			        			name: 'Activity3',
			        			description: 'Activity3 Description located here.',
			        			time1: '43200000',
			        			time2: '46800000',
			        			flag: 'startEnd',
			        			low_price: '5',
			        			high_price: '5',
			        			low_num_participants: '3',
			        			high_num_participants: '3',
			        			latitude: '37.867417',
			        			longitude: '-122.260408',
			        			category: 'Food'
			        		}
			        	};
			        	handleFindActivityResponse(resp);
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
		var activityID = "activity-" + index;
		var activityPrice = 'activity-price-' + index;
		var activityParticipants = 'activity-participants-' + index;
		var activityTime = 'activity-time-' + index;

		// Append the html to the list_activities div
		$("#list_activities").append(
			'<div class="list-item" id="' + activityID + '">' +
			'<div class="row-title">' + index + '. ' + data.name + '</div>' +
			'<div class="row-category">' + data.category + '</div>' +
			'<div class="row-address" id="activity-address-' + index + '"></div>' +
			'<div class="row-price-range" id ="' + activityPrice + '">Price Range: $' + data.low_price + ' to $' + data.high_price + '</div>' +
			'<div class="row-num-participants" id="' + activityParticipants + '">For ' + data.low_num_participants + ' to ' + data.high_num_participants + ' people</div>' +
			'<div class="row-time-range" id="' + activityTime + '"></div>' +
			'<div class="row-description">' + data.description + '</div>' +
			'</div>'
		);

		// Do some additional fixing of the activity details
		fixPriceRange(parseInt(data.low_price), parseInt(data.high_price), activityPrice);
		fixParticipantsRange(parseInt(data.low_num_participants), parseInt(data.high_num_participants), activityParticipants);
		addTimeRange(data.flag, data.time1, data.time2, activityTime);

		// Calculate the address from the provided latitude and longitude, and insert it into the html
		var latlng = new google.maps.LatLng(data.latitude, data.longitude);
		geocoder.geocode({
			"latLng": latlng
		}, function (results, status) {
			var address = '';
			if (status == google.maps.GeocoderStatus.OK) {
				address = results[0].formatted_address;
			}
			$("#activity-address-" + index).append('<span class="row-address-name">' + address + '</span>');
		});
	});
}
