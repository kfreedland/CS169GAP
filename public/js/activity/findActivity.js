
$(document).ready(function() {
	/*
	  When the Find Activities button is clicked, send an ajax call to /activities/search with the form data
	*/

	//Initialize the date pickers
	setupFindActivityDatePickers();
	//Register change handlers to the date pickers
	//To change max/min dates of other field
	$('#begin_date_find').change(beginDateFindChanged);
	$('#end_date_find').change(endDateFindChanged);


	//Initialize the time pickers
	setupFindActivityTimePickers();
	//Register change handlers to the date pickers
	//To change max/min dates of other field
	$('#start_time_find').change(startTimeFindChanged);
	$('#end_time_find').change(endTimeFindChanged);


	$('#find_activity_button').click(function() {
		// Get the values from the form inputs
		pullAndReturnData('find', function(dataResp) {
			// Validate the dictionary object before sending it
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
        	$('#start_end_range_find').slideDown();
        } else {
        	$('#start_end_range_find').slideUp();
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
		$('#' + priceDivId).html('<b>Price Range:</b> Free');
	} else if (lowPrice === highPrice) {
		$('#' + priceDivId).html('<b>Price Range:</b> $' + lowPrice);
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
		$('#' + participantsDivId).html('<b>Number of Participants:</b> For 1 person');
	} else if (lowNumParticipants === highNumParticipants) {
		$('#' + participantsDivId).html('<b>Number of Participants:</b> For ' + lowNumParticipants + ' people');
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
		$('#' + timeDivId).html('<b>Suggested Time:</b> ' + t1Str + ' to ' + t2Str);
	} else if (flag === "openClose") {
		var t1Str = convertMsToString(time1);
		var t2Str = convertMsToString(time2);
		$('#' + timeDivId).html('<b>Opens:</b> ' + t1Str + '   <b>Closes:</b> ' + t2Str);
	} else if (flag === "anyTime") {
		$('#' + timeDivId).html('<b>Suggested Time:</b> Any Time');
	} else if (flag === "dayTime") {
		$('#' + timeDivId).html('<b>Suggested Time:</b> Day Time');
	} else if (flag === "nightTime") {
		$('#' + timeDivId).html('<b>Suggested Time:</b> Night Time');
	}
}

/*
  Function to handle the response from clicking on the 'Find Activities' button

  Take the JSON object from the AJAX response, hash it, and call the findActivity view with the hashed object

  @param Dict jsonResp - The JSON object returned from the AJAX call to Find Activities
*/
function handleFindActivityResponse(jsonResp) {
	var encodedData = window.btoa(JSON.stringify(jsonResp));
	window.location = '/activities/findActivity#' + encodedData;
}

function setupFindActivityDatePickers() {
	$('#begin_date_find').die("click tap");
	$('#begin_date_find').live("click tap", function() {
		$('#begin_date_find').mobiscroll('show'); 
        return false;
	});

	$('#begin_date_find').mobiscroll().date({
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'M D ddyy'
    });

    $('#end_date_find').die("click tap");
	$('#end_date_find').live("click tap", function() {
		$('#end_date_find').mobiscroll('show'); 
        return false;
	});

	$('#end_date_find').mobiscroll().date({
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'M D ddyy'
    });
}

function beginDateFindChanged() {
	//Set minDate for endDate
	var minDate = new Date($('#begin_date_find').val());
	var maxDate = $('#end_date_find').mobiscroll().date.maxDate;


	console.log("minDate = " + minDate);
	console.log("maxDate = " + maxDate);

	$('#end_date_find').mobiscroll().date({
        //invalid: { daysOfWeek: [0, 8] , daysOfMonth: ['5/1', '12/24', '12/25'] },
        minDate: minDate,
        maxDate: maxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'M D ddyy'
    });
}

function endDateFindChanged() {
	//Set maxDate for beginDate
	var minDate = $('#begin_date_find').mobiscroll().date.maxDate;
	var maxDate = new Date($('#end_date_find').val());


	console.log("minDate = " + minDate);
	console.log("maxDate = " + maxDate);

	$('#begin_date_find').mobiscroll().date({
        //invalid: { daysOfWeek: [0, 8] , daysOfMonth: ['5/1', '12/24', '12/25'] },
        minDate: minDate,
        maxDate: maxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'M D ddyy'
    });
}

function setupFindActivityTimePickers() {
	$('#start_time_find').die("click tap");
	$('#start_time_find').live("click tap", function() {
		$('#start_time_find').mobiscroll('show'); 
        return false;
	});

	$('#start_time_find').mobiscroll().time({
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        timeFormat: 'h:ii A',
        timeWheels: 'hhiiA'
    });

    $('#end_time_find').die("click tap");
	$('#end_time_find').live("click tap", function() {
		$('#end_time_find').mobiscroll('show'); 
        return false;
	});

	$('#end_time_find').mobiscroll().time({
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        timeFormat: 'h:ii A',
        timeWheels: 'hhiiA'
    });
}

function startTimeFindChanged() {
	//Set minDate for endDate
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1; //January is 0!

	var year = today.getFullYear();

	//Get selected time hours and minutes
	var index = $('#start_time_find').val().indexOf(':');
	var minutes = $('#start_time_find').val().substring(index+1, index+3);
	var hours = $('#start_time_find').val().substring(0, index);

	//If PM, add 12 hours
	if ($('#start_time_find').val().indexOf("PM") > 0){
		hours = parseInt(hours, 10) + 12;
	}

	//Set minDate for endTime
	var maxDate = $('#end_time_find').mobiscroll().time.maxTime;
	var minDate = new Date(year, month, day, hours, minutes, 0 /*seconds*/, 0 /*ms*/);

	console.log("minDate = " + minDate);
	console.log("maxDate = " + maxDate);

	$('#end_time_find').mobiscroll().time({
        minDate: minDate,
        maxDate: maxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        timeFormat: 'h:ii A',
        timeWheels: 'hhiiA'
    });
}

function endTimeFindChanged() {

	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1; //January is 0!

	var year = today.getFullYear();

	//Get selected time hours and minutes
	var index = $('#end_time_find').val().indexOf(':');
	var minutes = $('#end_time_find').val().substring(index+1, index+3);
	var hours = $('#end_time_find').val().substring(0, index);

	//If PM, add 12 hours
	if ($('#end_time_find').val().indexOf("PM") > 0){
		hours = parseInt(hours, 10) + 12;
	}

	//Set maxDate for startTime
	var maxDate = new Date(year, month, day, hours, minutes, 0 /*seconds*/, 0 /*ms*/);
	var minDate = $('#start_time_find').mobiscroll().time.maxTime;


	console.log("minDate = " + minDate);
	console.log("maxDate = " + maxDate);

	$('#start_time_find').mobiscroll().time({
        minDate: minDate,
        maxDate: maxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        timeFormat: 'h:ii A',
        timeWheels: 'hhiiA'
    });
}
