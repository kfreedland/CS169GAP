

$(document).ready(function() {

	$('#list_activities_container').hide();
	/*
	  When the Find Activities button is clicked, send an ajax call to /activities/search with the form data
	*/
	$('#find_activity_button').click(function() {
		// Get the values from the form inputs
		var minPeople = $('#low_num_participants').val();
		var maxPeople = $('#high_num_participants').val();
		var minPrice = $('#min_price').val();
      	var maxPrice = $('#max_price').val();
	    var beginDate = $('#begin_date').val();
	    var endDate = $('#end_date').val();
	    var flag = $("input[type='radio'][name='time_range']:checked").val();
	    // Check for the selected time range option
	    if (flag === 'start_end') {
	    	var startTime = $('#start_time').val();
	    	var endTime = $('#end_time').val();
	    	var duration = $('#duration').val();
	    }
	    var locationInput = $('#location_input').val();
	    var distance = $('#distance').val();
	    var category = $('#category').val();

	    // Convert the dates and times to milliseconds
		var epochStartDate = convertDateToEpoch(beginDate);
		var epochEndDate = convertDateToEpoch(endDate);
		var time1 = findMsFromMidnight(startTime);
		var time2 = findMsFromMidnight(endTime);

		// Calculate the longitude and latitude from the address
		geocodeAddress(locationInput, function(loc) {
			var lat;
			var lng;
			if (loc && loc.status === "OK") {
				lat = loc.lat;
				lng = loc.lng;
			}
			// Create the dictionary containing all the input form values
			var data = {
				time1: time1,
				time2: time2,
				duration: duration,
				begin_date: epochStartDate,
				end_date: epochEndDate,
				flag: flag,
				low_price: minPrice,
				high_price: maxPrice,
				low_num_participants: minPeople,
				high_num_participants: maxPeople,
				distance: distance,
				latitude: lat,
				longitude: lng,
				category: category,
				errStatus: null
			};
			// Validate the dictionary object before sending it
			// TODO: Write the success and failure functions
			validateData(data, function(validData) {
				$.ajax({
			        type: 'GET',
			        url: '/activities/search',
			        data: JSON.stringify(data),
			        contentType: "application/json",
			        dataType: "json",
			        success: function(respData) {
			        	console.log('Success');
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
	$('input:radio[name="time_range"]').change(function() {
    	if ($(this).val() === "start_end") {
        	$('#start_end_range').show();
        } else {
        	$('#start_end_range').hide();
        }
	});
});

/*
  Find the longitude and latitude given an address

  @param String address - String of the address to have its latitude and longitude calculated
  @param fn callback - Callback fn to be called with the dictionary {lat: latValue, lng: lngValue, status: 'OK/ERR'}
*/
function geocodeAddress(address, callback) {
	var geocoder = new google.maps.Geocoder();
	var latlng;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      	// Calculate the latitude and longitude
      	lat = results[0].geometry.location.lat();
      	lng = results[0].geometry.location.lng();
      	// Create a JSON object with the latitude and longitutde
      	latlng = {lat: lat, lng: lng, status: 'OK'};
      } else {
      	// Return error
        latlng = {status: 'ERR'};
      }
      callback(latlng);
    });
};

/*
  Validate that the data in the dictionary. Convert the string values to integers for specific fields.

  @param Dictionary data - The dictionary containing all the form values
  @param fn callback - Callback fn to be called with the converted values of the dictionary
*/
function validateData(data, callback) {
	var errMsg;
	if (data.distance) {
		try {
			var dist_int = parseInt(data.distance);
			data.distance = dist_int;
		} catch(err) {
			errMsg = "Distance is not valid, needs to be integer.";
		}
	}
	if (data.duration) {
		try {
			var duration_int = parseInt(data.duration);
			data.duration = duration_int;
		} catch(err) {
			errMsg = "Duration is not valid, needs to be integer.";
		}
	}
	if (data.low_num_participants) {
		try {
			var low_num_participants_int = parseInt(data.low_num_participants);
			data.low_num_participants = low_num_participants_int;
		} catch(err) {
			errMsg = "Number of Participants is not valid, needs to be integer.";
		}
	}
	if (data.high_num_participants) {
		try {
			var high_num_participants_int = parseInt(data.high_num_participants);
			data.high_num_participants = high_num_participants_int;
		} catch(err) {
			errMsg = "Number of Participants is not valid, needs to be integer.";
		}
	}
	if (data.low_price) {
		try {
			var low_price_int = parseInt(data.low_price);
			data.low_price = low_price_int;
		} catch(err) {
			errMsg = "Price Range is not valid, needs to be integer.";
		}
	}
	if (data.high_price) {
		try {
			var high_price_int = parseInt(data.high_price);
			data.high_price = high_price_int;
		} catch(err) {
			errMsg = "Price Range is not valid, needs to be integer.";
		}
	}
	data.errMsg = errMsg;
	callback(data);
};

/*
  Function to handle the response from clicking on the 'Find Activities' button

  Take the JSON object from the AJAX response and populate the html with the list of suggested activities.

  @param Dict jsonResp - The JSON object returned from the AJAX call to Find Activities
*/
function handleFindActivityResponse(jsonResp) {
	// Hide the find activities form and show the suggested activities list
	$('#find_activity').hide();
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
};

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
};

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
};

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
};

/*********************************************
	Helper Time Functions
*********************************************/

/*
  Convert a date string to epoch time in milliseconds

  @param String date - String of the date to be converted
  @return int epoch - Integer value of the epoch time in milliseconds
*/
function convertDateToEpoch(date) {
	var newDate = new Date(date);
	var epoch = newDate.getTime();
	return epoch;
};

/*
  Convert a time string to milliseconds passed since midnight

  @param String time - String of the time to be converted
  @return int totalTime - Integer value of the milliseconds passed since midnight
*/
function findMsFromMidnight(time) {
	// Variable for the total amount of time from midnight
	var totalTime;
	// Check that the time is not null
	if (time && time !== '') {
		totalTime = 0;
		// Time should be in HH:MM AM/PM format
		// splitTime will split it into [HH, MM AM/PM]
		var splitTime = time.split(':');
		// Add on the amount of seconds from the hour
		totalTime += parseInt(splitTime[0]) * 3600;
		// Split the time into [MM, AM/PM]
		var splitMinute = splitTime[1].split(' ');
		// Add on the amount of seconds from the minute
		totalTime += parseInt(splitMinute[0]) * 60;
		// Check if the time is in PM
		if (splitMinute[1] === "PM") {
			// Check that it is not 12 PM
			if (splitTime[0] !== "12") {
				// Add on 12 hours in seconds = 43200 seconds
				totalTime += 43200;
			}
		} else {
			// Check for 12 AM
			if (splitTime[0] === "12") {
				// Remove the 12 hours in seconds added on in the beginning
				totalTime -= 43200;
			}
		}
		// Convert seconds to milliseconds
		totalTime = totalTime * 1000;
	}
	return totalTime;
};

/*
  Convert the time in milliseconds to a time string

  @param int time - Time in milliseconds from midnight to be converted to a string
  @return String dateString - String value of the time in milliseconds, format is HH:MM(AM/PM)
*/
function convertMsToString(time) {
	// Create a Date object with that time as the milliseconds
	var d = new Date(0,0,0,0,0,0,time);
	var hours = d.getHours();
	var hoursStr = hours.toString();
	var minutes = d.getMinutes();
	var minutesStr = minutes.toString();
	var am_pm = 'AM';

	// Change from 24-hr clock time to 12-hr clock time
	if (hours === 12) {
		am_pm = 'PM';
	} else if (hours > 12) {
		hours = hours % 12;
		am_pm = 'PM';
		hoursStr = hours.toString();
	}
	// Add the '0' before the minutes if less than 10 minutes
	if (minutes < 10) {
		minutesStr = '0' + minutesStr;
	}

	// Create the string in the proper format HH:MM(AM/PM)
	var dateString = hoursStr + ':' + minutesStr + am_pm;
	return dateString;
}

//Login Page
function facebookClicked(event) {
  	event.preventDefault();
	//var url = document.location.protocol + window.location.host + $('.btn-facebook').attr('href');
	var url = $('.btn-facebook').attr('href');
	$(location).attr('href', url);
	// $(href + $('.btn-facebook').attr('href') ).show();
    return false;
}