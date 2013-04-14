CS169GAP
========
<h1>RUN CONFIGURATION</h1>
<b>Info needed to Run App:</b>
	<p>Run the following commands to install all dependencies</p> 
	<p>sudo npm install</p>
	<p>sudo npm install -g</p>
	<p>Also need to create the database and tables: instructions found below</p>
	
	<p>To run the app on your local machine:</p>
	<p><tt>geddy</tt></p>
	<p>Visit <tt>localhost.com:4000</tt></p>

	<p>To visit our app online:</p>
	<p>Heroku URL: thawing-hamlet-4089.herokuapp.com</p>

	<p>Instructions on testing the code found below</p>

<h1> CHANGELOGS:</h1>

<b> Changelog Entry 14:</b>
	//Updated Real-Time Invite Notifications Spec in doc

<b>Changelog Entry 13:</b>
	//Updated getMyEvents API for past events

<b>Changelog Entry 12:</b>
	//Added Section for Running Socket.IO

<b>Changelog Entry 11:</b>
	//Added getActivityById Method to Activity

<b>Changelog Entry 10:</b>
	//Updated Run Configuration
	
<b>Changelog Entry 9:</b>
	//Added getMyEvents API 
	//Added response information for User API section

<b>Changelog Entry 8:</b>
	//Update Testing Information With Code Coverage

<b>Changelog Entry 7:</b>
	//Updated Header for JSON Object

<b>Changelog Entry 6:</b>
	//Added Selenium Automation tests

<b>Changelog Entry 5:</b> 
	//Added information on how to test locally

<b>Changelog Entry 4:</b>
	//Changing all Activities parameters to No Camel Case
	//Flag is camelCase

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
		<li>6 - Missing Required Parameter (for Create/Find Activity/Event)</li>
		<li>7 - Backend Error - Probably retry</li>
		<li>8 - Event dates/times are incorrect (begindate > enddate)</li>
		<li>9 - User/Activity specified to add to the event does not exist</li>
		<li>10 - EventID passed to backend does not correspond to a valid event </li>
		<li>11 - Event date/time is invalid </li>
		<li>12 - Atleast one email in the list of emails is malformed </li>
		<li>13 - Invite Email failed to send </li>
	</ul>

<h2> ACTIVITIES </h2>

<h6> GET ACTIVITY BY ID </h6>
//Gets an activity for the given id

<h3>Params: </h3>
<ul>
	{
		</li>'activityid': [string, required]</li>
	}
</ul>

<h3>Response </h3>
<ul>
	{
		<li>'errCode': [1 if success, 6 if missing activityid, 7 if database error] </li>
		<li>'activity': [JSON encoded Activity Model if errCode=1, null otherwise] </li>
	}
</ul>

<h6>CREATE ACTIVITY AND SEARCH FOR ACTIVITY:</h6>
//Creates activity in database with corresponding fields

