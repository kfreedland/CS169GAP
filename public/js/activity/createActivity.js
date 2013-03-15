

$(document).ready(function() {
	$('#list_activities_container').hide();
	/*
	  When the Create Activity button is clicked, send an ajax call to /activities/create with the form data
	*/
	$('#create_activity_button').click(function() {
		// Get the values from the form inputs
		pullAndReturnData('create', function(dataResp) {
			console.dir('DATA RESPONSE IS:' + JSON.stringify(dataResp));
			// Validate the dictionary object before sending it
			// TODO: Write the success and failure functions
			validateData(dataResp, function(validData) {
				$.ajax({
			        type: 'POST',
			        url: '/activities/create',
			        data: JSON.stringify(dataResp),
			        contentType: "application/json",
			        dataType: "json",
			        success: function(respData) {
			        	console.log('Successful Create Activity Call');
			        	console.log(respData);
			        	
			        	handleCreateActivityResponse('Success!');
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
	$('input:radio[name="time_range_create"]').change(function() {
    	if ($(this).val() === "start_end") {
        	$('#start_end_range_create').show();
        } else {
        	$('#start_end_range_create').hide();
        }
	});
});


/*
  Function to handle the response from clicking on the 'Create Activity' button

  Return back to the original form and display the status message

  @param String status - The status message to be shown to the user
*/
function handleCreateActivityResponse(status) {
	window.location = '/';
}

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
