from flask import Flask, request, jsonify
import pandas as pd
import pymssql as sql
from flask_cors import CORS

from os import getenv
from dotenv import load_dotenv
load_dotenv()


conn = sql.connect(server='213.140.22.237\SQLEXPRESS',
                           user='riva.valentino', password='xxx123##', database='riva.valentino')

app = Flask(__name__)
CORS(app)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)