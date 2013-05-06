"""
Iteration 4
Test Real-Time comments appearing from a second user
"""

from selenium import selenium
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
import time
from initialize import SeleniumTest
import real_time_comments

se_test1 = SeleniumTest()
se_test1.initialize("http://gap3.herokuapp.com")
se_test1.login("superuser")
time.sleep(.5)

se_test2 = SeleniumTest()
se_test2.initialize("http://gap3.herokuapp.com")
se_test2.login("asdf")
time.sleep(.5)
time.sleep(5)

real_time_comments.go_to_events(se_test1)
real_time_comments.write_comment(se_test1)
time.sleep(5)
real_time_comments.submit_comment(se_test1)
se_test1.browser.close()

real_time_comments.go_to_events(se_test2)