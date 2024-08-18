# Smelly Earnie
__‘Smelly Earnie’ is an app for 3- to 7-year-olds to learn good behaviours.__

![Login and register screens](https://github.com/user-attachments/assets/a9441841-6d5b-440a-b8e4-e0bd367062cc)

Features include:
* Define rewards
* Define goals
* Define tasks
* Define how many points a task or a reward is worth
* Log positive (‘earnie’) and negative tasks (‘smelly’)
* Define user roles and access level permissions
* Onboarding sequence to set up an account
* Adults’ app view differ from Kids’ view. Kids’ view is built for tablets, the user interface accommodates for low dexterity and does not require literacy (suitable for very young children).
* Children see their progress visualised as a picture story.

![Various screenshots of the application](https://github.com/user-attachments/assets/dc90b7d0-5986-4c8b-b01c-f00236d4d19c)


## Deployment
Try it out: https://smelly-earnie-7519489a8af6.herokuapp.com/

## Techonology
* React
* Django/Python
* PostgreSQL
* Cloudinary

## Project Brief
Build a full stack application and deploy it online. Requirements include:
* Use the Django REST Framework to serve your data from a Postgres database.
* Multiple relationships and CRUD functionality for at least a couple of models.
* Consume your API with a separate front-end built with React.
* Visually impressive design.

### Timeframe & Team
Worked solo over 2 weeks

## Planning
### Application audit
'Smelly Earnie' is based on an app I had previously made using a low code tool. I started by mapping this out.

![Audit the structure of previous app](https://github.com/user-attachments/assets/2adb28c6-cc7c-4653-9ef5-ff2dfac20979)

### Database ERD (Entity Relationship Diagram)

![Entity Relationship Diagram](https://github.com/user-attachments/assets/3e6e13be-ca37-4901-8f6d-fefa6756c2a1)

### Determine access levels for different user roles

![Access level plan](https://github.com/user-attachments/assets/6f644d89-74f6-4c99-a8de-9213120b2497)

### Map out application structure and end points

![Flowchart of current application structure and end points](https://github.com/user-attachments/assets/a27820f2-bfd2-4fd8-82b1-479261fe2a89)


### Low fidelity wireframes

### UX click through usign Adobe XD

## Build/Code Process
I started on the back end. Set up a pipenv shell and installed Django. Define the database schema and end points. Set up model serializers, controller views, JSON Web Token authentication, secured routes and custom permission levels. Create and populate with seed data. Test each end point for each relevant access level. When the end points worked as intended, I added the front end.

I managed the build by defining user stories. Break them into tasks, then prioritise them using a kanban board.

## Reflections
### Challenges
This project combined a number of code/ frameworks I had not used before (python, Django, SQL, relational databases).

Getting to grips with permission levels and keeping track of which tasks corresponding with which access level and why.


### Wins
Built and deployed a working application that achieves its key benefits for the target audience it was designed for.

Have different user interfaces for adults and children, displayed automatically depending on the permission level of the account logging in.

### Key Learnings/Takeaways
* The project and scope were ambitious.
* Having access levels meant the no. of end points that needed testing was multiplied.
* Learned to design relational databases, make ERDs.
* The nature of SQL made it tricky to iterate data points as the build evolved.

## Bugs
Known bugs have been fixed so far.

## Future Improvements
Tasks not yet completed include:
* The children’s user interface
* Total point calculation for tasks associated with a reward goal.
