SA - Angular Accessibility Ticket Tracker
=========================================

Before you get started, you’ll need to:
---------------------------------------

### 1. Create a new Firebase backend database

You will need to go to [Firebase.com](https://www.firebase.com/) to create the new database. 

### 2. Update the path to your Firebase backend database URL in the source

* To update the Firebase URL go to line 16 of the "/app/scripts/app.js" file.
* This line: .value('fbURL', 'https://yourFireBaseDB.firebaseio.com/')