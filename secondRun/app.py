from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #  comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from netmiko import ConnectHandler
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_login import LoginManager
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity,unset_jwt_cookies, jwt_required, JWTManager
import json
import pymongo
import sys
import requests


app = Flask(__name__)
login_manager = LoginManager()
limiter = Limiter(get_remote_address, app=app)
CORS(app)
app.config["JWT_SECRET_KEY"] = "BC1A585FE3FCBC67073378F71E9AD71820C073164096C440BD6F4CB41B687632"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

try:
    client = pymongo.MongoClient("mongodb+srv://Jawn:Koukiae86##@labcluster1.atopvbs.mongodb.net/?retryWrites=true&w=majority")

except pymongo.errors.ConfigurationError:
    print("Wrong creds")
    sys.exit(1)

dataBase = client.testUsers
userCollection = dataBase["testUsers"]

app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity)
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
            return response
    except (RuntimeError, KeyError):
        return response


@app.route("/singlecommand", methods=['GET', 'POST'])
@limiter.limit("5/minute")
@jwt_required()
def sendSingle():
    routerJuan = ConnectHandler(
        device_type="cisco_ios",
        host="73.60.76.61",
        username="JT",
        password="lab123",
    )
    if request.method == 'POST':
        request_data = request.get_json()
        commmand = routerJuan.send_command(request_data['command'])
        return jsonify(commmand)





@app.route("/ShowARP", methods=['GET', 'POST'])
@limiter.limit("5/minute")
@jwt_required()
def sendARP():
    routerJuan = ConnectHandler(
        device_type="cisco_ios",
        host="73.60.76.61",
        username="JT",
        password="lab123",
    )
    if request.method == 'GET':
        commmand = routerJuan.send_command("show arp")
        return jsonify(commmand)

@app.route("/ShowInt", methods=['GET', 'POST'])
@limiter.limit("2/minute")
@jwt_required()
def sendSpecInt():
    routerJuan = ConnectHandler(
        device_type="cisco_ios",
        host="73.60.76.61",
        username="JT",
        password="lab123",
    )
    if request.method == 'POST':
        request_data = request.get_json()
        commmand = routerJuan.send_command("show int".format(request_data['interface']))
        return jsonify(commmand)


@app.route("/", methods=["GET", 'POST'])
@limiter.limit("2/minute")
@jwt_required()
def login():
    global userName
    global password
    global host
    global command
    if request.method == 'POST':
        userName = request.json.get('userName')
        password = request.json.get('password')
        #command = request.json.get('command')
        routerJuan = ConnectHandler(
            device_type="cisco_ios",
            host="73.60.76.61",
            username=userName,
            password=password,
        )
        currLogin = {
            "username" : userName,
            "password" : password,
            "host" : host,
        }
        commandTest = routerJuan.send_command("sh int desc")
        return jsonify(commandTest)

    else:

        #login = userCollection.find_one({"username" : userName})
       # loginDict = {
       #     "userName" : login['userName'],
      #      "password" : login['password'],
       # }

        routerJuan = ConnectHandler(
              device_type="cisco_ios",
              host= "73.60.76.61",
              username="JT",
              password="lab123",
        )
        commandTest = routerJuan.send_command("sh int desc")
        return jsonify(commandTest)


@app.route('/token', methods=["POST"])
def create_token():
    userName = request.json.get("userName", None)
    password = request.json.get("password", None)
    userTest = userCollection.find_one({'userName': userName})
    if userTest == None :
        userCollection.insert_one({'userName': userName, 'password': password})
        return {"msg": "added new user"}


    access_token = create_access_token(identity=userName)
    response = {"access_token":access_token}
    return response

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "Logout success"})
    unset_jwt_cookies(response)
    return response

@app.route('/testProfile')
@jwt_required()
def test_profile():
    response_body = {
        "name": "testname",
        "about": "Testabout"
    }
    return response_body

if __name__ == '__main__':
   app.run('0.0.0.0', debug = True)
