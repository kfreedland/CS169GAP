"""
OVERVIEW:

Selenium testing is used for front end self.browser automation

Methods:
find_element_by_id() - finds the object based on the id tag in the HTML
click() - clicks the object
send_keys() - inputs user-defined keys (e.g. 15, "bob", etc.)

"""

from selenium import selenium
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
import time


class SeleniumTest:
	def __init__(self):
		self.browser = None

	def initialize(self, url):
		self.browser = webdriver.Firefox() # Get local session of firefox
		self.browser.get(url) # Load page
		assert "Group Activity Planner" in self.browser.title

	"""
	LOGIN
	"""

	def login(self, loginname):
		#Clicking the login button
		login = self.browser.find_element_by_id("login_button")
		login.click()
		time.sleep(.5)

		#insert name into username
		usernameText = self.browser.find_element_by_name("username")
		usernameText.send_keys(loginname)

		#insert password into the field
		passwordText = self.browser.find_element_by_name("password")
		if (loginname == "superuser"):
			passwordText.send_keys("password")
		elif (loginname == "asdf"):
			passwordText.send_keys("asdfasdf")

		#Click the Submit Button
		loginSubmit = self.browser.find_element_by_id("loginSubmitButton")
		loginSubmit.click()
		loginSubmit.click()
		time.sleep(.5) #Let the self.browser log in
