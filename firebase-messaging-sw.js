importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');
importScripts('/__/firebase/init.js'); //Error:app already exists, but if removed Error:method only available in window

// Initialise Firebase (hopefully with the correct details)

  var config = {
    apiKey: "AIzaSyDe4TVROJcbVJfSZ5WkTZdfK7bWXlnx18Q", //checked
    authDomain: "jogthem.firebaseapp.com",
    databaseURL: "https://jogthem.firebaseio.com",
    projectId: "jogthem",
    storageBucket: "jogthem.appspot.com",
    messagingSenderId: "593287500713"       //checked
  };
firebase.initializeApp(config);

/*
 firebase.initializeApp({
  'messagingSenderId': '593287500713'  //does this work? No difference.
})
*/
  console.log('Messaging-sw.js called ');//fails

/*
Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/
const messaging = firebase.messaging()

messaging.onMessage(function(payload) {
  console.log('Message received. ', payload);
  // ...
});


messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  /*const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
    
  };
*/
 // return self.registration.showNotification(notificationTitle,
 //     notificationOptions);
});



/*  the below seems to log errors "messaging is only available in a window context.  Failed to update a serviceWorker"
const messaging = firebase.messaging();


messaging.requestPermission()  //deploy throws error this line is anonymous AND my messaging page now fails to update serviceWorker
.then(function () { 
  console.log('Permission granted');
                //serve  error 29  messaging: this method is only available in a window context
  return  messaging.getToken();
})
.then(function(token){
  console.log(token);
})
.catch(function (err) {
  console.log('Failed either permission or getting token', err);
})

messaging.onMessage(function(payload){
  console.log('onMessage: ', payload);
});

*/



