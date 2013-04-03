$(document).ready(function() {
	var encodedDataStr = window.location.hash;
	// Remove the # in the front
	var encodedDataFixed = encodedDataStr.slice(1);
	var jsonData = $.parseJSON(window.atob(encodedDataFixed));
	console.log(jsonData);

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

	// Calculate the address from the provided latitude and longitude, and insert it into the html
	reverseGeocodeAddress(jsonData.latitude, jsonData.longitude, function(address) {
		$("#address").append('<div data-role="fieldcontain"><label for="name">Text Input:</label><input type="text" name="address" id="addressReadOnly" value=""  /></div>	

		$("#address").append('<span class="row-address-name"> Address: ' + address + '</span>');
	});


});