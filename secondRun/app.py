from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
import json

app = Flask(__name__)

CORS(app)

@app.route("/", methods=["GET"])
def get():
    return jsonify("Hope this works")

if __name__ == '__main__':
   app.run('0.0.0.0', debug = True)
