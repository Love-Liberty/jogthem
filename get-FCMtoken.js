    const messaging = firebase.messaging();
    const publicVAPIDKey = 'BA0J3FxC7OARlNQdw9YTA_VviemC_4bQH2EiStd2eQXO9YaDtKOkIFQvg41iWcDAInDScxWh0lTgc5NuwaqHPaM';
    //key from settings web push key pair

    var user, user_uid;

  function getFCMtokenSendToServerAskPermission(){
    firebase.auth().onAuthStateChanged((user) => {
    //  if(deleteError) return;  // NEW  v23.54.09.04.19  //If user tried to delete account, but failed, no reason to refresh token
      if (user && !deleteError) {
        user_uid = user.uid; email_id = user.email;
        console.log("onAuthStateChange says user id=", user_uid, email_id)
        console.log('get-FCMtoken v23.54.09.04.19');
          console.log("onAuthStateChanged()  says user=", user) //works

        //messaging.usePublicVapidKey(publicVAPIDKey); //on page refresh this works. But error if click again.
//???????????   is the above needed????

        //page refesh triggers StateChange. But why does that matter?
        //moving to after get token made no difference. So 
        //try to prevent second click by hiding button...
          console.log('Going to request permission for', user_uid);

        messaging.requestPermission(user_uid).then(function () {
          console.log('Notification granted for user_uid', user_uid);
          //Do stuff here
          getInstanceToken(user); //send to server here?
        }).catch(function (err) {
          console.log('Failed to get permission');
        });
      }
      else {
        console.log("Not looking for token. Either Auth() says User id null= or Delete Error", email_id, deleteError);
      }
    })
  }

     function getInstanceToken(user) {
      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      messaging.getToken().then(function (currentToken) { //sometimes failing on deploy version
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
        console.log('Error in:  messaging.getToken().then [40]', err);
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

    //< deployed and served without this. No message received. Then when changed back to how it had been.. still not working. Seems the browser continues to instance of old file???
    //This is insane
   
//Lost internet during tests. 2050 April 6
//Looks like message is displayed when in background
//No yet sure what happens without onMessage. On localhost result is nothing?
// Not sure yet.
    messaging.onMessage(function (payload) {  //
      try{  //try???
      console.log('Message received. ', payload); 
      
        //var notification = new Notification('test','body test'); //6 April even though docs say this is optional, that sdk shows notifactions automatically
        //trying this 6 April... to see if there is some way to get notifications to appear, even though docs say it is automatic

      noteTitle = payload.notification.title; 
      noteOptions = {
        body: payload.notification.body,
        icon: "typewriter.jpg",  //<<<<<<<<<<<<<<<<<<<<<<======================= put creator icon here
      };

      console.log("title ",noteTitle, " ", payload.notification.body);
          //var //removing var - no difference
          //notification = //taking this out No difference. Still goes to tray
      new Notification(noteTitle, noteOptions);
    }
    catch(err){
      console.log('Caught error: ',err);
    }
       // var data = payload.val();  //How do you display a notification? surely it is supposed to be automatic???
       // console.log('Data?. ', data);
      //alert('Title?');
    });
    

function sendTokenToServer(user,currentToken){  
  if(deleteError) return; // the user may have tried to delete account. Don't try to update token
  db.collection('users').doc(user_uid).update({   // function wants to listen to this and subscribe it, but maybe needs to be a new doc on its own?
            FCMtoken: currentToken
          })
            .then(function () {
              console.log("Token written to doc with ID: ", user_uid, " ",currentToken);

            })
            .catch(function (error) {

              console.log(error);

            })
}

/*

<!-- Copyright 2019 Trinity Group
Parts of this software may have been obtained from https://firebase.google.com/docs/web/setup
which states that code samples are licensed under the Apache License, Version 2.0 (the "License");
you may not use those parts of this file except in compliance with the License.
You may obtain a copy of the License at  https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

All other parts and the whole of the software is PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
-->
*/
