const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



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
      const senderFCMtoken = newMessage.FCMtoken; //Test to make send to self easier
      //const expiresDays = 2; //default is 4 weeks
     // const topic = newMessage.topic;

        console.log('Data from firestore: ', creator,' ', title, ' ', body);//works visible on firebase console 19:49 16/3/2019
 //FCMtoken for playadance
// var token = "dTUDhRnUvzY:APA91bHiV-0uVk29Kl-IUYrsEaKLL0rGDtdxqPwJZDKPO5a08ZvcdxnD1xup4hxqA9OYLUII1bV1Xo9uMVK6kHbTEoRiW7tbRh8t0sxHucSDcQukESWLpmtomYuaU97kKiAxD50Mw4GP";
var token = senderFCMtoken;
//token = newMessage.sendToToken; //if database doc had the destination toke included, testing would be easier?

 //Trying the token for Grummy
 //var token = "em4JmnzG5Cw:APA91bHgTGfF-hubAxbpzmCIE5TdfqIluRbzADoZnsnotvK0IsSVgfn47IAHEJj0nPfB98rdG90mdgCkISnZMAOYSz19nr3r61u0xk9h__AFzRkK4PvCjZm0qrU5kln9ceNcaTa9n6Lk";
 //Received 2 messages ! But ephemeral only stayed a few seconds

 //var token = "dTUDhRnUvzY:APA91bHiV-0uVk29Kl-"; //Testing what happens with wrong key  - no error messages
      const payload = {
        notification: {
            title: title,  
            body: body,
            //sound:'IFeelTheForce.mp3', //perhaps only on iOS?
            //icon: '/path/animagelocation.png',
            //click_action: "https://www.wheretheygowhentheyclick.com"
        }
    }; //test by sending the newly created message to the sender
   
   return admin.messaging().sendToDevice(token, payload).then((response) => { console.log('THEN', response)}).catch(function(error) {
        console.error("Error sending message: ", error);
        //moved the return to after .catch. Also deleted "return" had no effect.  .then does not seem to run
        //return
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
