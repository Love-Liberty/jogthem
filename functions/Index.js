const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//Functions to: 
  //find new jogthem users and subscribe them to a topic
  //read and send messages to that topic
  //unsubsribe deleted users


 //added the below 20.05 11.04.2019 from other file
//Subscribe the new user to a fixed topic (Later:could add extra topics in db and read that)
// v 16:47.10.04.2019  
/*
admin.initializeApp({
  credential: admin.credential.applicationDefault()
}); //seems odd to initialise again. https://firebase.google.com/docs/cloud-messaging/auth-server
//says has to be done. Is that out of date info?
*/


//     Subscribe    working   16:47.10.04.2019

exports.checkForNewUserSubscribeToTopic = functions.firestore.document('users/{userId}')
  .onUpdate((change, context) => {              //onCreate was too early. FCMtoken was not yet listed

    // Taken userID from database and the messaging token "FCMtoken" which is a string stored in users doc
    //and send to messaging system which will register the FCMtoken in the messaging systm by topic
    //userId is not used, but helps in logging to console

    const user_Id = context.params.userId;
    const FCMtoken = change.after.data().FCMtoken;
    // Reading the data works. 23.22.09.04.19

    const topic = "creatorMain";
   //how prevent multiple instances of subscribe?
    console.log('User_id: ', user_Id, ' FCMtoken: ', FCMtoken);//     

    return admin.messaging().subscribeToTopic(FCMtoken, topic).then((response) => {
      console.log(" Successfully subscribed", response);
     
    }).catch(function (error) {
      console.error("Error subscribing: ", error);
      //subscribing works 16:47.10.04.2019
    });
  });


   //added the above 20.05 11.04.2019 from other file






    //NEW funtion below added 20.05 11.04.2019  untested

//     unsubscribe    

  exports.checkForDeletedUserUnsubscribeToTopic = functions.firestore.document('users/{userId}')
  .onDelete((change, context) => {              //onCreate was too early. FCMtoken was not yet listed

    // Taken userID from database and the messaging token "FCMtoken" which is a string stored in users doc
    //and send to messaging system which will register the FCMtoken in the messaging systm by topic
    //userId is not used, but helps in logging to console

    const user_Id = context.params.userId;
    //const FCMtoken = change.before.data().FCMtoken; //error can't read data of undefined
    const FCMtoken = change.data().FCMtoken; // try this 20.30
    // Reading the data works. 23.22.09.04.19

    const topic = "creatorMain";
   //how prevent multiple instances of subscribe?
    console.log('User_id: ', user_Id, ' FCMtoken: ', FCMtoken);//     

    return admin.messaging().unsubscribeFromTopic(FCMtoken, topic).then((response) => {
      console.log(" Successfully unsubscribed", response);
     
    }).catch(function (error) {
      console.error("Error unsubscribing: ", error);
      //subscribing works 16:47.10.04.2019
    });
  });
    //NEW funtion above added 20.05 11.04.2019






//  Send message to topic      worked 13.47 11.04.2019 sent to Oz 

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
      const topic = "creatorMain";

     // const topic = newMessage.topic; //if read a topic from db 

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
      //  topic: topic  //threw { results: [ { error: [Object] } ] or was that error from the console.log of response ?
    }; //test by sending the newly created message to the sender 

    //april 10 testing send to embedded topic. Working after removed console.log() April 11
    return admin.messaging().sendToTopic(topic, payload).then((response) => { 
     // console.log(creator,' ', title, ' ', body, response);  //throws error [object]
     // console.log(response.results[0].error); //error can't read 0 of undefined
     // if(response && response.results && response.results[0]  ??
  }).catch(function(error) {
console.error("Error sending message: ", error);
    });  

  
  
    /* the following send to device worked 
   return admin.messaging().sendToDevice(token, payload).then((response) => { console.log(creator,' ', title, ' ', body, response)
          }).catch(function(error) {
        console.error("Error sending message: ", error);
            });
            */


          } //if
      else{
        return new Promise((resolve,reject)=>{
    //actions - I have no idea what I am doing
        reject("Returning rejected for some reason");
});
}



      // perform desired operations ...
    });
