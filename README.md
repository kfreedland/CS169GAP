CS169GAP
========

Heroku URL: thawing-hamlet-4089.herokuapp.com

API:

Response Status Codes:
200 - Success
500 - Internal Server Error
401 - Unauthorized
402 - Missing Parameters ?
404 - Not Found


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

