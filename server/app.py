#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports 
from models import User, Fave, Medication, Condition, Treatment
from datetime import datetime, date

# Views go here!

#POST to login
class Login(Resource):
    def post(self):
        data = request.json
        print(data["email"])
        user = User.query.filter_by(email=data["email"]).first()
        print(user)
        if user is None:
            return make_response({"error": "user not found"}, 404)
        elif user.password != data["password"]:
            return make_response({"error": "incorrect password"}, 403)
        else:
            return make_response({"id": user.id}, 200)

api.add_resource(Login, '/login')

#POST to logout 
# class Logout(Resource):
#     def post(self):
#         data = request.json


# api.add_resource(Logout, '/logout')

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
                pronouns = ["pronouns"]
            )

            db.session.add(new_user)
            db.session.commit()

            return make_response(new_user.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(Users, '/users')

#GET, PATCH, and DELETE user accts
#users by ID stuff (serialize faves into here somehow?)
class UsersByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"error": "No user was found"}, 404)

#what would patching email/password look like here instead?
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        data = request.json
        if data["birthday"]:
            birthday = data["birthday"].split("-")
            fixed_birthday = date(int(birthday[0]), int(
                birthday[1]), int(birthday[2]))
        if user:
            try:
                for attr in data:
                    if attr == "birthday":
                        setattr(user, attr, fixed_birthday)
                    else:
                        setattr(user, attr, data[attr])

                db.session.add(user)
                db.session.commit()

                return make_response(user.to_dict(), 201)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)

        else:
            return make_response({"error": "No user was found"}, 404)

    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()

            return make_response({"message": "user was successfully deleted"}, 204)
        else:
            return make_response({"error": "No user was found"}, 404)

api.add_resource(UsersByID, '/users/<int:id>')

#PATCH and DELETE user faves
class UserFaves(Resource):
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        data = request.json
        #I don't know how to make this into a fave affiliated with a user
        # is it data["fave"]?
        if data["birthday"]:
            birthday = data["birthday"].split("-")
            fixed_birthday = date(int(birthday[0]), int(
                birthday[1]), int(birthday[2]))
        if user:
            try:
                for attr in data:
                    if attr == "birthday":
                        setattr(user, attr, fixed_birthday)
                    else:
                        setattr(user, attr, data[attr])

                db.session.add(user)
                db.session.commit()

                return make_response(user.to_dict(), 201)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)

        else:
            return make_response({"error": "No user was found"}, 404)

    def delete(self, id):
        #not sure how to specify the faves of the user? is it just user.faves?
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()

            return make_response({"message": "user was successfully deleted"}, 204)
        else:
            return make_response({"error": "No user was found"}, 404)


api.add_resource(UserFaves, '/users/<int:id>/faves')

#GET medication by ID
class MedicationsById(Resource):
    def get(self, id):
        medication = Medication.query.filter_by(id=id).first()
        if medication:
            return make_response(medication.to_dict(), 200)
        else:
            return make_response({"error": "No medication was found"},404)
        
api.add_resource(MedicationsById, '/medications/<int:id>')

#GET for all conditions
class Conditions(Resource):
    def get(self):
        conditions = [condition.to_dict(only=('name', 'id',))
                     for condition in Condition.query.all()]
        return make_response(conditions, 200)
        
api.add_resource(Conditions, '/conditions')

#GET condition by ID
class ConditionsById(Resource):
    def get(self, id):
        condition = Condition.query.filter_by(id=id).first()
        if condition:
            return make_response(condition.to_dict(), 200)
        else:
            return make_response({"error": "No condition was found"},404)
        
api.add_resource(ConditionsById, '/conditions/<int:id>')


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

