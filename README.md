CS169GAP
========
<h1>RUN CONFIGURATION<h1>
<b>Info needed to Run App:</b>
	<p>Latest version has facebook passport auth:</p> 
	<p>sudo npm install passport-facebook</p>
	<p>Heroku URL: thawing-hamlet-4089.herokuapp.com</p>

<h1> CHANGELOGS:<h1>
<b>Changelog Entry 1:</b>
	//required fields that the client checks is valid
    <p>flag</p>
    <p>begin_date</p>
    <p>end_date</p>
    <p>latitude</p>
    <p>longitude</p>

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

<h2>Params: {</h2>
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
		<li>'longitude': [number]</li>
	}
</ul>

Returns Response Code