from flask import Flask, request, jsonify, Response
import memcache
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

items = {
    "Coffee": 69,
    "Tea": 1,
    "Monster Original": 100
}

last_order = {}

@app.route('/', methods=['POST'])
def rec_order():
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
    
        return '', 204, headers

    headers = {
        'Content-Type': 'application/json',
    }

    json = request.json
    print(request.data)
    print(json)
    keys = list(json.keys())
    total = 0
    for key in keys:
        total += json[key] * items.get(key, 0)
    mc = memcache.Client(['127.0.0.1:11211'])
    json["price"] = total
    mc.set("last_order", json)
    return jsonify({"total": total}), 200, headers

@app.route('/getOrder', methods=['GET'])
def get_order():
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return '', 204, headers

    mc = memcache.Client(['127.0.0.1:11211'])
    last_order = mc.get("last_order")
    return jsonify(last_order), 200, {"Access-Control-Allow-Origin": "*"}

if __name__=='__main__':
    mc = memcache.Client(['127.0.0.1:11211'])
    mc.set("last_order", {})
    app.run(host='0.0.0.0', port=6969)