import connection


@connection.connection_handler
def get_card_status(cursor, status_id):
    """
    Find the first status matching the given id
    :param cursor:
    :param status_id:
    :return: str
    """
    cursor.execute("""
    SELECT title from statuses
    where id = %(id)s;""",
                   {"id": status_id})
    statuses = cursor.fetchone()
    return statuses["title"]


@connection.connection_handler
def get_boards(cursor):
    """
    Gather all boards
    :return:
    """
    cursor.execute("""
    SELECT * FROM boards
    """)
    boards = cursor.fetchall()
    return boards


@connection.connection_handler
def get_cards_for_board(cursor, board_id):
    cursor.execute("""
    SELECT * from cards
    WHERE board_id = %(board_id)s;""",
                   {"board_id": board_id})
    matching_cards = cursor.fetchall()
    return matching_cards


@connection.connection_handler
def get_statuses(cursor):
    cursor.execute("""
    SELECT * FROM statuses;""")

    statuses = cursor.fetchall()
    return statuses


@connection.connection_handler
def get_cards_in_order(cursor, board_id):
    cursor.execute("""
    SELECT status_id, array_agg(title) FROM cards
    WHERE board_id = %(board_id)s
    GROUP BY status_id;
    """,
                   {"board_id":board_id})

    cards_in_order = cursor.fetchall()
    return cards_in_order


@connection.connection_handler
def get_board(cursor, board_id):
    cursor.execute("""
    SELECT *
    FROM boards
    WHERE id = %(board_id)s
    """, {
        "board_id": board_id
    })

    board = cursor.fetchone()
    return board
