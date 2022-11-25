from flask import Flask, request, jsonify
import pandas as pd
import pymssql as sql
from flask_cors import CORS

from os import getenv
from dotenv import load_dotenv
load_dotenv()

db_server = getenv("DB_SERVER")
db_user = getenv("DB_USER")
db_password = getenv("DB_PASSWORD")
db_name = getenv("DB_NAME")

conn = sql.connect(db_server, db_user, db_password, db_name)

app = Flask(__name__)
CORS(app)

@app.route('/pandas/staff')
def getstaff_pandas():
    data = request.args.get("store_name")

    q = 'SELECT * FROM sales.staffs ' + ('WHERE store_id IN (SELECT store_id FROM sales.stores WHERE store_name LIKE %(data)s)' if data != None and data != '' else "")
    df = pd.read_sql(q, conn, params={"data": f'%{data}%'})

    res = list(df.fillna("NaN").to_dict("index").values())    # list(df.to_dict("index").values())

    return jsonify(res)

@app.route('/api/staff')
def getstaff_sql():
    data = request.args.get("store_name")

    q = 'SELECT * FROM sales.staffs ' + ('WHERE store_id IN (SELECT store_id FROM sales.stores WHERE store_name LIKE %(data)s)' if data != None and data != '' else "")
    cursor = conn.cursor(as_dict=True)
    p = {"data": f"%{data}%"}
    cursor.execute(q, p)
    data = cursor.fetchall()

    return jsonify(data)

@app.route('/api/users')
def getusers():
    cursor = conn.cursor(as_dict=True)
    q = 'SELECT * FROM sales.customers'
    p = {}
    cursor.execute(q, p)
    data = cursor.fetchall()

    return jsonify(data)

@app.route('/api/products')
def getproducts():
    cursor = conn.cursor(as_dict=True)
    q = 'SELECT * FROM production.products'
    p = {}
    cursor.execute(q, p)
    data = cursor.fetchall()

    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)