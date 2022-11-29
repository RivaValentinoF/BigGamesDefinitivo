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

@app.route('/pandas/staff')
def getstaff_pandas():
    data = request.args.get("store_name")
    #q = 'SELECT * FROM Games ' + ('WHERE id_shop IN (SELECT id_shop FROM Location WHERE indirizzo_shop LIKE %(data)s)' if data != None and data != '' else "")
    q = 'SELECT * FROM sales.staffs ' + ('WHERE store_id IN (SELECT store_id FROM sales.stores WHERE store_name LIKE %(data)s)' if data != None and data != '' else "")
    df = pd.read_sql(q, conn, params={"data": f'%{data}%'})

    res = list(df.fillna("NaN").to_dict("index").values())    # list(df.to_dict("index").values())

    return jsonify(res)
  

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)