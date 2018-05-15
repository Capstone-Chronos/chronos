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
  //   userRef.child(userId.uid).child('charts').once('value', function(snapshot){
  //     dispatch({
  //       type: GET_USER_CHARTS,
  //       userCharts: snapshot.val()
  //     });
  //   });
  // .then((values => console.log(values)));
  // .then(chartsRef.)
  //   userRef.child(userId.uid).child('charts').once('value', function(snapshot){
  //     // foundCharts = snapshot.val();
  //     console.log('found', Object.values(foundUsersChartIds));
  //     // snapshot.forEach(childSnapshot => {
  //     //   let chartKey = childSnapshot.key;
  //     //   let chartData = chartsRef.child(chartKey).val();
  //     // });
  //   });
  chartsRef.once('value', function(snapshot) {
    const foundCharts = snapshot.val();
    // snapshot.forEach(childSnapshot => {
    //   //   let userChartData = childSnapshot.once().child('uid').val() === uid ? childSnapshot : null;
    //   //   console.log('aaaaa', userChartData);
    // });
    // snapshot.forEach(childSnapshot => {
    //   console.log('fuuuu', childSnapshot.val());
    //   Object.values(foundUsersChartIds);
    // });
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
