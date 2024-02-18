from flask import Flask, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'not-really-secret'

debug = DebugToolbarExtension(app)

@app.route('/')
def landing():
    return render_template('index.html')

@app.route('/numbers')
def number_page():
    return render_template('numbers.html')

@app.route('/cards')
def card_page():
    return render_template('cards.html')

@app.route('/pokemon')
def pokemon_page():
    return render_template('pokemon.html')