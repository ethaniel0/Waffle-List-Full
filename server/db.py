import sqlite3
from sqlite3 import Error

db_file = '/Users/ethanhorowitz/Desktop/Waffle List Full/WaffleDB.sqlite3'

def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)
    return conn

def format_tasks(arr):
    ret = []
    for i in arr:
        ret.append({
            'title': i[0],
            'notes': i[1],
            'date': i[2],
            'completed': True if i[3] == 1 else False
        })
    return ret

def do_task(sql, task):
    conn = create_connection(db_file)
    cur = conn.cursor()
    cur.execute(sql, task)
    conn.commit()
    return cur, conn

def add_item(item):
    sql = '''INSERT INTO tasks(title,notes,compdate,completed)
             VALUES(?,?,?,?)'''
    task = (item['title'], item['notes'], item['date'], 1 if item['completed'] else 0)
    cur, conn = do_task(sql, task)
    print(cur.lastrowid)
    conn.close()

def edit_item(item, index):
    sql = '''UPDATE tasks
             SET title = ?
                 notes = ?
                 compdate = ?
                 completed = ?
             WHERE id = ?'''
    task = (item['title'], item['notes'], item['date'], 1 if item['completed'] else 0, index)
    cur, conn = do_task(sql, task)
    conn.close()

def delete_item(index):
    sql = 'DELETE FROM tasks WHERE id = ?'
    task = (index,)
    cur, conn = do_task(sql, task)
    conn.close()

def get_items():
    conn = create_connection(db_file)
    cur = conn.cursor()
    cur.execute('SELECT * FROM tasks')
    rows = cur.fetchall()
    conn.close()
    return format_tasks(rows)