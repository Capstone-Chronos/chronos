import Rebase from 're-base';
import firebase from 'firebase';
import configObj from './secrets';

const config = configObj;

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { app, base, googleProvider };
