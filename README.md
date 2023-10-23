# RXGnosis: Take control of your doctor's appointment

## The Pitch: 
Statistically, most doctors' appointments in this country last an average of 17.4 minutes.
In that time, patients are often prescribed medications with little time for dialogue with a provider about side effects, interactions, or even correct dosage information.
Enter RXGnosis: a tool that empowers patients to come to doctor's appointments with knowledge about commonly prescribed medications and their side effects for common mental health conditions.

## User Stories:
* Users will be able to create a secure RXGnosis account where they'll record their current diagnoses and prescriptions. 
* From there, they'll be able to read up on four of the most common mental health diagnoses: depression, anxiety, ptsd, and adhd.
* Clicking into one of these conditions will show a short description and a link to RXMatch. 
* RX Match feature works just like tinder, but for mental health care. Patients will be able to use the accessible interface to swipe through reliable information from a federal API about commonly prescribed medications for a treatment, view side effects, and save the medications that look most relevant to their needs.
* Users will be able to show their faved meds list to providers in appointments to better advocate for their own care and be a more informed part of a greater health care conversation.

## Caveats:
1. This is not a diagnostic tool. There will be clear disclaimers on the side indicating that this tool is for people who already have their diagnosis from a professional. We'll also provide resources to our data sets and sources and recommend users not use WebMD.
2. Not all medications or treatment plans will be on here, especially off-label prescriptions. This won't be all-inclusive, and there will be disclaimers for that.
3. There will probably need to be a disclaimer here about HIPAA if this ever goes public.

## CRUD functionality:
* C- create user account, create my fave
* R- read my account info, read medication info, read condition info, read my faves
* U- update my account info
* D- delete my account, delete my fave (aka unfave)

## Wirefame Sketches:
![CFECD5EA-F677-4B93-95A2-B4F06D1E241B_1_102_o](https://github.com/Varlotte/phase-5-project/assets/32116877/6db9e010-e216-43cc-9dea-2dadf265a6d7)

## API Contract: 
tentative routing
GET /user/<int:id> (read my account)
GET /medication (full medication list for RXMatch)
GET /medication/<int:id> (read specific medication info)
GET /fave_medication (read fave medications list)
GET /curr_medication (read user curr medications list)
GET/conditions (read list of conditions)
GET/conditions/<int:id> (read a specific condition)
PATCH /user/<int:id> (update my account info)
PATCH /user/curr_medication/<int:id> (update specific curr_medication to reflect what user is prescribed and taking)
PATCH /user/condition/<int:id> (update user condition to reflect most accurate diagnosis)
POST /user/<int:id> (create new user account)
POST /user/login (login is a POST request)
POST /fave_medication/<int:id> (add new fave medication to user fave list)
DELETE /fave_medication/<int:id> (delete fave medication if user no longer wants to save it)
DELETE /curr_medication/<int:id> (delete specific curr_medication if user is no longer prescribed or taking it)
DELETE /user/<int:id> (delete account)
DELETE /user/condition/<int:id> (delete user condition i.e., delete a diagnosis if no longer relevant)

## Frontend Components making API requests:
1. Login/Create Acct: POST /user/<int:id>, POST /user/login 
2. My Acct: GET /user/<int:id>, GET /fave_medication, GET /curr_medication, PATCH /user/<int:id>, PATCH /user/curr_medication/<int:id>, PATCH /user/condition/<int:id>, DELETE /fave_medication/<int:id>, DELETE /curr_medication/<int:id> DELETE /user/<int:id>, DELETE /user/condition/<int:id> 
3. Conditions: GET/conditions and GET/conditions/<int:id>
4. RXMatch: GET to /medication, POST /fave_medication/<int:id> (add new fave medication to user fave list), 
5. My Faves: GET to /fave_medication, POST to /fave_medication/<int:id>, DELETE to /fave_medication/<int:id>
6. Specific Medication Details: GET to /medication/<int:id>
7. Resources: this one won't make requests, it'll be a static list of further resources

## Data Models and Relationships:
<img width="634" alt="Screenshot 2023-10-23 at 2 35 16 PM" src="https://github.com/Varlotte/phase-5-project/assets/32116877/4694f93a-e5a4-4191-8bc0-4e82ab19d1aa">

### Relationships:
* Many users can fave many medications
* Many medications can be faved by a user
* A user has many curr medications
* A curr medication has many users
* A user can have many conditions
* Many conditions can affect many users
* A medication can treat many conditions
* A condition can be treated by many medications

## Validations:
* Name must be a string longer than 0 characters.
* Users must be older than 18.
* Password must be longer than 12 characters.
* Email must contain '@' symbol and '.'

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
1. Cut the swiping function and just make commonly prescribed meds a clickable list.
2. Remove the curr meds and user conditions tables tracking current treatment/conditions and just let users focus on future doctor appointments.

## Risks:
* Hopefully the National Library of Medicine/National Institutes of Health APIs have everything I need.
* In the real world, this would take maneuvering for HIPAAA compatibility.
* There might be too many relationships for this stage of the project.
