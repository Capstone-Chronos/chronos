import firebase from 'firebase';

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

export const setUser = user => ({ type: SET_USER, user });
export const logOut = () => ({ type: LOG_OUT });

const initialState = {
  email: '',
  isLoggedIn: false
};

const logOutThunk = () => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log('Scuccess'))
    .catch(() => console.log('fail'));
};

export default function(user = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.user, isLoggedIn: true };
    case LOG_OUT:
      return initialState;
    default:
      return user;
  }
}
