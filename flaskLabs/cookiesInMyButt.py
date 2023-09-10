
from flask import Flask, render_template, request, make_response
app = Flask(__name__)

@app.route('/')
def index():
   return render_template("index.html")

@app.route('/setcookie', methods = ['POST', 'GET'])
def setcookie():
	if request.method == 'POST':
		user = request.form['nm']

		resp = make_response(render_template('readcookie.html'))
		resp.set_cookie('userID', user)

	return resp



#if __name__ == '__main__':
app.run('0.0.0.0', debug = True)

