$(document).ready(function() {
	$('#createEvent').hide();

	var encodedDataStr = window.location.hash;
	// Remove the # in the front
	var encodedDataFixed = encodedDataStr.slice(1);
	var jsonData = $.parseJSON(window.atob(encodedDataFixed));

	console.log("EVENT ID IS " + jsonData.id);

	var name = jsonData.name;
	var desc = jsonData.description;
	var date1 = jsonData.begindate;
	var date2 = jsonData.enddate;
	var time1 = jsonData.time1;
	var time2 = jsonData.time2;
	var flag = jsonData.flag;
	var longitude = jsonData.longitude;
	var latitude = jsonData.latitude;
	var lowprice = jsonData.lowprice;
	var highprice = jsonData.highprice;
	var highpart = jsonData.highnumparticipants;
	var lowpart = jsonData.lownumparticipants;
	var category = jsonData.category;
	var id = jsonData.id;

	// Calculate the address from the provided latitude and longitude, and insert it into the html
	reverseGeocodeAddress(jsonData.latitude, jsonData.longitude, function(address) {
		$("#addressReadOnly").val(address);
	});

	$('#name').val(name);
	$('#activityDescription').val(desc);

	if (time1 != null && time2 != null) {
		console.log(time1 + "time2 is " + time2);
		var correctedTime1 = convertMsToString(time1);
		var correctedTime2 = convertMsToString(time2);
		$('#startTimeEvent').val(correctedTime1);
		$('#endTimeEvent').val(correctedTime2);
	}

	$('#minPrice').val(lowprice);
	$('#maxPrice').val(highprice);
	$('#lowNumPart').val(lowpart);
	$('#highNumPart').val(highpart);
	$('#category').val(category);


	//Setup date picker
	setupCreateEventDatePickers(date1, date2);

	//Register change handlers to the date pickers
	//To change max/min dates of other field
	$('#beginDate').change(beginDateCreateEventChanged);
	$('#endDate').change(endDateCreateEventChanged);


	//Setup time picker
	setupCreateEventTimePickers(date1, date2);

	//Register change handlers to the time pickers
	//To change max/min dates of other field
	$('#startTimeEvent').change(startTimeCreateEventChanged);
	$('#endTimeEvent').change(endTimeCreateEventChanged);

	createEvent(id);
});

function createEvent(activityId) {
	$('#createEventButton').click(function() {
		// Create JSON Dict for event data
		var eventData = {};

		var beginDate = $('#beginDate').val();
		var endDate = $('#endDate').val();
		var startTime = $('#startTimeEvent').val();
		var endTime = $('#endTimeEvent').val();
	    // Convert the dates and times to milliseconds
		var epochStartDate = convertDateToEpoch(beginDate);
		var epochEndDate = convertDateToEpoch(endDate);
		var time1 = findMsFromMidnight(startTime);
		var time2 = findMsFromMidnight(endTime);
		if (isNaN(epochStartDate)) {
			$('#eventError').html('Invalid Start Date');
			$('#eventError').show();
			$('body').scrollTop(0);
		} else if (isNaN(epochEndDate)) {
			$('#eventError').html('Invalid End Date');
			$('#eventError').show();
			$('body').scrollTop(0);
		} else if (time1 === undefined) {
			$('#eventError').html('Start Time is Null');
			$('#eventError').show();
			$('body').scrollTop(0);
		} else if (time2 === undefined) {
			$('#eventError').html('End Time is Null');
			$('#eventError').show();
			$('body').scrollTop(0);
		} else {
			$.mobile.loading( 'show' , {
				text: 'Creating Event',
				textVisible: true,
				theme: 'a'
			});
			eventData.name = $('#name').val();
			eventData.activityid = activityId;
			eventData.time1 = time1;
		    eventData.time2 = time2;
		    eventData.begindate = epochStartDate;
		    eventData.enddate = epochEndDate;
		    eventData.description = $('#activityDescription').val();

			var invitedFriends = $('#invitedFriends').val();
			eventData.attendingusers = invitedFriends;
			
			$.ajax({
		        type: 'POST',
		        url: '/events/create',
		        data: JSON.stringify(eventData),
		        contentType: "application/json",
		        dataType: "json",
		        success: function(respData) {
		        	console.log('Success');
		        	console.log(respData);
		        	window.location = '/events/myevents';
		        },
		        failure: function(err) {
		        	console.log('Failure');
		        }
		    });
		}
	});
}

