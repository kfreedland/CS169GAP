CS169GAP
========
Info needed to Run App:
	Latest version has facebook passport auth: 
	sudo npm install passport-facebook
	Heroku URL: thawing-hamlet-4089.herokuapp.com

Changelog Entry 1:
	//required fields that the client checks is valid
    queryInfo.flag = params.flag;
    queryInfo.begin_date = params.begin_date;
    queryInfo.end_date = params.end_date;
    queryInfo.latitude = params.latitude;
    queryInfo.longitude = params.longitude;

Changelog Entry 0:
	//ActivityModel Fields:
	Name: string
	Description: string
	time1: time
	time2: time
	flag: string -vals=startEnd, openClose, anyTime, dayTime, nightTime
	begin_date: date
	end_date: date
	low_price: int
	high_price: int
	low_num_participants: int
	high_num_participants: int
	latitude: number
	longitude: number