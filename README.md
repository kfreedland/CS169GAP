CS169GAP
========
<b>Info needed to Run App:</b>
	<p>Latest version has facebook passport auth:</p> 
	<p>sudo npm install passport-facebook</p>
	<p>Heroku URL: thawing-hamlet-4089.herokuapp.com</p>

<b>Changelog Entry 1:</b>
	//required fields that the client checks is valid
    <p>queryInfo.flag = params.flag;</p>
    <p>queryInfo.begin_date = params.begin_date;</p>
    <p>queryInfo.end_date = params.end_date;</p>
    <p>queryInfo.latitude = params.latitude;</p>
    <p>queryInfo.longitude = params.longitude;</p>

<h1>API:<h1>

<b>Response Status Codes:<b>
	<p>200 - Success</p>
	<p>500 - Internal Server Error</p>
	<p>401 - Unauthorized</p>
	<p>404 - Not Found</p>

<b>errCodes:</b>
	<p>1 - Success</p>
	<p>2 - User Exists</p>
	<p>3 - Username Too Long / Empty</p>
	<p>4 - Password Too Long / Empty</p>


CREATE ACTIVITY:
//Creates activity in database with corresponding fields
Params: {
		'name': <string, required>,
		'description': <string>,
		'time1': <time, required-IF flag=='start_end' || flag=='open_close'>,
		'time2': <time, required-IF flag=='start_end' || flag=='open_close'>,
		'flag': <string subset of: ['start_end', 'open_close', 'any_time', 'day_time', 'night_time'], required>,
		'begin_date': <date>,
		'end_date': <date>,
		'low_price': <int, required>,
		'high_price': <int, required>,
		'low_num_participants': <int>,
		'high_num_participants': <int>,
		'latitude': <number>,
		'longitude': <number>
	}

Returns Response Code

<b>Changelog Entry 0:</b>
	//ActivityModel Fields
	<p>Name: string</p>
	<p>Description: string</p>
	<p>time1: time</p>
	<p>time2: time</p>
	<p>flag: string -vals=startEnd, openClose, anyTime, dayTime, nightTime</p>
	<p>begin_date: date</p>
	<p>end_date: date</p>
	<p>low_price: int</p>
	<p>high_price: int</p>
	<p>low_num_participants: int</p>
	<p>high_num_participants: int</p>
	<p>latitude: number</p>
	<p>longitude: number</p>
