
$(document).ready(function() {
	var encodedDataStr = window.location.hash;
	// Remove the # in the front
	var encodedDataFixed = encodedDataStr.slice(1);
	
	var jsonData = $.parseJSON(window.atob(encodedDataFixed));
	handleActivityDetailResponse(jsonData);
	addToMyEventButton(encodedDataFixed);
});

function handleActivityDetailResponse(jsonData) {
	$('#activity-title').html(jsonData.name);
	$('#activity-description').html('<b>Description:</b> ' + jsonData.description);
	var numParticipantsStr = 'For ' + jsonData.lownumparticipants + ' to ' + jsonData.highnumparticipants + ' people';
	$('#activity-num-participants').html(numParticipantsStr);
	$('#activity-category').html('<b>Category:</b> ' + jsonData.category);
	var priceRangeStr = '<b>Price Range:</b> $' + jsonData.lowprice + ' to $' + jsonData.highprice;
	$('#activity-price-range').html(priceRangeStr);
	
	// Do some additional fixing of the activity details
	fixPriceRange(parseInt(jsonData.lowprice), parseInt(jsonData.highprice), 'activity-price-range');
	fixParticipantsRange(parseInt(jsonData.lownumparticipants), parseInt(jsonData.highnumparticipants), 'activity-num-participants');
	addTimeRange(jsonData.flag, jsonData.time1, jsonData.time2, 'activity-time-range');

	// Calculate the address from the provided latitude and longitude, and insert it into the html
	reverseGeocodeAddress(jsonData.latitude, jsonData.longitude, function(address) {
		$("#activity-address").append('<span class="row-address-name"><b>Address:</b> ' + address + '</span>');
	});
}

// encodedData is the encoded json object
function addToMyEventButton(encodedData) {
	$('#add-to-my-event-button').click(function() {
		window.location = '/events/createnew#' + encodedData;
	});
}