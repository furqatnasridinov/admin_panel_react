/* // Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyAeABzvvgzb5sBX52l6znygHm-hexDUfsA",
    authDomain: "myfit-49385.firebaseapp.com",
    projectId: "myfit-49385",
    storageBucket: "myfit-49385.appspot.com",
    messagingSenderId: "116248897950",
    appId: "1:116248897950:web:a1ecbc3727b3499d1f8e8f",
    measurementId: "G-DEX4718V93"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
//const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      //icon : "",
    };
  
   return  self.registration.showNotification(notificationTitle, notificationOptions);
  }); */