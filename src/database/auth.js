import { app } from '../base';
import store, { setUser, signOut } from '../store';
import history from '../routes/history';
import firebase from 'firebase';


export async function getUserInfo() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      store.dispatch(setUser(user.email, user.uid));
      history.push('/charts');
    }
  });
}
