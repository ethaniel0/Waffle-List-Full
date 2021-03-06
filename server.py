from flask import Flask, request, jsonify
import db
from flask_cors import CORS, cross_origin
app = Flask(__name__)
# CORS(app, origins=["http://localhost:3000", "http://localhost:3001"])
CORS(app)

@app.route("/", methods=['GET', 'POST'])
def get_items():
    return jsonify({"items": db.get_items()})

@app.route("/add", methods=['POST'])
@cross_origin(origins=["http://localhost:3000", "http://localhost:3001"])
def add_item():
    body = request.json
    db.add_item(body['item'])
    return jsonify({"success": True})

@app.route("/edit", methods=['POST'])
def edit_item():
    body = request.json
    db.edit_item(body['item'], body['index'])
    return jsonify({"success": True})

@app.route("/delete", methods=['POST'])
def delete_item():
    body = request.json
    db.delete_item(body['index'])
    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(host='localhost', port=3001)