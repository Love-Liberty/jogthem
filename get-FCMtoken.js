    const messaging = firebase.messaging();
    //const db = firebase.firestore();
    const publicVAPIDKey = 'BA0J3FxC7OARlNQdw9YTA_VviemC_4bQH2EiStd2eQXO9YaDtKOkIFQvg41iWcDAInDScxWh0lTgc5NuwaqHPaM';
    //key from settings web push key pair

    var user, user_uid;
    /*    
        var user = firebase.auth().currentUser;
    
        if (user) {
              userId = user.uid; email_id = user.email;
              console.log("isValidUser  says id=", user_uid)
              document.getElementById("Display1").innerHTML = "<i>Valid user uid:</i> " + user_uid + "<p></p><i> Email= </i>" + email_id;
              //return(user_uid); //new idea -seems to fail
            }
            else {
              console.log("User: ", user);
              
            }
    */

  function getFCMtokenSendToServerAskPermission(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user_uid = user.uid; email_id = user.email;
        console.log("onAuthStateChange says user id=", user_uid, email_id)
          console.log("onAuthStateChanged()  says user=", user) //works

    //  messaging.usePublicVapidKey(publicVAPIDKey); //on page refresh this works. But error if click again.
        //page refesh triggers StateChange. But why does that matter?
        //moving to after get token made no difference. So 
        //try to prevent second click by hiding button...

          console.log('Going to request permission for', user_uid);

        messaging.requestPermission(user_uid).then(function () {

          console.log('Notification granted for user_uid', user_uid);
          //Do stuff here
          getInstanceToken(user);
        }).catch(function (err) {
          console.log('Failed to get permission');
        });
      }
      else {
        console.log("Auth() says User id null=");
      }
    })
  }

     function getInstanceToken(user) {
      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      messaging.getToken().then(function (currentToken) {
        if (currentToken) {
          console.log('currentToken=', currentToken)
          console.log('User=', user)  //okay here
          //sendTokenToServer(currentToken);
          console.log('userId =', user_uid); //okay here
          //return

          /*
          WORKS when firebase serve, but throws this error when deploy:
"Failed to register a ServiceWorker: ServiceWorker script evaluation failed", 
stack: "FirebaseError: Messaging: 
We are unable to registe…om/firebasejs/5.8.6/firebase-messaging.js:1:32160

          */

          sendTokenToServer(user,currentToken);
        }
        else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          //updateUIForPushPermissionRequired();
          // setTokenSentToServer(false);
        }
      }).catch(function (err) {
        console.log('An error occurred while retrieving token. ', err);
        //showToken('Error retrieving Instance ID token. ', err);
        //setTokenSentToServer(false);
      });
    }

    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(function () {
      messaging.getToken().then(function (refreshedToken) {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        //setTokenSentToServer(false);
        sendTokenToServer(user,refreshedToken) //don't know if this works
        // Send Instance ID token to app server.
        //sendTokenToServer(refreshedToken);
        // ...
      }).catch(function (err) {
        console.log('Unable to retrieve refreshed token ', err);
        //showToken('Unable to retrieve refreshed token ', err);
      });
    });


    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    //   `messaging.setBackgroundMessageHandler` handler.
    messaging.onMessage(function (payload) {
      console.log('Message received. ', payload);
      // ...
    });

function sendTokenToServer(user,currentToken){
  
  db.collection('users').doc(user_uid).update({
            FCMtoken: currentToken
          })
            .then(function () {
              console.log("Token written to doc with ID: ", user_uid);
              //document.getElementById("FCMtoken").style.display="none";//FAILS (scope?)prevent repeat click
            })
            .catch(function (error) {
              // Handle Errors here.        
              console.log(error);
              //updateUIForPushEnabled(currentToken);
            })
}
