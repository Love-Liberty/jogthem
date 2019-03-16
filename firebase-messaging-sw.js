importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyDe4TVROJcbVJfSZ5WkTZdfK7bWXlnx18Q",
        authDomain: "jogthem.firebaseapp.com",
        databaseURL: "https://jogthem.firebaseio.com",
        projectId: "jogthem",
        storageBucket: "jogthem.appspot.com",
        messagingSenderId: "593287500713"
      };
      firebase.initializeApp(config);

/*2016 version
//Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
    'messagingSenderId': 'YOUR-SENDER-ID'
  })

*/


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

/*2016 version

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});



*/


      
/* messaging.onMessage(function(payload) 
console.log('onMessage: ', payload);


{
  "message":{ 
    "token":"e74BYS0qb7Y:APA91bFfB-67cS_D8cfeSt6P9UjjO0ogHYeHmUbhgIpYDyG-eK2raE9w1RejjUJT_9ZGw-y0NdvyGVZ6riskWwr883X1uSkjlu3fKseeie0xb4Pp1mb-NM9Y7oNTZvtZZQyC_H1fhmdD",
    "notification":{
      "title":"Portugal vs. Denmark",
      "body":"great match!"
    }
  }
}


{
"message": {
    "token": "YOUR_TARGET_APP_TOKEN",
    "data": {
        "title": "FCM Message",
        "body": "This is a Jog",
        "icon": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
        "link": "https://jogthem.firebaseapp.com"
    }
}
the following is rejected in CLI:
curl -X POST -H "Authorization: key=AIzaSyDe4TVROJcbVJfSZ5WkTZdfK7bWXlnx18Q" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:8081"
  },
  "to": "e74BYS0qb7Y:APA91bFfB-67cS_D8cfeSt6P9UjjO0ogHYeHmUbhgIpYDyG-eK2raE9w1RejjUJT_9ZGw-y0NdvyGVZ6riskWwr883X1uSkjlu3fKseeie0xb4Pp1mb-NM9Y7oNTZvtZZQyC_H1fhmdD"
}' "https://fcm.googleapis.com/fcm/send"


<!-- 
e74BYS0qb7Y:APA91bFfB-67cS_D8cfeSt6P9UjjO0ogHYeHmUbhgIpYDyG-eK2raE9w1RejjUJT_9ZGw-y0NdvyGVZ6riskWwr883X1uSkjlu3fKseeie0xb4Pp1mb-NM9Y7oNTZvtZZQyC_H1fhmdD
-->

*/

