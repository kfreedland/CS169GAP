#Iteration 2 - Front End - Selenium Testing

from selenium import selenium
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
import time


def create_event():
	#Min Partipants to 5
	find_activity_min_part = browser.find_element_by_id("low_num_participants_find")
	find_activity_min_part.clear()
	find_activity_min_part.send_keys("5")

	#Max Partipants to 15
	find_activity_max_part = browser.find_element_by_id("high_num_participants_find")
	find_activity_max_part.clear()
	find_activity_max_part.send_keys("15")

	#Click on text and let the calendar pop up
	find_activity_start_date = browser.find_element_by_id("begin_date_find")
	find_activity_start_date.click()
	find_activity_start_date.click()	#Something with JQuery that needs it to clicked twice
	time.sleep(1)		#Wait for calendar to load

	#Click on April 15th
	find_activity_start_calendar = browser.find_element_by_xpath("//div[contains(text(),'15')]")
	find_activity_start_calendar.click()
	time.sleep(.5)		#Wait for calendar to close

	#Click on text and let the calendar pop up
	find_activity_end_date = browser.find_element_by_id("end_date_find")
	find_activity_end_date.click()
	time.sleep(1)		#Wait for calendar to load

	#Click on April 15th
	find_activity_end_calendar = browser.find_element_by_xpath("//div[contains(text(),'15')]")
	find_activity_end_calendar.click()
	time.sleep(.5)		#Wait for calendar to close

	#Any time event
	find_activity_start_time = browser.find_element_by_id("radio-view-d-find")
	find_activity_start_time.click()
	#find_activity_start_time.click()	#Something with JQuery that needs it to clicked twice

	#Click to find activities
	find_activity_button_submit = browser.find_element_by_id("find_activity_button")
	find_activity_button_submit.click()
	time.sleep(1)		#let the search result load

	#Find the activity and click the first result
	result1 = browser.find_element_by_id("activity-participants-1")
	result1.click()
	time.sleep(1)		#let the details page load

	#Adds to My Event page
	add_to_my_event = browser.find_element_by_id("add-to-my-event-button")
	add_to_my_event.click()
	add_to_my_event.click()

	"""
	Now at modifying the event's page before add
	"""
	#Click on text and let the calendar pop up
	find_activity_start_date = browser.find_element_by_id("beginDate")
	find_activity_start_date.click()
	find_activity_start_date.click()		#Something with JQuery that needs it to clicked twice
	time.sleep(1)		#Wait for calendar to load

	#Click on April 15th
	begin_date_calendar = browser.find_element_by_xpath("//div[contains(text(),'3')]")
	begin_date_calendar.click()
	time.sleep(.5)		#Wait for calendar to close

	#Click on text and let the calendar pop up
	end_date_calendar = browser.find_element_by_id("endDate")
	end_date_calendar.click()
	time.sleep(1)		#Wait for calendar to load

	#Click on April 15th
	find_activity_end_calendar = browser.find_element_by_xpath("//div[contains(text(),'3')]")
	find_activity_end_calendar.click()
	time.sleep(.5)		#Wait for calendar to close

	friends_list = browser.find_element_by_id("invitedFriends")
	friends_list.send_keys("supahxazn@gmail.com")

	create_event_button = browser.find_element_by_id("createEventButton")
	create_event_button.click();



	print "All tests pass, you should be seeing a result page"

	#Wait for results. Assert that the proper results are in

def close():
	browser.close()


initialize()
login()
create_event()
close()