
function pullAndReturnData(type, callback) {	
	// Get the values from the form inputs
	// Check for name and description if type is 'create'
	if (type === 'create') {
		var name = $('#activity_name').val();
		var description = $('#activity_description').val();
	}
	var minPeople = $('#low_num_participants_' + type).val();
	var maxPeople = $('#high_num_participants_' + type).val();
	var minPrice = $('#min_price_' + type).val();
  	var maxPrice = $('#max_price_' + type).val();
    var beginDate = $('#begin_date_' + type).val();
    var endDate = $('#end_date_' + type).val();
    var flag = $("input[type='radio'][name='time_range_" + type + "']:checked").val();
    // Check for the selected time range option
    if (flag === 'startEnd') {
    	var startTime = $('#start_time_' + type).val();
    	var endTime = $('#end_time_' + type).val();
    	if (type === 'find') {
    		var duration = $('#duration_' + type).val();
    	}
    }
    var locationInput = $('#location_input_' + type).val();
    var distance = $('#distance_' + type).val();
    var category = $('#category_' + type).val();

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
			begindate: epochStartDate,
			enddate: epochEndDate,
			flag: flag,
			lowprice: minPrice,
			highprice: maxPrice,
			lownumparticipants: minPeople,
			highnumparticipants: maxPeople,
			distance: distance,
			latitude: lat,
			longitude: lng,
			category: category,
			errStatus: null
		};
		if (type === 'find') {
			data.duration = duration;
		} else if (type === 'create') {
			data.name = name;
			data.description = description;
		}
		callback(data);
	});
}

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
}

/*
  Find the address given longitude and latitude

  @param double lat - The latitude of the location
  @param double lng - The longitude of the location
  @param fn callback - Callback fn to be called with the found address
*/
function reverseGeocodeAddress(lat, lng, callback) {
	var geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(lat, lng);
	geocoder.geocode({
		"latLng": latlng
	}, function (results, status) {
		var address = '';
		if (status == google.maps.GeocoderStatus.OK) {
			address = results[0].formatted_address;
		}
		callback(address);
	});
}

/*
  Fill in the UI elements with new location data

  @param String address - The address of the location
  @param String addressDivId - The id of the div containing the form input to be updated
*/
function update_ui(address, addressDivId) {
  $(addressDivId).autocomplete("close");
  $(addressDivId).val(address);
}

/*
  Add the autocomplete feature to the location form input

  @param String type - The type of the location form input, whether it's for Find Activities or Create Activity
					   type vals - 'find' or 'create'  
*/
function autocomplete_init(type) {
	var input = document.getElementById('location_input_' + type);
    var autocomplete = new google.maps.places.Autocomplete(input);
}

/*
  Find the user's current position

  @param fn callback - Callback fn to be called with the found position
*/
function getCurrentPosition(callback) {
	var currentposition = new google.maps.LatLng(0.0, 0.0);
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition (function(pos) {
			reverseGeocodeAddress(pos.coords.latitude, pos.coords.longitude, function(address) {
				callback(address);
			});
		});
	} else {
		callback(currentposition);
	}
}

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
	if (data.lownumparticipants) {
		try {
			var lownumparticipants_int = parseInt(data.lownumparticipants);
			data.lownumparticipants = lownumparticipants_int;
		} catch(err) {
			errMsg = "Number of Participants is not valid, needs to be integer.";
		}
	}
	if (data.highnumparticipants) {
		try {
			var highnumparticipants_int = parseInt(data.highnumparticipants);
			data.highnumparticipants = highnumparticipants_int;
		} catch(err) {
			errMsg = "Number of Participants is not valid, needs to be integer.";
		}
	}
	if (data.low_price) {
		try {
			var lowprice_int = parseInt(data.lowprice);
			data.lowprice = lowprice_int;
		} catch(err) {
			errMsg = "Price Range is not valid, needs to be integer.";
		}
	}
	if (data.highprice) {
		try {
			var highprice_int = parseInt(data.highprice);
			data.highprice = highprice_int;
		} catch(err) {
			errMsg = "Price Range is not valid, needs to be integer.";
		}
	}
	data.errMsg = errMsg;
	callback(data);
}

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
}

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
}

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
	} else if (hours === 0) {
		hoursStr = '12';
	}
	// Add the '0' before the minutes if less than 10 minutes
	if (minutes < 10) {
		minutesStr = '0' + minutesStr;
	}

	// Create the string in the proper format HH:MM(AM/PM)
	var dateString = hoursStr + ':' + minutesStr + am_pm;
	return dateString;
}