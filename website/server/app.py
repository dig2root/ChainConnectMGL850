from flask import Flask, jsonify, make_response, request, session
from flask import json
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from models import db, User
from config import ApplicationConfig
from utils import Utils
from solver2d import Solver2D
from solver3d import Solver3D

utils = Utils
solver2d = Solver2D()
solver3d = Solver3D()

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "error": "Unauthorized"
        }), 401

    user = User.query.filter_by(id=user_id).first()

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/register", methods=["POST"])
def register_user():
    lastname = request.json["lastname"]
    firstname = request.json["firstname"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({
            "error": "User already exists!"
        }), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(lastname=lastname, firstname=firstname, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({
            "error": "Unauthorized"
        }), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({
            "error": "Unauthorized"
        }), 401

    session["user_id"] = user.id

    return make_response(jsonify({
        "id": user.id,
        "email": user.email
    }), 200)

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id", None)
    return jsonify(()), 200

@app.route("/application2d", methods=["POST"])
def use_2dapp():
    container = request.json["container"]
    boxes = request.json["boxes"]
    filled_container, container = solver2d.solve(Utils.convertBoxIntoList(boxes), Utils.convertContainerIntoList(container))
    resp = Utils.convertJson(container, filled_container)
    return jsonify(resp), 200

@app.route("/application3d", methods=["POST"])
def use_3dapp():
    container = request.json["container"]
    boxes = request.json["boxes"]
    bin = solver3d.solve([container], boxes)
    resp = Utils.convert3DJson(bin)
    return jsonify(resp), 200

if __name__ == "__name__":
    app.run(debug=True)
