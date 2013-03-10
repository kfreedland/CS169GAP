

$(document).ready(function() {
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
	var totalTime = 0;
	// Check that the time is not null
	if (time !== '') {
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
	}
	// Convert seconds to milliseconds and return
	return totalTime * 1000;
};

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
      	console.log("yay");
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