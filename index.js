const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
/*
exports.helloWorld = functions.https.onRequest((request, response) => {
    var title = 'Test title';//request.body.title;
    var body = 'Build that body';//request.body.body;

    const payload = {
        notification: {
            title: title,  //error on console says this has invalid Message (well its null isn't it?)
            body: body,
            icon: '/path/animagelocation.png',
            click_action: "https://www.wheretheygowhentheyclick.com"
        }
    };
    admin.messaging().sendToDevice(["dTUDhRnUvzY:APA91bHiV-0uVk29Kl-IUYrsEaKLL0rGDtdxqPwJZDKPO5a08ZvcdxnD1xup4hxqA9OYLUII1bV1Xo9uMVK6kHbTEoRiW7tbRh8t0sxHucSDcQukESWLpmtomYuaU97kKiAxD50Mw4GP"], payload);

});
*/

exports.checkForMessageThenSend = functions.firestore
    .document('messages/{messageId}')
    .onCreate((change, context) => {
          // Get an object representing the document
          // e.g. {'title': 'The title of the new message', 'body': 'the actual new message'}
      const newMessage = change.data();

      if(newMessage){
      // access a particular field as you would any JS property
      const creator = newMessage.creator;
      const title = newMessage.title;
      const body = newMessage.body;
     // const expiresDays = newMessage.expiresDays;
     // const topic = newMessage.topic;

        console.log('Data from firestore: ', creator,' ', title, ' ', body);//works visible on firebase console 19:49 16/3/2019

      const payload = {
        notification: {
            title: title,  
            body: body,
            //icon: '/path/animagelocation.png',
            //click_action: "https://www.wheretheygowhentheyclick.com"
        }
    }; //test by sending the newly created message to user test@tets.test whose device has the following FCMToken
    var token = "dTUDhRnUvzY:APA91bHiV-0uVk29Kl-IUYrsEaKLL0rGDtdxqPwJZDKPO5a08ZvcdxnD1xup4hxqA9OYLUII1bV1Xo9uMVK6kHbTEoRiW7tbRh8t0sxHucSDcQukESWLpmtomYuaU97kKiAxD50Mw4GP";
    return admin.messaging().sendToDevice([token], payload).catch(function(error) {
        console.error("Error sending message: ", error);
    });
      }
      else{
        return new Promise((resolve,reject)=>{
    //actions - I have no idea what I am doing
        reject("Returning rejected for some reason");
});
}



      // perform desired operations ...
    });
