
$(document).ready(function() {
	var encodedDataStr = window.location.hash;
	// Remove the # in the front
	var encodedDataFixed = encodedDataStr.slice(1);
	
	var jsonData = $.parseJSON(window.atob(encodedDataFixed));
	handleEventDetailResponse(jsonData);
});

function handleEventDetailResponse(jsonData) {
	$('#event-title').html(jsonData.name);
	$('#event-description').html(jsonData.description);
	var numParticipantsStr = 'For ' + jsonData.lownumparticipants + ' to ' + jsonData.highnumparticipants + ' people';
	$('#event-num-participants').html(numParticipantsStr);
	$('#event-category').html('Category: ' + jsonData.category);
	var priceRangeStr = 'Price Range: $' + jsonData.lowprice + ' to $' + jsonData.highprice;
	$('#event-price-range').html(priceRangeStr);
	
	// Do some additional fixing of the event details
	fixPriceRange(parseInt(jsonData.lowprice), parseInt(jsonData.highprice), 'event-price-range');
	fixParticipantsRange(parseInt(jsonData.lownumparticipants), parseInt(jsonData.highnumparticipants), 'event-num-participants');
	addTimeRange(jsonData.flag, jsonData.time1, jsonData.time2, 'event-time-range');

	// Calculate the address from the provided latitude and longitude, and insert it into the html
	reverseGeocodeAddress(jsonData.latitude, jsonData.longitude, function(address) {
		$("#event-address").append('<span class="row-address-name">' + address + '</span>');
	});
}
