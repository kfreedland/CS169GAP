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