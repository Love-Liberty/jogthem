# jogthem

The files which are deployed as at 24 March 2019 are

index.html

get-FCMtoken.js

index.js a cloud FUNCTION here called functionIndex.js to not be confuse with a local script. It is deployed on cloud functions

messaging-sw.js (serviceworker) < something wrong here 

mainfest.json

style.css

The other files listed at github were test files which have been mostly incorporated in index.html

The parts which are currently not working:

On deploy the fetching of an FCM token is failing (although it used to work, and does work on localhost)

When it was working the function sent notifications and console connfirmed this, but I never saw them arrive. A friend who helped test them saw them arrive but then disappear within a few seconds. He was using a PC and Firefox.

There are also two uncaught errors that do not stop the process. One is that messaging-sw.js tries to initailise or load firebase when it already exists. The other is a warning that the serviceworker is not correctly evaluated. (But in local host the code continues to completion)

======================================

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
