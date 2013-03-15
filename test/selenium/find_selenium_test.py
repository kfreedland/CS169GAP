from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
import time

browser = webdriver.Firefox() # Get local session of firefox
browser.get("http://thawing-hamlet-4089.herokuapp.com/") # Load page
assert "Group Activity Planner" in browser.title

find_activity_min_part = browser.find_element_by_id("low_num_participants_find")
find_activity_min_part.clear()
find_activity_min_part.send_keys("5")

find_activity_max_part = browser.find_element_by_id("high_num_participants_find")
find_activity_max_part.clear()
find_activity_max_part.send_keys("15")

find_activity_start_date = browser.find_element_by_id("begin_date_find")
find_activity_start_date.click()
find_activity_start_date.click()	#Something with JQuery that needs it to clicked twice
time.sleep(2)

find_activity_start_calendar = browser.find_element_by_xpath("//div[contains(text(),'15')]")
find_activity_start_calendar.click()
time.sleep(1)

find_activity_end_date = browser.find_element_by_id("end_date_find")
find_activity_end_date.click()
time.sleep(2)

find_activity_end_calendar = browser.find_element_by_xpath("//div[contains(text(),'15')]")
find_activity_end_calendar.click()

find_activity_start_time = browser.find_element_by_id("radio-view-d-find")
find_activity_start_time.click()
find_activity_start_time.click()	#Something with JQuery that needs it to clicked twice

#Click to find activities
find_activity_button_submit = browser.find_element_by_id("find_activity_button")
find_activity_button_submit.click()
find_activity_button_submit.click()		#Something with JQuery that needs it to clicked twice
time.sleep(5)

print "All tests pass, you should be seeing a result page"

#Wait for results. Assert that the proper results are in

browser.close()