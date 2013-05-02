$(document).ready(function () {
	//Hide error message
	$('#missingParams').hide();

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
      if (status.message = 'null time1') {
      	errMsg = 'Error: Null Start Time';
      } else if (status.message = 'null time2') {
      	errMsg = 'Error: Null End Time';
      }
      $('#missingParams').html(errMsg);
      $('#missingParams').show();
      $('body').scrollTop(0);
      //window.location = '/#create_activity_page?errCode=' + status.errCode;
    }
	// window.location = '/';
}
