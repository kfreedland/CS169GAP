CS169GAP
========
<h1>RUN CONFIGURATION</h1>
<b>Info needed to Run App:</b>
	<p>Latest version has facebook passport auth:</p> 
	<p>sudo npm install passport-facebook</p>
	<p>Heroku URL: thawing-hamlet-4089.herokuapp.com</p>


<h1> CHANGELOGS:</h1>

<b>Changelog Entry 2:</b>
	//ActivityModel Fields
	<ul>
		<li>Category: string</li>
	</ul>
<b>Changelog Entry 1:</b>
	//required fields that the client checks is valid
	<ul>
	    <li>flag</li>
	    <li>begin_date</li>
	    <li>end_date</li>
	    <li>latitude</li>
	    <li>longitude</li>
	</ul>

<b>Changelog Entry 0:</b>
	//ActivityModel Fields
	<ul>
		<li>Name: string</li>
		<li>Description: string</li>
		<li>time1: time</li>
		<li>time2: time</li>
		<li>flag: string -vals=startEnd, openClose, anyTime, dayTime, nightTime</p>
		<li>begin_date: date</li>
		<li>end_date: date</li>
		<li>low_price: int</li>
		<li>high_price: int</li>
		<li>low_num_participants: int</li>
		<li>high_num_participants: int</li>
		<li>latitude: number</li>
		<li>longitude: number</li>
		<li>category: string</li>
	</ul>

<h1>API:</h1>

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
</ul>

Returns Response Code