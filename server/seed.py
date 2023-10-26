#!/usr/bin/env python3

# Local imports
from app import app
from models import db, Medication, Treatment, Condition
import yaml
import os

current_folder = os.path.dirname(__file__)
with open(f'{current_folder}/seeds.yml', 'r') as file:
  seed_data = yaml.safe_load(file)

def create_condition(condition_name):
  raw_data = seed_data["conditions"][condition_name]
  return Condition(name=raw_data["name"], description=raw_data["description"])

with app.app_context():
    print("Clearing db...")
    Medication.query.delete()
    Treatment.query.delete()
    Condition.query.delete()
    db.session.commit()

    print("Seeding conditions...")
    depression=create_condition("depression")
    anxiety=create_condition("anxiety")
    ptsd=create_condition("ptsd")
    adhd=create_condition("adhd")

    db.session.add_all([depression, anxiety, ptsd, adhd])
    db.session.commit()

    treat_conditions = {
       'depression': depression,
       'anxiety': anxiety,
       'ptsd': ptsd,
       'adhd': adhd
    }
    
    print("Seeding medications...")
    for raw_medication in seed_data["medications"]:
       medication = Medication(
          name_brand = raw_medication["name_brand"],
          name_generic = raw_medication["name_generic"],
          drug_class = raw_medication["class"],
          prescribed_for = raw_medication["prescribed_for"],
          side_effects = raw_medication["side_effects"],
          pill_image = raw_medication["image"]
       )

       db.session.add(medication)
       db.session.commit()

       for treat_condition in raw_medication["conditions"]:
          medication_id = medication.id
          condition_id = treat_conditions[treat_condition].id
          treatment = Treatment (
             condition_id = condition_id,
             medication_id = medication_id
          )

          db.session.add(treatment)
          db.session.commit()
          
    print("Seeding complete!")

#print("Seed data conditions: depression")
# print(seed_data['conditions']['depression'])
