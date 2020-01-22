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
    SELECT s.title, array_agg(cards.title) AS array FROM cards
    JOIN statuses s on cards.status_id = s.id
    WHERE board_id = %(board_id)s
    GROUP BY s.title, s.id
    ORDER BY s.id;
    """,
                   {"board_id": board_id})

    cards_in_order = cursor.fetchall()
    return cards_in_order

@connection.connection_handler
def rename_card(cursor,id,name):
    cursor.execute("""UPDATE cards SET title = %(new_name)s  WHERE id = %(id)s""",{"new_name":name, 'id':id})


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


@connection.connection_handler
def create_new_card(cursor, board_id, title, status_id, order):
    cursor.execute("""
    INSERT INTO cards(board_id, title, status_id, order)
    VALUES (%(board_id)s, %(title)s, %(status_id)s, %(order)s)
    """, {
        "board_id": board_id,
        "title": title,
        "status_id": status_id,
        "order": order
    })

    return True


@connection.connection_handler
def get_column_order_length(cursor, board_id, status_id):
    cursor.execute("""
    SELECT COUNT(id)
    FROM cards
    WHERE board_id = %(board_id)s AND status_id = %(status_id)s
    """, {
        "board_id": board_id,
        "status_id": status_id
    })
    result = cursor.fetchone()
    return result


@connection.connection_handler
def get_cards_by_status(cursor, board_id, status_id):
    cursor.execute("""
        SELECT * FROM cards
        WHERE board_id = %(id)s AND status_id = %(status_id)s
        ORDER BY "order";
    """, {"id": board_id, "status_id": status_id})
    return cursor.fetchall()
