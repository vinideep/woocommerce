from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import time

App = Flask(__name__)

cors = CORS(App)
@App.route('/time',methods=['GET','POST','DELETE'])
@cross_origin()

def get_current_time():
    return jsonify({"time ": time.time()})


if __name__ == '__main__':
    App.run(debug=True)