from flask import Flask, jsonify,request
from flask_cors import CORS
import smtplib
app = Flask(__name__)
CORS(app)

@app.route('/email', methods=['POST'])
def hello_world():
    server=smtplib.SMTP("smtp.gmail.com",587)
    server.starttls()
    server.login("miclebogdan1997@gmail.com","Mbi$!!!((&paula2")
    server.sendmail("miclebogdan1997@gmail.com",request.json['email'],request.json['message'])
    return True;

if __name__ == '__main__':
    app.run()
