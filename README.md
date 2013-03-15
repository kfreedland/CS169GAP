CS169GAP
========
<h1>RUN CONFIGURATION</h1>
<b>Info needed to Run App:</b>
	<p>Latest version has facebook passport auth:</p> 
	<p>sudo npm install passport-facebook</p>
	<p>Heroku URL: thawing-hamlet-4089.herokuapp.com</p>


<h1> CHANGELOGS:</h1>

<b>Changelog Entry 4:</b>
	//Changing all Activities parameters to CamelCase

<b>Changelog Entry 3:</b>
	//errCode
	<p>7 - Backend Error</p>

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
	<ul>
		<li>200 - Success</li>
		<li>500 - Internal Server Error</li>
		<li>401 - Unauthorized</li>
		<li>404 - Not Found</li>
	</ul>
<b>errCode:</b>
	<ul>
		<li>1 - Success (for all API)</li>
		<li>2 - User Exists (for Create User)</li>
		<li>3 - Username Too Long / Empty (for Create User)</li>
		<li>4 - Password Too Long / Empty (for Create User)</li>
		<li>5 - Auth Failed (for Login)</li>
		<li>6 - Missing Required Parameter (for Create/Find Activity)</li>
		<li>7 - Backend Error - Probably retry</li>
	</ul>

<h2>CREATE ACTIVITY:</h2>
//Creates activity in database with corresponding fields

<h3>Params: </h3>
<ul>
	{
		<li>'name': [string, required],</li>
		<li>'description': [string],</li>
		<li>'time1': [int milliseconds since midnight, required-IF flag=='start_end' || flag=='open_close'],</li>
		<li>'time2': [int, milliseconds since midnight, required-IF flag=='start_end' || flag=='open_close'],</li>
		<li>'flag': [string subset of: {'start_end', 'open_close', 'any_time', 'day_time', 'night_time'}, required],</li>
		<li>'begin_date': [milliseconds since epoch, int],</li>
		<li>'end_date': [milliseconds since epoch, int],</li>
		<li>'low_price': [int, required],</li>
		<li>'high_price': [int, required],</li>
		<li>'low_num_participants': [int],</li>
		<li>'high_num_participants': [int],</li>
		<li>'latitude': [number],</li>
		<li>'longitude': [number],</li>
		<li>'category': [string]</li>
	}
</ul>

<ul> Response Message: </ul>

<h2> Queries for Database Setup </h2>
CREATE TABLE users (
	username text,
	email text,
	password text,
	family_name text,
	given_name text,
	created_at timestamptz,
	updated_at timestamptz,
	id text
);

CREATE TABLE passports (
	auth_type text,
	key text,
	user_id text,
	created_at timestamptz,
	updated_at timestamptz,
	id text
);

CREATE TABLE activities (
	name text,
	description text,
	time1 float8,
	time2 float8,
	flag text,
	lowPrice float8,
	highPrice float8,
	beginDate float8,
	endDate float8,
	lowNumParticipants float8,
	highNumParticipants float8,
	latitude float8,
	longitude float8,
	category text,
	created_at timestamptz,
	updated_at timestamptz,
	id text
);