from flask import Flask
app = Flask(__name__)

@app.route('/hello/<name>')
def hello_name(name):
   return 'Hello %s!' % name

@app.route('/guru/<float:drinksNUM>')
def show_butt(drinksNUM):
	return 'Guru Drank %f drinks' % drinksNUM

@app.route('/jon/<int:baddieNUM>')
def show_bodyCount(baddieNUM):
	return "Jon's body count is %d" % baddieNUM




if __name__ == '__main__':
   app.run('0.0.0.0', debug = True)
