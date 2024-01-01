import {useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/messaging';
// import {firebaseConfig} from './constants';

export const firebaseConfig = {
    apiKey: "AIzaSyAs3wCyAs9NnAMjKsnIRli_LO7HrAMv3e4",
    authDomain: "madam-boutique-fcm.firebaseapp.com",
    projectId: "madam-boutique-fcm",
    storageBucket: "madam-boutique-fcm.appspot.com",
    messagingSenderId: "355542446507",
    appId: "1:355542446507:web:b60293f7ac5b04fc7c22ee",
    measurementId: "G-2QZQHS3KGZ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

let messaging: firebase.messaging.Messaging;

if (typeof window !== "undefined") {
    if (firebase.messaging.isSupported()) {
        messaging = firebase.messaging();
    }
}

export const getMessagingToken = async () => {
    let currentToken = "";
    if (!messaging) return;
    try {
        currentToken = await messaging.getToken({
            vapidKey: process.env.REACT_APP_FIREBASE_FCM_VAPID_KEY,
        });
        console.log("FCM registration token", currentToken);
    } catch (error) {
        console.log("An error occurred while retrieving token. ", error);
    }
    return currentToken;
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });
