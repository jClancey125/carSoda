from flask import Flask, redirect, url_for
app = Flask(__name__)  

@app.route('/admin')
def hello_world():
   return "Jons admin"

@app.route('/guest/<guest>')
def hello_guest(guest):
   return "Jons Dogs %s is a guest" % guest

@app.route('/user/<name>')
def hello_user(name):
	if name == 'admin':
		return redirect(url_for('hello_world'))
	else:
		return redirect(url_for('hello_guest' , guest = name))

if __name__ == '__main__':
   app.run('0.0.0.0', debug = 'true')

