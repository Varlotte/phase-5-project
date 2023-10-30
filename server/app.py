#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
from flask_cors import CORS

# Local imports
from config import app, db, api
# Add your model imports 
from models import User, Fave, Medication, Condition, Treatment
from datetime import datetime, date

# Views go here!
#secret key for session stuff
app.secret_key = b'hWUZ1t4PZpdp0fCvPbN8'
app.config["SESSION_COOKIE_SECURE"] = True
app.config['SESSION_COOKIE_DOMAIN'] = '127.0.0.1'
app.config['SESSION_COOKIE_HTTPONLY'] = False
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
CORS(app, supports_credentials=True)

#POST to login
class Login(Resource):
    def post(self):
        data = request.json
        user = User.query.filter_by(email=data["email"]).first()
        if user is None:
            return make_response({"error": "user not found"}, 404)
        elif user.password != data["password"]:
            return make_response({"error": "incorrect password"}, 403)
        else:
            session['id'] = user.id
            session['domain'] = '127.0.0.1'
            return make_response({"id": user.id}, 200)

api.add_resource(Login, '/login')

#POST to logout, add session cookies/auth things here 
class Logout(Resource):
    def post(self):
        session.pop('id', None)
        return make_response("Logout successful", 200)

api.add_resource(Logout, '/logout')

#POST a new account for user
class Users(Resource):
    def post(self):
        data = request.json
        birthday = data["birthday"].split("-")
        fixed_birthday = date(int(birthday[0]), int(
            birthday[1]), int(birthday[2]))
        try:
            new_user = User(
                name=data["name"],
                email=data["email"],
                password=data["password"],
                birthday=fixed_birthday,
            )

            db.session.add(new_user)
            db.session.commit()

            return make_response(new_user.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

api.add_resource(Users, '/users')

#GET, PATCH, and DELETE user accts
#users by ID stuff (check to make sure this will auto return user faves since not excluded from to_dict)
class UsersByID(Resource):
    def get(self, id):       
        user = User.query.filter_by(id=id).first()
        if user is None:
            return make_response({"error": "No user was found"}, 404)
        if not "id" in session or session["id"] != user.id:
            return make_response ({"error": "Unathorized"}, 403)          
        else:
            return make_response(user.to_dict(), 200)

    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        data = request.json
        if user is None:
            return make_response({"error": "No user was found"}, 404)
        if not "id" in session or session["id"] != user.id:
            return make_response ({"error": "Unathorized"}, 403)  
        try:
            if data.get("email"):
                setattr(user,"email", data["email"]) 
            if data.get("password"):
                setattr(user,"password", data["password"])
                
            db.session.add(user)
            db.session.commit()
            print (user.id)
            return make_response(user.to_dict(), 201)
                
        except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not "id" in session or session["id"] != user.id:
            return make_response ({"error": "Unathorized"}, 403)  
        if user:
            db.session.delete(user)
            db.session.commit()
            session.pop('id', None)
            return make_response({"message": "user was successfully deleted"}, 204)
        else:
            return make_response({"error": "No user was found"}, 404)

api.add_resource(UsersByID, '/users/<int:id>')

#POST and DELETE user faves, protected to only add faves to your own account
class AddFave(Resource):
    def post(self, id):
        data = request.json
        if not "id" in session or session["id"] != data["user_id"]:
            return make_response ({"error": "Unathorized"}, 403)          
        try:
            new_fave = Fave(
                user_id=data["user_id"],
                medication_id=data["medication_id"],
            )

            db.session.add(new_fave)
            db.session.commit()

            return make_response(new_fave.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

api.add_resource(AddFave, '/faves')

#can't delete a fave if it's not your account!
class DeleteFave(Resource):
    def delete(self, id):
        fave = Fave.query.filter_by(id=id).first()
        if not "id" in session or session["id"] != fave["user_id"]:
            return make_response ({"error": "Unathorized"}, 403)               
        if fave:
            db.session.delete(fave)
            db.session.commit()
            return make_response({"message": "successfully unfaved"}, 204)
        else:
            return make_response({"error": "No fave was found"}, 404)

api.add_resource(DeleteFave, '/faves/<int:id>')

#GET medication by ID
class MedicationsById(Resource):
    def get(self, id):
        medication = Medication.query.filter_by(id=id).first()
        if medication:
            return make_response(medication.to_dict(rules=("-faves","-treatments")), 200)
        else:
            return make_response({"error": "No medication was found"},404)
        
api.add_resource(MedicationsById, '/medications/<int:id>')

#GET for all conditions
class Conditions(Resource):
    def get(self):
        conditions = [condition.to_dict(only=('name', 'id', 'description',))for condition in Condition.query.all()]
        return make_response(conditions, 200)
        
api.add_resource(Conditions, '/conditions')

#GET condition by ID
class ConditionsById(Resource):
    def get(self, id):
        condition = Condition.query.filter_by(id=id).first()
        if condition:
            #will I ever want to get rid of this dict rule and see affiliated treatments?
            return make_response(condition.to_dict(rules=("-treatments",)), 200)
        else:
            return make_response({"error": "No condition was found"},404)
        
api.add_resource(ConditionsById, '/conditions/<int:id>')


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

