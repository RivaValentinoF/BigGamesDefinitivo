from flask import Flask, request, jsonify,redirect,url_for
import pandas as pd
import pymssql as sql
from flask_cors import CORS

conn = sql.connect(server='213.140.22.237\SQLEXPRESS',
                           user='tolentino.mirko', password='xxx123##', database='tolentino.mirko')

app = Flask(__name__)
CORS(app)

#Back-End

@app.route('/negozio')
def getshop_pandas():
    data = request.args.get("store_name")
    
    q = f'SELECT * FROM shops' + (' WHERE indirizzo_shops like %(data)s' if data != None and data != '' else "")
   
    df = pd.read_sql(q, conn, params={"data": f'%{data}%'})

    res = list(df.fillna("NaN").to_dict("index").values())    # list(df.to_dict("index").values())

    return jsonify(res)

@app.route('/giochishop/<id_shop>',methods=['GET'])
def getlocation_pandas(id_shop):
    global id_neg
    id_neg = id_shop
    
    visualizzaloc = f'Select * from GiochiLoc Where id_shop = {id_shop}'
    df1 = pd.read_sql(visualizzaloc,conn)
    res = list(df1.fillna("NaN").to_dict("index").values())
    return jsonify(res)

  
        
@app.route('/aggiuntagiochi', methods=['POST','GET'])
def addgames_pandas():
    if request.method == 'POST':
  
        nome_gioco = request.args.get('gameName')
        studio = request.args.get('nameStudio')
        anno_uscita = request.args.get('gamePublish')
        prezzo = request.args.get('price')
        quantita = request.args.get('quantity')
        

        #query
        cursor = conn.cursor(as_dict=True)
        q = 'INSERT INTO Games (nome,studio,prezzo,anno_uscita) VALUES (%(nome_gioco)s, %(studio)s, %(prezzo)i,%(anno_uscita)d)'
        cursor.execute(q, params={'nome_gioco': nome_gioco, 'studio': studio, 'prezzo': prezzo,'anno_uscita': anno_uscita})
        conn.commit()
        
        cursor = conn.cursor(as_dict=True)
        q = 'INSERT INTO Location (id_shop,quantita) VALUES (%(id_neg)s, %(quantita)s)'
        cursor.execute(q, params={'id_neg': id_neg, 'quantita': quantita})
        conn.commit()

        return jsonify(request.args)

    elif request.method == 'GET':
           
            tutti_generi = 'select genres from Genres'

            selezione_generi = pd.read_sql(tutti_generi,conn)

            res = list(selezione_generi.fillna("NaN").to_dict("index").values())


            tutte_console = 'select console,software_house from console'

            selezione_console = pd.read_sql(tutte_console,conn)

            res2 = list(selezione_console.fillna("NaN").to_dict("index").values())

            return jsonify(res,res2)


 




@app.route('/aggiuntanegozi', methods=['POST'])
def addshops_pandas():
        if request.method == 'POST':
            num_tel = request.args.get('phone')
            via = request.args.get('via')
            citta = request.args.get('city')

            #query
            cursor = conn.cursor(as_dict=True)
            q = 'INSERT INTO Shops (telefono_shops,indirizzo_shops,citta) VALUES (%(telefono)s, %(via)s, %(citta)s)'
            cursor.execute(q, params={'telefono': num_tel, 'via': via, 'citta': citta})
            conn.commit()
            return jsonify(request.args)



        

#_______________________________________________________________________________________________________________________________________

#Front-End

@app.route('/home')
def Home_Front_hand():
    res=0
   
    return jsonify(res)

#cerca 

@app.route('/cerca',methods=['GET'])
def viz_tutti():
   
    
    visualizzacerca = f'Select * from GiochiLoc'
    dfcerca = pd.read_sql(visualizzacerca,conn)
    res = list(dfcerca.fillna("NaN").to_dict("index").values())
    return jsonify(res)
# qua e giusto cerca tutti i giochi ripetendoli ovviamente quindi ce un problema nel ts di la 

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)