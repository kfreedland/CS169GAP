from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
import time

browser = webdriver.Firefox() # Get local session of firefox
browser.get("http://thawing-hamlet-4089.herokuapp.com/") # Load page
assert "Group Activity Planner" in browser.title
create_activity_button = browser.find_element_by_xpath("//a[contains(@href,'#create_activity_page')]") # Find the query box
create_activity_button.click()	#Something with JQuery that needs it to clicked twice
create_activity_button.click()
time.sleep(1) # Let the page load, will be added to the API

#Add Activity Name
activity_name = browser.find_element_by_id("activity_name")
assert activity_name != None
activity_name.send_keys("Selenium Testing Activity")

#Add Activity Description
activity_desc = browser.find_element_by_id("activity_description")
assert activity_desc != None
activity_desc.send_keys("This is the Selenium Testing Activity to test that creating an activity works")

#Num of Participants
create_activity_min_part = browser.find_element_by_id("low_num_participants_create")
create_activity_min_part.clear()
create_activity_min_part.send_keys("5")

create_activity_max_part = browser.find_element_by_id("high_num_participants_create")
create_activity_max_part.clear()
create_activity_max_part.send_keys("15")

#Start Date
create_activity_start_date = browser.find_element_by_id("begin_date_create")
create_activity_start_date.click()
time.sleep(2) 	#Let widget load

#On Calendar Widget Popup
create_activity_start_calendar = browser.find_element_by_xpath("//div[contains(text(),'18')]")
create_activity_start_calendar.click()
time.sleep(.5)	#Let widget close

#End Date
create_activity_start_date = browser.find_element_by_id("begin_date_create")
create_activity_start_date.click()
time.sleep(2)	#Let widget load

#On Calendar Widget Popup
create_activity_start_calendar = browser.find_element_by_xpath("//div[contains(text(),'19')]")
create_activity_start_calendar.click()

#What time of the Day
create_activity_start_time = browser.find_element_by_id("radio-view-d-create")
create_activity_start_time.click()	#Something with JQuery that needs it to clicked twice
create_activity_start_time.click()

#Click the Create Activity Button
create_activity_button_submit = browser.find_element_by_id("create_activity_button")
create_activity_button_submit.click()	#Something with JQuery that needs it to clicked twice
create_activity_button_submit.click()
time.sleep(2)

print "Activity Created!"

#Add asserts to make sure that the activity was created

browser.close()