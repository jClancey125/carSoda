from flask import Flask, render_template, request
from getpass import getpass
from netmiko import ConnectHandler


#still no 100% sure on this line, pretty sure it says this is main on the program
app = Flask(__name__)

#Creating DataStore object. This will be used to store data so it can be used
#between the two different functions result, and CiscoTest
class DataStore():
   login = None
   password = None
   host = None

#Creating a DataStore object called data
data = DataStore()


#app route for homepage, basically just hostname example google.com
@app.route('/')
#creating function called result my naming here is backwords
def result():
#This is using the jinja templating part of flask to return a page of ciscoTest.html
   return render_template("ciscoTest.html")


#app route for result page for example google.com/result
@app.route('/Ciscoresult',methods = ['POST'])
def CiscoTest():

#these three lines use Flask request module to get data input from the user on previous html 
#page ciscoTest.html, and stores them in local variables
   password = request.form['pass']
   username = request.form['user']
   host = request.form['host']
#storing local variable data in our data store class
   data.host = host
   data.login = username
   data.password = password

#Using netmiko to connect to Cisco IOS router, uses data. to access our variables
#stored within that object
   routerJuan = ConnectHandler(
      device_type="cisco_ios",
      host=data.host,
      username=data.login,
      password=data.password,
   )

   # Creating variable command, and sending its value to the cisco routing using the connecthandler object we just made
   command = routerJuan.send_command("show  arp")
#using templating to return html page ciscoResult and outputting command that we got from
#netmiko
   return render_template('ciscoResult.html', command = command)


#runs program 0.0.0.0 sets it to use web interface to run instead of local host
if __name__ == '__main__':
   app.run('0.0.0.0', debug = True)




