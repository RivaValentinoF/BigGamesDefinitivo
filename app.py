from flask import Flask, request, jsonify, redirect, url_for
import pandas as pd
import pymssql as sql
from flask_cors import CORS

conn = sql.connect(server='213.140.22.237\SQLEXPRESS',
                           user='tolentino.mirko', password='xxx123##', database='tolentino.mirko')

app = Flask(__name__)
CORS(app)

# Back-End


@app.route('/negozio')
def getshop_pandas():
    data = request.args.get("store_name")

    q = f'SELECT * FROM shops' + \
        (' WHERE indirizzo_shops like %(data)s' if data != None and data != '' else "")

    df = pd.read_sql(q, conn, params={"data": f'%{data}%'})

    # list(df.to_dict("index").values())
    res = list(df.fillna("NaN").to_dict("index").values())

    return jsonify(res)


@app.route('/giochishop/<id_shop>', methods=['GET'])
def getlocation_pandas(id_shop):
    global id_neg
    id_neg = id_shop

    visualizzaloc = f'Select * from GiochiLoc Where id_shop = {id_shop}'
    df1 = pd.read_sql(visualizzaloc, conn)
    res = list(df1.fillna("NaN").to_dict("index").values())
    return jsonify(res)


@app.route('/aggiuntagiochi', methods=['POST', 'GET'])
def addgames_pandas():
    #! Errore
    # (8115, b'Arithmetic overflow error converting nvarchar to data type numeric.DB-Lib error message 20018, severity 16:\nGeneral SQL Server error: Check messages from the SQL Server\n')

    if request.method == 'POST':
        global id_neg

        nome_gioco = request.args.get('gameName')
        studio = request.args.get('nameStudio')
        anno_uscita = request.args.get('gamePublish')
        prezzo = request.args.get('price')
        quantita = request.args.get('quantity')

        print(request.args, "-".join(anno_uscita.split('-')[::-1]))

        # query
        cursor = conn.cursor(as_dict=True)
        q = 'INSERT INTO Games (nome, studio, prezzo, anno_uscita) VALUES (%(nome_gioco)s, %(studio)s, %(prezzo)s, %(yean)s)'
        cursor.execute(q, params={
                       'nome_gioco': nome_gioco, 'studio': studio, 'prezzo': prezzo, 'yean': anno_uscita})
        conn.commit()

        cursor = conn.cursor(as_dict=True)
        q = 'INSERT INTO Location (id_shop,quantita) VALUES (%(id_neg)s, %(quantita)s)'
        cursor.execute(q, params={'id_neg': id_neg, 'quantita': quantita})
        conn.commit()

        return jsonify(request.args)

    elif request.method == 'GET':

            tutti_generi = 'select genres from Genres'

            selezione_generi = pd.read_sql(tutti_generi, conn)

            res = list(selezione_generi.fillna(
                "NaN").to_dict("index").values())

            tutte_console = 'select console,software_house from console'

            selezione_console = pd.read_sql(tutte_console, conn)

            res2 = list(selezione_console.fillna(
                "NaN").to_dict("index").values())

            return jsonify({'generi': res, 'consoles': res2})


@app.route('/aggiuntanegozi', methods=['POST'])
def addshops_pandas():
        if request.method == 'POST':
            num_tel = request.args.get('phone')
            via = request.args.get('via')
            citta = request.args.get('city')

            # query
            cursor = conn.cursor(as_dict=True)
            q = 'INSERT INTO Shops (telefono_shops,indirizzo_shops,citta) VALUES (%(telefono)s, %(via)s, %(citta)s)'
            cursor.execute(
                q, params={'telefono': num_tel, 'via': via, 'citta': citta})
            conn.commit()
            return jsonify(request.args)


# _______________________________________________________________________________________________________________________________________

# Front-End

@app.route('/home')
def Home_Front_hand():
    res = 0

    return jsonify(res)

# cerca


@app.route('/cerca', methods=['GET'])
def viz_tutti():
    data = request.args.get("nome")

    visualizzacerca = f'SELECT * FROM GiochiLoc' + \
        (' WHERE nome like %(data)s' if data != None and data != '' else "")
    dfcerca = pd.read_sql(visualizzacerca, conn, params={"data": f'%{data}%'})
    res = list(dfcerca.fillna("NaN").to_dict("index").values())
    return jsonify(res)

# funziona


@app.route('/registrazione', methods=['POST'])
def addregistazione():
        if request.method == 'POST':
            nome = request.args.get('nome')
            cognome = request.args.get('cognome')
            telefono = request.args.get('telefono')
            email = request.args.get('email')
            password = request.args.get('password')
            via = request.args.get('via')
            citta = request.args.get('citta')
            cap = request.args.get('cap')

            # query
            cursor = conn.cursor(as_dict=True)
            q = 'INSERT INTO Buyer (nome,cognome,telefono,email,indirizzo,Password,città,codice_postale) VALUES (%(nome)s, %(cognome)s, %(telefono)s,%(email)s, %(indirizzo)s, %(password)s,%(città)s, %(codice_postale)s)'
            cursor.execute(q, params={'nome': nome, 'cognome': cognome, 'telefono': telefono, 'email': email,
                           'password': password, 'indirizzo': via, 'città': citta, 'codice_postale': cap})
            conn.commit()

            return jsonify(request.args)


@app.route('/login', methods=['POST'])
def login():
  # Prendo gli argomenti richiesti
  email = request.args.get('email')
  password = request.args.get('password')

  data = {
    "statusCode": 200,
    "errorMessage": "",
    "data": {}
  }

  # Controllo se nono stati passati tutti i parametri richiesti
  if None not in [email, password]:
    # Prendo le informazioni dell'utente
    q = 'SELECT * FROM Buyer WHERE email = %(e)s'
    cursor = conn.cursor(as_dict=True)
    cursor.execute(q, params={"e": email})
    res = cursor.fetchall()

    print(res[0])

    # Controllo se l'utente esiste
    if len(res) < 1:
      data["statusCode"] = 404
      data["errorMessage"] = "No user was found with that email"
    elif not (res[0]["Password"] == password):
      data["statusCode"] = 403
      data["errorMessage"] = "Wrong password"
    else:
      data["data"] = res[0]
  else:
    data['statusCode'] = 400
    data['errorMessage'] = "No email or password provided"

  return jsonify(data)


@app.route('/infogiochi/<console>/<nome>', methods=['GET'])
def getinfogame_pandas(nome, console):

    informazioni_giochi = f'SELECT * FROM GiochiLoc Where nome = \'{nome}\' and console = \'{console}\''
    dfinfo = pd.read_sql(informazioni_giochi,conn)
    res = list(dfinfo.fillna("NaN").to_dict("index").values())
    return jsonify(res)





if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)