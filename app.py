from flask import Flask, request, jsonify,redirect,url_for
import pandas as pd
import pymssql as sql
from flask_cors import CORS

from os import getenv
from dotenv import load_dotenv
load_dotenv()


conn = sql.connect(server='213.140.22.237\SQLEXPRESS',
                           user='tolentino.mirko', password='xxx123##', database='tolentino.mirko')

app = Flask(__name__)
CORS(app)

@app.route('/negozio')
def getshop_pandas():
    data = request.args.get("store_name")
    
    q = f'SELECT * FROM shops' + (' WHERE indirizzo_shops like %(data)s' if data != None and data != '' else "")
   
    df = pd.read_sql(q, conn, params={"data": f'%{data}%'})

    res = list(df.fillna("NaN").to_dict("index").values())    # list(df.to_dict("index").values())

    return jsonify(res)

@app.route('/giochishop/{{s.id_shop}}')
def getlocation_pandas():
    

    #indirizzo_dato = request.args.get("link_to_giochi")
    visualizzaloc = f'Select * from GiochiLoc Where id_shop = {{s.id_shop}} '
    df1 = pd.read_sql(visualizzaloc,conn)


    return jsonify(res)
  
  

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)