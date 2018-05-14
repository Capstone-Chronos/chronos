import { app } from '../base';
import store, { setUser } from '../store';

export async function getUserInfo() {
  try {
    const user = await app.auth().currentUser;
    let email, uid;

    console.log('logging in', user);
    if (user != null) {
      store.dispatch(setUser(email, uid));
    }
  } catch (err) {
    throw Error(err);
  }
}
