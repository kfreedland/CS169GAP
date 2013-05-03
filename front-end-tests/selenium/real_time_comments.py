from selenium import selenium
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
import time
from initialize import SeleniumTest 

def real_time_comments(driver):
	my_account = driver.find_element_by_class("full_name")
	my_account.click()
