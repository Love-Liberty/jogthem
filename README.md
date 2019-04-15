# jogthem

April 15 2019   System probably working. 

Index allows sign-up to receive notifications, (or sign in to see own account details and have option to delete account).
Authorised persons have access to the message sending page.
From there it is possible to send notifications to all the persons who have signed-up to the system.

If you want to fork this, there are extra files to make creating the database easier. 




--------------------

26 March notifications can be received when in localhost but not when in .com  || No idea why.

26 March added manifest.json to index.html (No idea if it matters)


The files which are deployed as at 24 March 2019 are


messaging-sw.js (serviceworker) < something wrong here 

get-FCMtoken.js

index.html

mainfest.json

messageInput.html

-------------------

functions/ index.js a cloud FUNCTION

css/style.css

utilities/ contains webpages that can display the users collection, delete entries and request FCM token. Not directly called from the index page.

Almost everything is incorporated in index.html  

Sign-up, sign-in  (Combinging Auth() and creating a user collection document on firestore
Sign-out, delete account  (delete removes the Auth() entry and deletes the firestore user doc
request notifications (request FCM token and store in user document)

The only other page is messageInput which is an input form for title and body of a notification which writes to the messages collection at firestore. Latest version for test sends the FCMToken of the person sending the message. (It send when sending to another test participant, but now seems to fail completely, although the function log reports success)

A single function reacts to creation at the messages collection and sends the message via FCM. (Presently under test 24 March)
(It writes the success or failure to the firebase console)

The parts which are currently not working 24 March 2019:

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
