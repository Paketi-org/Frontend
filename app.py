from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/")
def base_route():
    return "Welcome", 200

@app.after_request # blueprint can also be app~~
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response
    
if __name__ == '__main__':
    app.run(host="localhost", port=5001)

