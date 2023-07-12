from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from netmiko import ConnectHandler
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import json

app = Flask(__name__)

limiter = Limiter(get_remote_address, app=app)


CORS(app)


@app.route("/", methods=["GET"])
@limiter.limit("2/minute")
def get():
      routerJuan = ConnectHandler(
      device_type="cisco_ios",
      host="73.60.76.61",
      username="assHole",
      password="assHole",
   )
      command = routerJuan.send_command("show int des")

      return jsonify(command)


if __name__ == '__main__':
   app.run('0.0.0.0', debug = True)
