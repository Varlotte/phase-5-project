# RXGnosis: Take control of your doctor's appointment

## The Pitch: 
Statistically, most doctors' appointments in this country last an average of 17.4 minutes.
In that time, patients are often prescribed medications with little time for dialogue with a provider about side effects, interactions, or even correct dosage information.
Enter RXGnosis: a tool that empowers patients to come to doctor's appointments with knowledge about commonly prescribed medications and their side effects for common mental health conditions.

## User Stories:
* Users will be able to create a secure RXGnosis account where they'll record their current diagnoses and prescriptions. 
* From there, they'll be able to read up on four of the most common mental health diagnoses: depression, anxiety, ptsd, and adhd.
* Clicking into one of these conditions will take users to RXMatch for that condition. 
* RX Match feature works just like Tinder, but for mental health care. Patients will be able to use the accessible interface to swipe through reliable information from a federal API about commonly prescribed medications for a treatment, view side effects, and save the medications that look most relevant to their needs.
* Users will be able to show their faved meds list to providers in appointments to better advocate for their own care and be a more informed part of a greater healthcare conversation.

## Caveats:
1. This is not a diagnostic tool. There will be clear disclaimers on the site indicating that this tool is for people who already have their diagnosis from a professional. We'll also provide resources to our data sets and sources and recommend users not use WebMD.
2. Not all medications or treatment plans will be on here, especially off-label prescriptions. This won't be all-inclusive, and there will be disclaimers for that.
3. There will probably need to be a disclaimer here about HIPAA if this ever goes public.

## CRUD functionality:
* C- create user account, create my fave, create a curr_medication, create a user condition
* R- read my account info, read medication info, read condition info, read my faves
* U- update my account info
* D- delete my account, delete my fave (aka unfave), delete a curr_medication, delete a user condition
* full CRUD on user object, partial CRUD on faves, curr_medications, and conditions

## Wirefame Sketches:
![CFECD5EA-F677-4B93-95A2-B4F06D1E241B_1_102_o](https://github.com/Varlotte/phase-5-project/assets/32116877/6db9e010-e216-43cc-9dea-2dadf265a6d7)

## API Contract: 
tentative routing:

* POST /users (create new user account)
  
* GET /users/<int:id> (read my account, also will be serialized to include reads for user's curr_meds, faves, and conditions)
* PATCH /users/<int:id> (update my account info, including name/email and adding and removing curr_meds, faves, conditions)
* DELETE /users/<int:id> (delete account)
  
* GET /medications/<int:id> (read specific medication info)
  
* GET /conditions (read list of conditions)
  
* GET /conditions/<int:id> (read a specific condition and all meds associated with it for RXMatch)
  
* POST /login (login is a POST request)
* POST /logout (logout is a POST request)


## Data Models and Relationships:
<img width="634" alt="Screenshot 2023-10-23 at 2 35 16 PM" src="https://github.com/Varlotte/phase-5-project/assets/32116877/4694f93a-e5a4-4191-8bc0-4e82ab19d1aa">

### Relationships:
* A user can fave many medications
* A medication can be faved by many users
* A user has many current medications
* A medication can be currently used by many users
* A user can have many conditions
* A condition can affect many users
* A medication can treat many conditions
* A condition can be treated by many medications

## Validations:
* Name must be a string longer than 0 characters.
* Users must be older than 18.
* Password must be longer than 12 characters.
* Email must contain '@' symbol.

## Stretch Goals:
1. Drug interactions.
2. Letting users rate their experiences with their current medications.
3. Including commonly prescribed dosages for medications.
4. Including more than four conditions.
5. Tracking side effects.
6. Allowing users to leave notes and ratings about providers.
7. Allowing users to search by active medications (with a link to Medlineplus.)
8. Printable/mobile-friendly version of the faved meds page.

## If Scaling Down is Necessary:
1. Remove the curr meds and user conditions tables tracking current treatment and conditions and just let users focus on future doctor appointments.
2. Make RXMatch a list, not a Tinder-like UX swipe.

## Risks:
* Hopefully the National Library of Medicine/National Institutes of Health/FDA APIs have everything I need for drug info.
* In the real world, this would take maneuvering for HIPAAA compatibility.
* There might be too many relationships for this stage of the project (see above for things I can cut.)
