from flask import Flask, render_template
app = Flask(__name__)

@app.route('/hello/<int:score>')
def hello_name(score):
	return render_template('hello.html', dicks = score)

@app.route('/hello/')

def hello_ass():
	return render_template('hello.html', dicks = 60)

if __name__ == '__main__':
   app.run('0.0.0.0',debug = True)
