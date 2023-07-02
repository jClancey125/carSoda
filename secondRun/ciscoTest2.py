from flask import Flask, render_template, request
from getpass import getpass
from netmiko import ConnectHandler



app = Flask(__name__)

login = None
password = None
host = None

@app.route('/',methods = ['POST', 'GET'])
def result():

   if request.method == 'POST':
      global host
      global login
      global password
      password = request.form['pass']
      username = request.form['user']
      host = request.form['host']



   return render_template("ciscoTest.html")


@app.route('/Ciscoresult', methods = ['POST', 'GET'])
def CiscoTest():
   routerJuan = ConnectHandler(
      device_type="cisco_ios",
      host=host,
      username=login,
      password=password,
   )

   # Creating variable command, and sending its value to the cisco routing using the connecthandler object we just made
   command = routerJuan.send_command("show  arp")

   return render_template('Ciscoresult.html', command = command)



if __name__ == '__main__':
   app.run('0.0.0.0', debug = True)

