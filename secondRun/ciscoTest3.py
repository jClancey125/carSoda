from flask import Flask, render_template, request
from getpass import getpass
from netmiko import ConnectHandler



app = Flask(__name__)

class DataStore():
   login = None
   password = None
   host = None

data = DataStore()

@app.route('/')
def result():
   password = request.form['pass']
   username = request.form['user']
   data.host = request.form['host']
   data.host = host
   data.login = username
   data.password = password









   return render_template("ciscoTest.html")



@app.route('/Ciscoresult',methods = ['POST'])
def CiscoTest():

   routerJuan = ConnectHandler(
      device_type="cisco_ios",
      host=data.host,
      username=data.login,
      password=data.password,
   )

   # Creating variable command, and sending its value to the cisco routing using the connecthandler object we just made
   command = routerJuan.send_command("show  arp")

   return render_template('Ciscoresult.html', command = command)



if __name__ == '__main__':
   app.run('0.0.0.0', debug = True)




