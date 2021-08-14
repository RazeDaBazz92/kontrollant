import firebase from 'firebase'
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLEKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID + ".firebaseapp.com",
    databaseURL: "https://" + process.env.NEXT_PUBLIC_FIREBASE_PROJECTID + "-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID + ".appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDER,
    appId: "1:" + process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDER + ":web:8102d416c30047d00603fa",
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
export default firebase;