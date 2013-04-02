
$(document).ready(function() {
	var encodedDataStr = window.location.hash;
	// Remove the # in the front
	var encodedDataFixed = encodedDataStr.slice(1);
	
	var jsonData = $.parseJSON(window.atob(encodedDataFixed));
	handleActivityDetailResponse(jsonData);
});

function handleActivityDetailResponse(jsonData) {
	$('#activity-title').html(jsonData.name);
	$('#activity-description').html(jsonData.description);
	var numParticipantsStr = 'For ' + jsonData.lownumparticipants + ' to ' + jsonData.highnumparticipants + ' people'
	$('#activity-num-participants').html(numParticipantsStr);
	$('#activity-category').html(jsonData.category);
	var priceRangeStr = 'Price Range: $' + jsonData.lowprice + ' to $' + jsonData.highprice;
	$('#activity-price-range').html(priceRangeStr);
	
	// Do some additional fixing of the activity details
	fixPriceRange(parseInt(jsonData.lowprice), parseInt(jsonData.highprice), 'activity-price-range');
	fixParticipantsRange(parseInt(jsonData.lownumparticipants), parseInt(jsonData.highnumparticipants), 'activity-num-participants');
	addTimeRange(jsonData.flag, jsonData.time1, jsonData.time2, 'activity-time-range');

	// Calculate the address from the provided latitude and longitude, and insert it into the html
	reverseGeocodeAddress(jsonData.latitude, jsonData.longitude, function(address) {
		$("#activity-address").append('<span class="row-address-name">' + address + '</span>');
	});
}