<h3>Params: </h3>
<ul>
	{
		<li>'name': [string, required],</li>
		<li>'description': [string],</li>
		<li>'time1': [int milliseconds since midnight, required-IF flag=='startEnd' || flag=='openClose'],</li>
		<li>'time2': [int, milliseconds since midnight, required-IF flag=='startEnd' || flag=='openClose'],</li>
		<li>'flag': [string subset of: {'startEnd', 'openClose', 'anyTime', 'dayTime', 'nightTime'}, required],</li>
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

<h2> EVENTS </h2>

<h6><b>CREATE EVENT</b></h6>
//Creates an event and returns it with the corresponding fields
<h3>Params: </h3>
<ul>
	{
		<li>'name': [string],</li>
		<li>'description': [string],</li>
		<li>'time1': [int milliseconds since midnight],</li>
		<li>'time2': [int, milliseconds since midnight],</li>
		<li>'begindate': [milliseconds since epoch, int],</li>
		<li>'enddate': [milliseconds since epoch, int],</li>
		<li>'attendingusers': [CSV string of user ids],</li>
		<li>'activity':[activity recordID corresponding to this event]</li>
	}
</ul>

<h6><b>CHANGE DATE/TIME OF EVENT</b></h6>
//Changes the date and/or time of an event already made

<h3>URL: </h3> /events/changedatetime
<h3>Params: </h3>
<ul>
	{
		<li>'eventid': [string],</li>
		<li>'time1': [int milliseconds since midnight],</li>
		<li>'time2': [int, milliseconds since midnight],</li>
		<li>'begindate': [milliseconds since epoch, int],</li>
		<li>'enddate': [milliseconds since epoch, int]</li>	
	
	}

	only pass fields that are changed
</ul>


<h3>Response: </h3>
<ul>
	<li>'errCode': [1 = success, 6 = missing eventID or date/time parameters, 10 = invalid event, 11 = invalid date/times] </li>
	<li>'message': [string] more info about error</li>
</ul>


<h6><b>INVITE FRIENDS TO AN EVENT</b></h6>
//Sends email to emails provided

<h3>URL: </h3> /events/invite

<h3>Params: </h3>
<ul>
	{
		<li>'eventid': [string],</li>
		<li>'emails': [List of strings],</li>
		<li>'message': [String]</li>

	}
</ul>

<h3>Response: </h3>
<ul>
	<li>'errCode': [1 = success, 6 = missing eventID or email list parameters, 10 = invalid event, 12 = some emails were malformed, 13 = Invite email failed to send for whatever reason ] </li>
	<li>'bademails': [if errCode = 12, contains list of malformed emails, else null]</li>
	<li>'message': [string] further explains any error code </li>
</ul>

<h6><b>Get My Events</b></h6>
//Returns a list of events for the current user

<h3>URL: </h3> /events/getmyevents


<h3>Params: (there are no params)</h3>
<ul>
	{
	}
</ul>

<h3>Response: </h3>
<ul>
	<li>'errCode': [1 = success] </li>
	<li>'currentEvents': [Contains list of current events for the current user]</li>
	<li>'pastEvents': [Contains list of past events for the current user]</li>

	OR
	<li>Redirect to /login if User Not Authenticated</li>
</ul>



<h6><b>User</b></h6>
<h3>Params: </h3>
<ul>
	{
		<li>'userName': [string],</li>
		<li>'firstName': [string],</li>
		<li>'lastName': [string],</li>
		<li>'password': [string],</li>
		<li>'email': [string],</li>
		<li>'myevents': [CSV string of event ID's],</li>
	}
</ul>

<h3>Response </h3>
<ul>
	<li>'errCode': [1 = Success (for all API), 2 = User Exists (for Create User), 3 = Username Too Long / Empty (for Create User),
	<p>4 = Password Too Long / Empty (for Create User), 5 = Auth Failed (for Login), 7 = Backend Error - Probably retry</p>] </li>
</ul>

<h2> Testing Locally </h2>
Create a Postgres database locally on your machine with the following parameters:
   user: 'testing'
   database name: 'postgres'
   password: 'gap169'
   host: 'localhost'
   port: 5432

Then use the following to costruct the tables required to run GAP:

<h2> Queries for Database Setup </h2>
CREATE TABLE users (
	username text,
	email text,
	password text,
	family_name text,
	given_name text,
	created_at timestamptz,
	updated_at timestamptz,
	myevents text,
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
	category text,
	time1 float8,
	time2 float8,
	flag text,
	begindate float8,
	enddate float8,
	lowprice float8,
	highprice float8,
	lownumparticipants float8,
	highnumparticipants float8,
	latitude float8,
	longitude float8,
	duration float8,
	created_at timestamptz,
	updated_at timestamptz,
	id text
);

CREATE TABLE events (
	name text,
	description text,
	time1 float8,
	time2 float8,
	begindate float8,
	enddate float8,
	activityid text,
	attendingusers text,
	created_at timestamptz,
	updated_at timestamptz,
	id text
);

<h1> Testing </h1>

Running unit tests:
npm install -g
install postgres with the database configured like the above^^

<b>Install node-jscoverage</b>
Download node-jscoverage from here as ZIP: https://github.com/visionmedia/node-jscoverage
Extract zip folder to ./node_modules
cd ./node_models/node-jscoverage-master
./configure && make && make install

<b>Run Tests</b>
geddy jake test

<h2> Selenium Automation UI Testing</h2>
<p>The Standalone .jar file is included in the project under /test/selenium. The python client is needed in order to run. So you will need python-pip, which you can install (e.g. on Ubutnu it's <tt>sudo apt-get install python-pip</tt>). Then run the command to install the selenium client with pip install -U selenium</p>

<p> Each file has all the imports needed, so to run, just run the python command with the file <tt>python testFile.py</tt></p>
<ul>
	<li>init.py is an example file that has some of API calls to make it work. As of right now the only browser that works is Firefox, so please have it installed</li>
	<li>find_selenium_test.py is the find activity test that looks for activities most closely resembling the search query: 5-15 people, On March 15th, and All Day event.</li>
	<li>create_selenium_test.py is the create activity test that creates a new activity</li>
	<li>create_event_test.py is the create activity test that creates a new even from an existing activity</li>
</ul>


<b> Running Socket.IO </b>
FRONTEND
var href = document.location.protocol + document.location.hostname + ':8000';
console.log('href =' + href);
var socket = io.connect(href);
	socket.on('bobEvent', function (data) {
	console.log(data);
	socket.emit('bobReturn', { my: 'data' });
});
BACKEND
geddy.io = require('socket.io').listen(8000);
geddy.io.sockets.on('connection', function(socket) {

	socket.emit('bobEvent', {message:"This is a bob event."});

	socket.on('bobReturn', function (message){
          console.log("GOT BOB RETURN!!!");
    });
});


//Events For Invite
Every user will register/listen to an invite event with the following structure:
Event names: '{username}InviteEvent'

Backend will emit the event when that particular user is invited to a new event.
Frontend will listen to event and update the unseen notifications badge.

Event will contain the following information:
<h6><b>Event</b></h6>
<ul>
	{
		<li>'eventName': [string],</li>
		<li>'eventId': [string]</li>
	}
</ul>



