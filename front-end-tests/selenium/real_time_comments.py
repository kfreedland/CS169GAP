from selenium import selenium
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
import time
from initialize import SeleniumTest 

def go_to_events(driver):
	my_account = driver.browser.find_element_by_xpath("//span[contains(@class,'full_name')]")
	my_account.click()
	time.sleep(1)

	first_event = driver.browser.find_element_by_id("event_current1")
	first_event.click()

def write_comment(driver):
	comment_box = driver.browser.find_element_by_id("commentTextarea")
	comment_box.send_keys("I love Selenium Testing, can you see this in real time?")

def submit_comment(driver):
	comment_button = driver.browser.find_element_by_id("addCommentButton")
	comment_button.click()

