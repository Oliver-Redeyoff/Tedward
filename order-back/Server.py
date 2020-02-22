from flask import Flask, request, jsonify, Response
import memcache

app = Flask(__name__)

items = {
    "Coffee": 69,
    "Tea": 1,
    "Monster Original": 100
}

last_order = {}

@app.route('/', methods=['POST'])
def rec_order():
    json = request.json
    keys = list(json.keys())
    total = 0
    for key in keys:
        total += json[key] * items.get(key, 0)
    mc = memcache.Client(['127.0.0.1:11211'])
    json["price"] = total
    mc.set("last_order", json)
    return jsonify({"total": total})

@app.route('/getOrder', methods=['GET'])
def get_order():
    mc = memcache.Client(['127.0.0.1:11211'])
    last_order = mc.get("last_order")
    return jsonify(last_order)

if __name__=='__main__':
    mc = memcache.Client(['127.0.0.1:11211'])
    mc.set("last_order", {})
    app.run(host='0.0.0.0', port=6969)