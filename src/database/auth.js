import { app } from '../base';
import store, { setUser, signOut } from '../store';
import history from '../routes/history';
import firebase from 'firebase';


export function getUserInfo(url) {
  firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      await store.dispatch(setUser(user.email, user.uid));
      history.push(url);
    }
  });
}
