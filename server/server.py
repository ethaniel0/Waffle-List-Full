from flask import Flask, request, after_this_request, jsonify
import db
app = Flask(__name__)

# @app.after_request
# def add_header(r):
#     """
#     Add headers to both force latest IE rendering engine or Chrome Frame,
#     and also to cache the rendered page for 10 minutes.
#     """
#     r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
#     r.headers["Pragma"] = "no-cache"
#     r.headers["Expires"] = "0"
#     r.headers['Cache-Control'] = 'public, max-age=0'
#     r.headers['Access-Control-Allow-Origin'] = '*'
#     return r

@app.route("/", methods=['GET', 'POST'])
def get_items():
    return jsonify({"items": db.get_items()})

@app.route("/add", methods=['POST'])
def add_item():
    body = request.json
    print(body)
    db.add_item(body['item'])
    return jsonify({"success": True})

@app.route("/edit", methods=['POST'])
def edit_item():
    body = request.json
    print(body)
    db.edit_item(body['item'], body['index'])
    return jsonify({"success": True})

@app.route("/delete", methods=['POST'])
def delete_item():
    body = request.json
    print(body)
    db.delete_item(body['index'])
    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(host='localhost', port=3001)