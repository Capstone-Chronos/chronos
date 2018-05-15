import { app } from '../base';
import store, { setUser, signOut } from '../store';
import history from '../routes/history';
import firebase from 'firebase';

// export async function getUserInfo() {
//   try {
//     const user = await firebase.auth().currentUser;
//     let email, uid;
//     console.log('logging in', user);
//     if (user != null) {
//       store.dispatch(setUser(email, uid));
//     }
//   } catch (err) {
//     throw Error(err);
//   }
//   history.push('/charts');
// }

export function getUserInfo(url) {
  firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      await store.dispatch(setUser(user.email, user.uid));
      history.push(url);
    }
  });
}
