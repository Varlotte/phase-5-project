# RXGnosis: Take control of your doctor's appointment

The pitch: statistically, most doctors' appointments in this country last an average of 17.4 minutes.
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
* C-
* R-
* U-
* D-

## Wirefame Sketches:

## API Contract: 

## Frontend Components making API requests:

## Data Models and Relationships:
<img width="567" alt="Screenshot 2023-10-23 at 12 02 33 PM" src="https://github.com/Varlotte/phase-5-project/assets/32116877/af78b799-d988-424f-a382-7e3e486c029a">

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