function setupCreateEventDatePickers(activityStartDate, activityEndDate) {
	$('#beginDate').die("click tap");
	$('#beginDate').live("click tap", function() {
		$('#beginDate').mobiscroll('show'); 
        return false;
	});

	var minDate = null;
	var maxDate = null;

	if (activityStartDate){
		minDate = new Date(activityStartDate);//new Date(year, month, day, hours, minutes, seconds, milliseconds);
	}
	if (activityEndDate){
		maxDate = new Date(activityEndDate);//new Date(year, month, day, hours, minutes, seconds, milliseconds);
	}
	console.log("minDate = " + minDate);

	$('#beginDate').mobiscroll().date({
        //invalid: { daysOfWeek: [0, 8] , daysOfMonth: ['5/1', '12/24', '12/25'] },
        minDate: minDate,
        maxDate: maxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'M D ddyy'
    });


    //End Date
    $('#endDate').die("click tap");
	$('#endDate').live("click tap", function() {
		$('#endDate').mobiscroll('show'); 
        return false;
	});

	endMinDate = null;
	endMaxDate = null;

	if (activityStartDate){
		endMinDate = new Date(activityStartDate);//new Date(year, month, day, hours, minutes, seconds, milliseconds);
	}
	if (activityEndDate){
		endMaxDate = new Date(activityEndDate);//new Date(year, month, day, hours, minutes, seconds, milliseconds);
	}

	$('#endDate').mobiscroll().date({
        //invalid: { daysOfWeek: [0, 8] , daysOfMonth: ['5/1', '12/24', '12/25'] },
        minDate: endMinDate,
        maxDate: endMaxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'M D ddyy'
    });
}


function beginDateCreateEventChanged() {
	//Set minDate for endDate
	var minDate = new Date($('#beginDate').val());
	var maxDate = $('#endDate').mobiscroll().date.maxDate;


	console.log("minDate = " + minDate);
	console.log("maxDate = " + maxDate);

	$('#endDate').mobiscroll().date({
        //invalid: { daysOfWeek: [0, 8] , daysOfMonth: ['5/1', '12/24', '12/25'] },
        minDate: minDate,
        maxDate: maxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'M D ddyy'
    });
}

function endDateCreateEventChanged() {
	//Set maxDate for beginDate
	var minDate = $('#beginDate').mobiscroll().date.maxDate;
	var maxDate = new Date($('#endDate').val());


	console.log("minDate = " + minDate);
	console.log("maxDate = " + maxDate);

	$('#beginDate').mobiscroll().date({
        //invalid: { daysOfWeek: [0, 8] , daysOfMonth: ['5/1', '12/24', '12/25'] },
        minDate: minDate,
        maxDate: maxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'M D ddyy'
    });
}


function setupCreateEventTimePickers(activityStartDate, activityEndDate) {
	$('#startTimeEvent').die("click tap");
	$('#startTimeEvent').live("click tap", function() {
		$('#startTimeEvent').mobiscroll('show'); 
        return false;
	});

	var minDate = null;
	var maxDate = null;

	if (activityStartDate){
		minDate = new Date(activityStartDate);//new Date(year, month, day, hours, minutes, seconds, milliseconds);
	}
	if (activityEndDate){
		maxDate = new Date(activityEndDate);//new Date(year, month, day, hours, minutes, seconds, milliseconds);
	}
	console.log("minDate = " + minDate);

	$('#startTimeEvent').mobiscroll().time({
		minDate: minDate,
		maxDate: maxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        timeFormat: 'h:ii A',
        timeWheels: 'hhiiA'
    });

    $('#endTimeEvent').die("click tap");
	$('#endTimeEvent').live("click tap", function() {
		$('#endTimeEvent').mobiscroll('show'); 
        return false;
	});

	$('#endTimeEvent').mobiscroll().time({
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        timeFormat: 'h:ii A',
        timeWheels: 'hhiiA'
    });
}

function startTimeCreateEventChanged() {
	//Set minDate for endDate
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1; //January is 0!

	var year = today.getFullYear();

	//Get selected time hours and minutes
	var index = $('#startTimeEvent').val().indexOf(':');
	var minutes = $('#startTimeEvent').val().substring(index+1, index+3);
	var hours = $('#startTimeEvent').val().substring(0, index);

	//If PM, add 12 hours
	if ($('#startTimeEvent').val().indexOf("PM") > 0){
		hours = parseInt(hours, 10) + 12;
	}

	//Set minDate for endTime
	var maxDate = $('#endTimeEvent').mobiscroll().time.maxTime;
	var minDate = new Date(year, month, day, hours, minutes, 0 /*seconds*/, 0 /*ms*/);

	console.log("minDate = " + minDate);
	console.log("maxDate = " + maxDate);

	$('#endTimeEvent').mobiscroll().time({
        minDate: minDate,
        maxDate: maxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        timeFormat: 'h:ii A',
        timeWheels: 'hhiiA'
    });
}

function endTimeCreateEventChanged() {

	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1; //January is 0!

	var year = today.getFullYear();

	//Get selected time hours and minutes
	var index = $('#endTimeEvent').val().indexOf(':');
	var minutes = $('#endTimeEvent').val().substring(index+1, index+3);
	var hours = $('#endTimeEvent').val().substring(0, index);

	//If PM, add 12 hours
	if ($('#endTimeEvent').val().indexOf("PM") > 0){
		hours = parseInt(hours, 10) + 12;
	}

	//Set maxDate for startTime
	var maxDate = new Date(year, month, day, hours, minutes, 0 /*seconds*/, 0 /*ms*/);
	var minDate = $('#startTimeEvent').mobiscroll().time.maxTime;


	console.log("minDate = " + minDate);
	console.log("maxDate = " + maxDate);

	$('#startTimeEvent').mobiscroll().time({
        minDate: minDate,
        maxDate: maxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        timeFormat: 'h:ii A',
        timeWheels: 'hhiiA'
    });
}
