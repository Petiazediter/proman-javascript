from flask import Flask, render_template, url_for
from util import json_response

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-statuses")
@json_response
def get_statuses():
    return data_handler.get_statuses()


@app.route('/design')
def des():
    return render_template('design.html')


@app.route("/get-board/<int:board_id>")
@json_response
def get_board_by_id(board_id):
    return data_handler.get_board(board_id)


@app.route("/get-cards-by-status/<int:board_id>/<int:status_id>")
@json_response
def get_cards_by_status(board_id, status_id):
    return data_handler.get_cards_by_status(board_id, status_id)


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route("/create-new-card/<int:board_id>/<int:status_id>/<card_title>")
@json_response
def create_new_card(board_id, status_id, card_title):
    order = data_handler.get_column_order_length(board_id, status_id)
    event_data = data_handler.create_new_card(board_id, card_title, status_id, order["count"])
    return event_data


@app.route('/rename-card/card-<int:id>/text-<name>')
@json_response
def rename_card(id,name):
    name = name.replace('_', ' ')
    data_handler.rename_card(id,name)
    return {}


@app.route('/rename-board/board-<int:id>/text-<name>')
@json_response
def rename_board(id,name):
    name = name.replace('_', ' ')
    data_handler.rename_board(id,name)
    return {}


@app.route("/create-new-board")
@json_response
def create_new_board():
    next_board = data_handler.get_board_count + 1
    return data_handler.create_new_board(next_board)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
