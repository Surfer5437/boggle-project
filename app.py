from boggle import Boggle
from flask import Flask, render_template, session, jsonify
app = Flask(__name__)
app.config["SECRET_KEY"] = "SHHHHHHHHHHH SEEKRIT"


@app.route('/')
def boggle_home():
    boggle_game = Boggle()
    b = boggle_game.make_board()
    session['boggle_game'] = b
    return render_template('boggle.html')


@app.route('/check_word/<word>')
def check_word(word):
    boggle_game = Boggle()
    if boggle_game.check_valid_word(session['boggle_game'], word) == 'ok':
        result = 'ok'
    elif boggle_game.check_valid_word(session['boggle_game'], word) == 'not-on-board':
        result = 'not-on-board'
    elif boggle_game.check_valid_word(session['boggle_game'], word) == 'not-word':
        result = 'not-word'
    return jsonify(result=result)
