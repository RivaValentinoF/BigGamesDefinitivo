from flask import Flask, request, jsonify, redirect, url_for
import pandas as pd
import pymssql as sql
from flask_cors import CORS

conn = sql.connect(server='213.140.22.237\SQLEXPRESS', user='tolentino.mirko', password='xxx123##', database='tolentino.mirko')

app = Flask(__name__)
CORS(app)

id_neg = 0

# Back-End


def user_exists(email):
    q = 'SELECT * FROM Buyer WHERE email = %(e)s'
    cursor = conn.cursor(as_dict=True)
    cursor.execute(q, params={"e": email})
    res = cursor.fetchall()
    if len(res) < 1:
        return False
    return True


def get_user(email):
    q = 'SELECT * FROM Buyer WHERE email = %(email)s'
    cursor = conn.cursor(as_dict=True)
    cursor.execute(q, params={"email": email})
    res = cursor.fetchall()
    return res


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
    if request.method == 'POST':
        nome_gioco = request.args.get('gameName')
        studio = request.args.get('nameStudio')
        anno_uscita = request.args.get('gamePublish')
        prezzo = request.args.get('price')
        quantita = request.args.get('quantity')
        # console = request.args.get('console')

        print(request.args)

        errore = ""
        data = None

        if None not in [nome_gioco,studio,anno_uscita,prezzo,quantita]:
            # query
            cursor = conn.cursor(as_dict=True)
            q = 'INSERT INTO Games (nome, studio, prezzo, anno_uscita) VALUES (%(nome_gioco)s, %(studio)s, %(prezzo)s, %(year)s)'
            cursor.execute(q, params={'nome_gioco': nome_gioco, 'studio': studio, 'prezzo': prezzo, 'year': anno_uscita})
            conn.commit()
            # devo ottenere l' id

            cursor = conn.cursor(as_dict=True)
            q = 'SELECT * FROM Games WHERE nome = %(nome_gioco)s AND studio = %(studio)s AND prezzo = %(prezzo)s AND anno_uscita = %(year)s'
            cursor.execute(q, params={'nome_gioco': nome_gioco, 'studio': studio, 'prezzo': prezzo, 'year': anno_uscita})
            res = cursor.fetchall()
            id = res[0]['id_game']
            data = res[0]

            global id_neg
            if id_neg != -1:
                cursor = conn.cursor(as_dict=True)
                q = 'INSERT INTO Location (id_shop, id_game, quantita) VALUES (%(id_neg)s, %(id_game)s, %(quantita)s)'
                cursor.execute(q, params={'id_neg': id_neg, 'quantita': quantita, 'id_game': id})
                conn.commit()
            else:
                errore = "Nessun negozio selezionato"
        else:
            errore = "Manca qualche dato"

        return jsonify({'errore': errore, 'data': data})

    elif request.method == 'GET':

        tutti_generi = 'select genres from Genres'

        selezione_generi = pd.read_sql(tutti_generi, conn)

        res = list(selezione_generi.fillna(
            "NaN").to_dict("index").values())

        tutte_console = 'select console,software_house from console'

        selezione_console = pd.read_sql(tutte_console, conn)

        res2 = list(selezione_console.fillna("NaN").to_dict("index").values())

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
        cursor.execute(q, params={'telefono': num_tel, 'via': via, 'citta': citta})
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

        errore = ""
        data = None

        if None not in [nome, cognome, telefono, email, password, via, citta, cap]:

            if not user_exists(email):
                # query
                cursor = conn.cursor(as_dict=True)
                q = 'INSERT INTO Buyer (nome,cognome,telefono,email,indirizzo,Password,città,codice_postale) VALUES (%(nome)s, %(cognome)s, %(telefono)s,%(email)s, %(indirizzo)s, %(password)s,%(città)s, %(codice_postale)s)'
                cursor.execute(q, params={'nome': nome, 'cognome': cognome, 'telefono': telefono, 'email': email, 'password': password, 'indirizzo': via, 'città': citta, 'codice_postale': cap})
                conn.commit()

                data = get_user(email)
            else:
                errore = "L'utente esista gia'"
        else:
            errore = "Mancano dei parametri"

        return jsonify({'errore': errore, 'data': data})


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

        print(res)

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
    dfinfo = pd.read_sql(informazioni_giochi, conn)
    res = list(dfinfo.fillna("NaN").to_dict("index").values())
    return jsonify(res)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)