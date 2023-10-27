from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import *

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    birthday = db.Column(db.Date)

    #relationships with faves
    faves = db.relationship(
        "Fave", backref="user", cascade="all, delete-orphan")
    
    #serializing so we don't see other faves' associated users
    serialize_rules =("-faves.user",)

    #validations for name, password, email, birthday
    @validates('name')
    def validate_name(self, key, name):
        if name and len(name) >=1:
            return name
        else:
            raise ValueError("Must have valid name")
        
    
    @validates('password')
    def validate_password(self, key, password):
        if password and len(password) >=12:
            return password
        else:
            raise ValueError("Must have valid password")
        
    
    @validates('email')
    def validate_email(self, key, email):
        if email and '@' in email:
            return email
        else:
            raise ValueError("Must have valid email attribute")
        
    
    @validates('birthday')
    def validate_birthday(self, key, birthday):
        today = datetime.now().date()
        difference= today - birthday
        age_in_days=difference.days
        if birthday and age_in_days >= 6570:
            #6570 is the number of days in 18 years
            return birthday
        else:
            raise ValueError("Users must be over 18 years old.")
        

#faves as the intermediate between med and user
class Fave(db.Model, SerializerMixin):
    __tablename__ = 'faves'

    id = db.Column(db.Integer, primary_key=True)
    faved_on = db.Column(db.Date)
    #can this be set as a default to "today?"
    unfaved_on = db.Column(db.Date)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    medication_id = db.Column(db.Integer, db.ForeignKey('medications.id'))

    #serialize rules
    serialize_rules = ("-user.faves", "-medication.faves")


#medication model 

class Medication(db.Model, SerializerMixin):
    __tablename__ = 'medications'

    id = db.Column(db.Integer, primary_key=True)
    name_brand = db.Column(db.String)
    name_generic = db.Column(db.String)
    drug_class = db.Column(db.String)
    prescribed_for = db.Column(db.String)
    side_effects = db.Column(db.String)
    pill_image= db.Column(db.String)
    
    #maybe more stuff later, like a description of side effects, depending on what is in the APIs

    #adding a relationship to faves and treatments
    faves = db.relationship(
        "Fave", backref="medication", cascade="all, delete-orphan")
    
    #serializing other faved medications (others needed here?)
    serialize_rules = ("-faves.medication", "-treatments.medication")
    
    #relationship with treatments
    treatments = db.relationship(
        "Treatment", backref="medication", cascade="all, delete-orphan")

#validate for generic and name brand attributes
    @validates('name_generic')
    def validate_name_generic(self, key, name_generic):
        if name_generic and len(name_generic) >=1:
            return name_generic
        else:
            raise ValueError("Must have valid generic name")

    @validates('name_brand')
    def validate_name_brand(self, key, name_brand):
        if name_brand and len(name_brand) >=1:
            return name_brand
        else:
            raise ValueError("Must have valid brand name")
        

class Treatment(db.Model, SerializerMixin):
    __tablename__ = 'treatments'

    id = db.Column(db.Integer, primary_key=True)

    condition_id = db.Column(db.Integer, db.ForeignKey("conditions.id"))
    medication_id = db.Column(db.Integer, db.ForeignKey("medications.id"))

    #dosage_id = db.Column(db.Integer, db.ForeignKey("dosage.id"))
    #dosage is a stretch goal for later

    #I think this serializes logically?
    serialize_rules = ("-medication.treatments","-condition.treatments")


class Condition(db.Model, SerializerMixin):
    __tablename__ = "conditions"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description= db.Column(db.String)

    #relationship with treatment
    treatments = db.relationship(
        "Treatment", backref="condition", cascade="all, delete-orphan")
    
    serialize_rules = ("-treatments.condition",)
    
    #do I need a validation for this?
    @validates('name')
    def validate_name(self, key, name):
        if name and len(name) >=1:
            return name
        else:
            raise ValueError("Must have valid name")
        