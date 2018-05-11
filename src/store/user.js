import firebase from 'firebase';
import store from '.';
import history from '../routes/history';
import { userRef } from '../base';


const SET_USER = 'SET_USER';
const SIGNUP_USER = 'SIGNUP_USER';
const LOG_OUT = 'LOG_OUT';

export const setUser = user => ({ type: SET_USER, user });
// export const signUpUser = user => ({ type: SIGNUP_USER, user })
const logOut = () => ({ type: LOG_OUT });

const initialState = {
  email: '',
  isLoggedIn: false
};

export const signUpUser = email => async dispatch => {
  const info = {
    email: email,
    charts: [12312312]
  }
  userRef.push().set(info, snapshot => {
    dispatch({
      type: SIGNUP_USER,
      email: info.email
    });
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
      return history.push('/timelines');
    })
    .catch(() => console.log('failed to logout'));
};

export default function(user = initialState, action) {
  switch (action.type) {
  case SET_USER:
    return { user: action.user, isLoggedIn: true };
  case LOG_OUT:
    return initialState;
  case SIGNUP_USER:
    return { user: action.user, isLoggedIn: true };
  default:
    return user;
  }
}
