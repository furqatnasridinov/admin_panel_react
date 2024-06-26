import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { store } from "../store/store"
import { sendPhoneNumber, updateFcmToken } from '../features/register';
import AppConstants from '../config/app_constants';


const firebaseConfig = {
    apiKey: "AIzaSyAeABzvvgzb5sBX52l6znygHm-hexDUfsA",
    authDomain: "myfit-49385.firebaseapp.com",
    projectId: "myfit-49385",
    storageBucket: "myfit-49385.appspot.com",
    messagingSenderId: "116248897950",
    appId: "1:116248897950:web:a1ecbc3727b3499d1f8e8f",
    measurementId: "G-DEX4718V93"
  };

  initializeApp(firebaseConfig);


const messaging = getMessaging();

export const RequestForToken = async () => {
  console.log("Requesting User Permission......");
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification User Permission Granted.");

    // Проверяем, есть ли уже токен в localStorage
    const existingToken = localStorage.getItem(AppConstants.keyFcmToken);
    if (existingToken) {
      console.log('Existing token found: ', existingToken);
      return;
    }

    try {
      const currentToken = await getToken(messaging, {vapidKey: AppConstants.vapidKey});
      if (currentToken) {
        // Сохраняем токен в localStorage
        localStorage.setItem(AppConstants.keyFcmToken, currentToken);

        const body = {
          fcmToken: currentToken,
        };
        // запрос будет изменен на updateFcmToken
        store.dispatch(updateFcmToken(body));
        console.log('Client Token: ', currentToken);
      } else {
        console.log('Failed to generate the registration token.');
      }
    } catch (err) {
      console.log('An error occurred when requesting to receive the token.', err);
    }
  } else {
    console.log("User Permission Denied.");
  }
}

  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

