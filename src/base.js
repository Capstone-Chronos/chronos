// import Rebase from 're-base';
import firebase from 'firebase';

// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
// };

const config = {
  apiKey: "AIzaSyC9SQR3zvO9dMq4tMHAW1GtGnDOGPdTyqU",
  authDomain: "chronos-d08ff.firebaseapp.com",
  databaseURL: "https://chronos-d08ff.firebaseio.com",
  projectId: "chronos-d08ff",
  storageBucket: "chronos-d08ff.appspot.com",
  messagingSenderId: "915480064490"
};

const app = firebase.initializeApp(config);
// const base = Rebase.createClass(app.database());


//REFS
const databaseRef = firebase.database().ref();
const userRef = databaseRef.child('users')
const chartsRef = databaseRef.child('charts')

const googleProvider = new firebase.auth.GoogleAuthProvider();


export { app, googleProvider, userRef, chartsRef };
