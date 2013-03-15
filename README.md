CS169GAP
========
<h1>RUN CONFIGURATION</h1>
<b>Info needed to Run App:</b>
	<p>Latest version has facebook passport auth, need the following command:</p> 
	<p>sudo npm install passport-facebook</p>
	<p>Also need to create the database and tables: instructions found below</p>
	
	<p>To run the app on your local machine:</p>
	<p><tt>geddy</tt></p>
	<p>Visit <tt>localhost.com:4000</tt></p>

	<p>To visit our app online:</p>
	<p>Heroku URL: thawing-hamlet-4089.herokuapp.com</p>

	<p>Instructions on testing the code found below</p>

<h1> CHANGELOGS:</h1>

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

<ul> Response Message: </ul>

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


<h1> Testing </h1>

<h2> Selenium Automation UI Testing</h2>
<p>The Standalone .jar file is included in the project under /test/selenium. The python client is needed in order to run. So you will need python-pip, which you can install (e.g. on Ubutnu it's <tt>sudo apt-get install python-pip</tt>). Then run the command to install the selenium client with pip install -U selenium</p>

<p> Each file has all the imports needed, so to run, just run the python command with the file <tt>python testFile.py</tt></p>
<ul>
	<li>init.py is an example file that has some of API calls to make it work. As of right now the only browser that works is Firefox, so please have it installed</li>
	<li>find_selenium_test.py is the find activity test that looks for activities most closely resembling the search query: 5-15 people, On March 15th, and All Day event.</li>
	<li>create_selenium_test.py is the create activity test that creates a new activity</li>
</ul>