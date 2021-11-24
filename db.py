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
            'title': i[1],
            'notes': i[2],
            'date': i[3],
            'completed': True if i[4] == 1 else False
        })
    return ret

def do_task(sql, task, cur=None):
    if cur == None:
        conn = create_connection(db_file)
        cur = conn.cursor()
    else:
        conn = None
    cur = cur.execute(sql, task)
    return cur, conn

def get_table_size():
    return len(get_items())

def add_item(item):
    sql = '''INSERT INTO tasks(id,title,notes,compdate,completed)
             VALUES(?,?,?,?,?)'''
    size = get_table_size()
    task = (size, item['title'], item['notes'], item['date'], 1 if item['completed'] else 0)
    cur, conn = do_task(sql, task)
    conn.commit()
    conn.close()

def edit_item(item, index):
    sql = '''UPDATE tasks
             SET title = ?,
                 notes = ?,
                 compdate = ?,
                 completed = ?
             WHERE id = ?'''
    task = (item['title'], item['notes'], item['date'], 1 if item['completed'] else 0, index)
    cur, conn = do_task(sql, task)
    conn.close()

def edit_index(index1, index2, cur=None):
    sql = '''UPDATE tasks
             SET id = ?
             WHERE id = ?'''
    task = (index2, index1)
    cur, conn = do_task(sql, task, cur)

def delete_item(index):
    sql = 'DELETE FROM tasks WHERE id = ?'
    task = (index,)
    size = get_table_size()
    cur, conn = do_task(sql, task)
    for i in range(index+1, size):
        edit_index(i, i-1, cur)
    conn.commit()
    conn.close()

def get_items():
    conn = create_connection(db_file)
    cur = conn.cursor()
    cur.execute('SELECT * FROM tasks')
    rows = cur.fetchall()
    conn.close()
    rows.sort(key=lambda x: x[0])
    return format_tasks(rows)