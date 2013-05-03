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

real_time_comments.real_time_comments(se_test1)