import { userRef, chartsRef } from '../base';
import firebase from 'firebase';

const initialState = {
  userCharts: [],
  publishedCharts: []
};

const GET_ONE_CHART = 'GET_CHART';
const GET_USER_CHARTS = 'GET_USER_CHARTS';
const DELETE_USER_CHART = 'DELETE_USER_CHARTS';
const GET_PUBLISHED_CHARTS = 'GET_PUBLISHED_CHARTS';

export const getUserCharts = () => async dispatch => {
  let uid = firebase.auth().currentUser.uid;

  chartsRef.once('value', function(snapshot) {
    const foundCharts = snapshot.val();
    return dispatch({
      type: GET_USER_CHARTS,
      userCharts: foundCharts
    });
  });
};

export const getPublishedCharts = () => async dispatch => {
  chartsRef.once('value', function(snapshot) {
    const foundCharts = snapshot.val();
    return dispatch({
      type: GET_PUBLISHED_CHARTS,
      publishedCharts: foundCharts
    });
  });
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_CHARTS:
      return { ...state, userCharts: action.userCharts };
    case GET_PUBLISHED_CHARTS:
      return { ...state, publishedCharts: action.publishedCharts };
    default:
      return state;
  }
}
