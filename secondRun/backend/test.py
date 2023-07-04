from flask import Flask

app = Flask(__name__)

@app.route('/test')
def my_profile():
    response_body = {
        "name": "Thomas",
        "about" :"James Cameron Exploerer of the Seas"
    }

    return response_body

if __name__ == '__main__':
   app.run('0.0.0.0', debug = True)
