$(document).ready(function () {	

	$('#list_activities_container').hide();

	//Hide error message
	$('#missingParams').hide();



	//Initialize the date pickers
	setupCreateActivityDatePickers();
	//Register change handlers to the date pickers
	//To change max/min dates of other field
	$('#begin_date_create').change(beginDateCreateChanged);
	$('#end_date_create').change(endDateCreateChanged);

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
				if (validData.errMsg !== undefined) {
					$('#missingParams').html(validData.errMsg);
					$('#missingParams').show();
					$('body').scrollTop(0);
				} else {
					$.ajax({
				        type: 'POST',
				        url: '/activities/create',
				        data: JSON.stringify(dataResp),
				        contentType: "application/json",
				        dataType: "json",
				        success: function(respData) {
				        	console.log('Successful Create Activity Call');
				        	console.log(respData);
				        	
				        	handleCreateActivityResponse(respData);
				        },
				        failure: function(err) {
				        	console.log('Failure');
				        }
				    });
				}
			});
		});
	    return false;
	});

	/*
	  Show or hide the time range options depending on which radio button is active
	*/
	$('input:radio[name="time_range_create"]').change(function() {
    	if ($(this).val() === "startEnd") {
        	$('#start_end_range_create').slideDown();
        } else {
        	$('#start_end_range_create').slideUp();
        }
	});

	autocomplete_init('create');

	var currentPosition = getCurrentPosition(function(pos) {
		$("#loc_link_create").click(function() {
			$("#location_input_create").val(pos);
		});
	});
});


/*
  Function to handle the response from clicking on the 'Create Activity' button

  Return back to the original form and display the status message

  @param String status - The status message to be shown to the user
*/
function handleCreateActivityResponse(status) {
	if (status.errCode === 1){
      window.location = '/?methodType=createActivity&errCode=' + status.errCode;
    } else if (status.errCode === 6){
      //missing required parameter
      var errMsg = 'Error: ' + status.message;
      if (status.message == 'null time1') {
      	errMsg = 'Error: Null Start Time';
      } else if (status.message == 'null time2') {
      	errMsg = 'Error: Null End Time';
      }
      $('#missingParams').html(errMsg);
      $('#missingParams').show();
      $('body').scrollTop(0);
      //window.location = '/#create_activity_page?errCode=' + status.errCode;
    }
	// window.location = '/';
}


function setupCreateActivityDatePickers() {
	$('#begin_date_create').die("click tap");
	$('#begin_date_create').live("click tap", function() {
		$('#begin_date_create').mobiscroll('show'); 
        return false;
	});

	$('#begin_date_create').mobiscroll().date({
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'M D ddyy'
    });

    $('#end_date_create').die("click tap");
	$('#end_date_create').live("click tap", function() {
		$('#end_date_create').mobiscroll('show'); 
        return false;
	});

	$('#end_date_create').mobiscroll().date({
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'M D ddyy'
    });
}

function beginDateCreateChanged() {
	//Set minDate for endDate
	var minDate = new Date($('#begin_date_create').val());
	var maxDate = $('#end_date_create').mobiscroll().date.maxDate;


	console.log("minDate = " + minDate);
	console.log("maxDate = " + maxDate);

	$('#end_date_create').mobiscroll().date({
        //invalid: { daysOfWeek: [0, 8] , daysOfMonth: ['5/1', '12/24', '12/25'] },
        minDate: minDate,
        maxDate: maxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'M D ddyy'
    });
}

function endDateCreateChanged() {
	//Set maxDate for beginDate
	var minDate = $('#begin_date_create').mobiscroll().date.maxDate;
	var maxDate = new Date($('#end_date_create').val());


	console.log("minDate = " + minDate);
	console.log("maxDate = " + maxDate);

	$('#begin_date_create').mobiscroll().date({
        //invalid: { daysOfWeek: [0, 8] , daysOfMonth: ['5/1', '12/24', '12/25'] },
        minDate: minDate,
        maxDate: maxDate,
        theme: 'ios',
        display: 'bottom',
        mode: 'scroller',
        dateOrder: 'M D ddyy'
    });

}
