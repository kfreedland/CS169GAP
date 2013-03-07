CS169GAP
========
<b>Info needed to Run App:</b>
	<p>Latest version has facebook passport auth:</p> 
	<p>sudo npm install passport-facebook</p>
	<p>Heroku URL: thawing-hamlet-4089.herokuapp.com</p>

<b>Changelog Entry 2:</b>
	//ActivityModel Fields
	<p>Category: string</p>

<b>Changelog Entry 1:</b>
	//required fields that the client checks is valid
    <p>queryInfo.flag = params.flag;</p>
    <p>queryInfo.begin_date = params.begin_date;</p>
    <p>queryInfo.end_date = params.end_date;</p>
    <p>queryInfo.latitude = params.latitude;</p>
    <p>queryInfo.longitude = params.longitude;</p>

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
	<p>category: string</p>


<h1>API:<h1>

<b>Response Status Codes:<b>
	<p>200 - Success</p>
	<p>500 - Internal Server Error</p>
	<p>401 - Unauthorized</p>
	<p>404 - Not Found</p>

<b>errCode:</b>
	<p>1 - Success (for all API)</p>
	<p>2 - User Exists (for Create User)</p>
	<p>3 - Username Too Long / Empty (for Create User)</p>
	<p>4 - Password Too Long / Empty (for Create User)</p>
	<p>5 - Auth Failed (for Login)</p>
	<p>6 - Missing Required Parameter (for Create/Find Activity)</p>


<h2>CREATE ACTIVITY:</h2>
//Creates activity in database with corresponding fields

<h3>Params: </h3>
<ul>
	{
		<li>'name': [string, required],</li>
		<li>'description': [string],</li>
		<li>'time1': [time, required-IF flag=='start_end' || flag=='open_close'],</li>
		<li>'time2': [time, required-IF flag=='start_end' || flag=='open_close'],</li>
		<li>'flag': [string subset of: {'start_end', 'open_close', 'any_time', 'day_time', 'night_time'}, required],</li>
		<li>'begin_date': [date],</li>
		<li>'end_date': [date],</li>
		<li>'low_price': [int, required],</li>
		<li>'high_price': [int, required],</li>
		<li>'low_num_participants': [int],</li>
		<li>'high_num_participants': [int],</li>
		<li>'latitude': [number],</li>
		<li>'longitude': [number],</li>
		<li>'category': [string]</li>
	}
</ul>

Returns Response Code