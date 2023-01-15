from flask import Flask, request, jsonify,redirect,url_for
import pandas as pd
import pymssql as sql
from flask_cors import CORS

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

@app.route('/giochishop/<id_shop>',methods=['GET','POST'])
def getlocation_pandas(id_shop):
    global id_neg
    id_neg = id_shop
    if request.method == 'GET':
        visualizzaloc = f'Select * from GiochiLoc Where id_shop = {id_shop}'
        df1 = pd.read_sql(visualizzaloc,conn)
        res = list(df1.fillna("NaN").to_dict("index").values())
        return jsonify(res)
    elif request.method == 'POST':

        nome_gioco = request.form.get('nome_gioco')
        studio = request.form.get('nome_studio')
        prezzo = request.form.get('prezzo')
        anno_uscita = request.form.get('data_uscita')
        quantita = request.form.get('quantita')

        aggiunta_tab_giochi=f'insert into Games({nome_gioco},{studio},{prezzo},{anno_uscita}'
        aggiunta_tab_loc=f'insert into Location({id_neg}, ,{quantita})'
        df2 = pd.read_sql(aggiunta_tab_giochi,conn)
        df3 = pd.read_sql(aggiunta_tab_loc,conn)
        print(nome_gioco)



        return jsonify(res)

        
@app.route('/aggiuntagiochi', methods=['POST'])
def addgames_pandas():
    if request.method == 'POST':
        nome_gioco = request.args.get('gameName')
        studio = request.args.get('nameStudio')
        anno_uscita = request.args.get('gamePublish')
        prezzo = request.args.get('price')
        quantita = request.args.get('quantity')

        #query

        return jsonify(request.args)

@app.route('/home')
def Home_Front_hand():
    res=0
   
    return jsonify(res)
  

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)