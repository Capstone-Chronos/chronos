const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

export const setUser = user => ({type: SET_USER, user});
export const logOut = () => ({type: LOG_OUT})

const initialState = {
  email: '',
  isLoggedIn: false
}

export default function (user = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {user: action.user, isLoggedIn: true};
    case LOG_OUT:
      return initialState;
    default:
      return user;
  }
}
