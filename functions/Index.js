const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//adding 5 april 2019. Is this the missing code?? Nothing showing up at all, not even log to console
/*
admin.initializeApp({
  credential: admin.credential.applicationDefault()
}); //seems odd to initialise again. https://firebase.google.com/docs/cloud-messaging/auth-server
//says has to be done. Is that out of date info?
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
      //const senderFCMtoken = newMessage.FCMtoken; //Test to make send to self easier
      //const expiresDays = 2; //default is 4 weeks
     // const topic = newMessage.topic;

 //Trying the token for Grummy
 //var token = "em4JmnzG5Cw:APA91bHgTGfF-hubAxbpzmCIE5TdfqIluRbzADoZnsnotvK0IsSVgfn47IAHEJj0nPfB98rdG90mdgCkISnZMAOYSz19nr3r61u0xk9h__AFzRkK4PvCjZm0qrU5kln9ceNcaTa9n6Lk";
 //Received 2 messages ! But ephemeral only stayed a few seconds

 //this is a TEST token that needs to be updated now and then... it is for tester@gmail.com
 var token = "dIlKjT-2xPo:APA91bH739X7naDbsI5yZzoYUqtbRBW2hHRHauwDH_xl9oq6t3S0j0HtXSOuYmQwKtN5H-RUjlTgkrr7UIyXJ30ggufmLG9MXdGEMKWGIPEzpS09r4D5MeW9RuhGYoQsqmC7gD1YaWKO"; 
// console.log('Data from firestore: ', creator,' ', title, ' ', body);//works visible on firebase console 19:49 16/3/2019

/* tried a couple of variations.. didn't work
admin.firestore.collection("users").doc("jMm42qFFQvZaSqFkOx9q7zNLEvk1").get()
  .then(function (doc) {
    token = doc.data().FCMtoken; 
    console.log('Token used: ', token); 
  })
  .catch(function (error) {
    console.error("Error 'users': ", error);
  });
*/




      const payload = {
        notification: {
            title: title,  
            body: body,
            sound:'IFeelTheForce.mp3', //perhaps only on iOS?
            icon: 'typewriter.jpg',
            click_action: "https://jogthem.firebaseapp.com"
        }
    }; //test by sending the newly created message to the sender 
   return admin.messaging().sendToDevice(token, payload).then((response) => { console.log(creator,' ', title, ' ', body, response)
          }).catch(function(error) {
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
