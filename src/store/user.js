import firebase from 'firebase';
import store from '.';
import history from '../routes/history';
import { userRef } from '../base';

const SET_USER = 'SET_USER';
const SIGNUP_USER = 'SIGNUP_USER';
const LOG_OUT = 'LOG_OUT';

export const setUser = (email, uid) => {
  return {
    type: SET_USER,
    email,
    uid
  };
};
// export const signUpUser = user => ({ type: SIGNUP_USER, user })
const logOut = () => ({ type: LOG_OUT });

const initialState = {
  isLoggedIn: false,
  email: '',
  id: ''
};

export const signUpUser = user => async dispatch => {
  console.log(user);
  let newUser = userRef.child(user.uid);
  let newUserkey = newUser.key;
  const info = {
    email: user.email,
    charts: [],
    id: user.uid
  };
  newUser.set(info, () => {
    dispatch({ type: SIGNUP_USER, info });
  });
};

// export const signUpUser = userId => async dispatch => {
//     userRef.set('users/' + userId)({
//       username: userId
//     })
//     dispatch({
//       type: SIGNUP_USER,
//       email: userId
//     })
//   }

export const logOutThunk = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      store.dispatch(logOut());
      return history.push('/');
    })
    .catch(() => console.log('failed to logout'));
};

export default function(user = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...user,
        isLoggedIn: true,
        email: action.email,
        id: action.uid
      };
    case LOG_OUT:
      return initialState;
    case SIGNUP_USER:
      return { ...user, user: action.user, isLoggedIn: true, id: action.id };
    default:
      return user;
  }
}
