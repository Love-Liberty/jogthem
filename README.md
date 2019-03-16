# jogthem
A painful learning experience of Firebase javascript, firestore and FCM by someone who once knew PHP and mySQL

The project uses

Firebase hosting (stores and displays the website)

Firebase Authentication (keeps track of sign-ups, sign in and sign out, and creates a unique ID for user)

Firebase firestore (noSQL database, where any data is stored and read)

Firebase Functions (this is server side code)

Firebase Cloud Messaging (which can send notifications to users' devices) <= Not yet working


At March 16 2019
Working parts
Sign-up with email and password

That connects to Firebase auth and also writes the same user uniqueID (supplied by Auth) to the firestore database with email and user name

It is possible to sign out or delete the account, sign up and sign in

The user can see the user's account details

There is a page called messaging which connects to the Firebase Cloud Messaging system and obtains a unique token for that user. That token is stored in the user's account on the database.

A function is running on the Firebase Functions server. This watches for changes to the "messages" section of the database. This responds when a change is made to the database. Currently it only logs the content of the database to the console at Firebase

Problem: It is supposed to send a notifaction, but I see no notification
