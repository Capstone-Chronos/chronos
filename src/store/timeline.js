// import { userRef, chartsRef } from '../base';
// import firebase from 'firebase';
// import history from '../routes/history';
// import { saveChart } from '../database/sankeyChart';

// const initialState = defaultData;

// // Action Types
// const UPDATE_DATA = 'UPDATE_DATA';
// const IMPORT_DATA = 'IMPORT_DATA';
// const GET_ONE_CHART = 'GET_CHART';
// const GET_USER_CHARTS = 'GET_USER_CHARTS';
// const DELETE_USER_CHART = 'DELETE_USER_CHARTS';

// const SET_CHART_ID = 'SET_CHART_ID';
// const SET_TIMELINE_TITLE = 'SET_TIMELINE_TITLE';
// const SET_CHART = 'SET_CHART';

// //ACTION CREATORS
// export const loadDefaultData = () => ({
//   type: UPDATE_DATA,
//   data: defaultData
// });

// export const importData = data => ({
//   type: UPDATE_DATA,
//   data: data
// });

// export const clearData = () => ({
//   type: UPDATE_DATA,
//   data: empty
// });

// export const setSankeyTitle = title => ({
//   type: SET_SANKEY_TITLE,
//   title
// });

// export const setSankeyId = chartId => ({
//   type: SET_CHART_ID,
//   chartId
// });

// export const setChart = chart => ({
//   type: SET_CHART,
//   chart
// });

// //THUNKS
// export const saveTimeChartThunk = (data, title) => {
//   return dispatch => {
//     saveChart(data, title)
//       .then(chartId => {
//         dispatch(setSankeyTitle(title));
//         dispatch(setSankeyId(chartId));
//         history.push(`/edit/timeline/${chartId}/${title}`);
//       })
//       .catch(err => console.error(err));
//   };
// };

// export const updateSankeyChartThunk = (data, chartId) => {
//   return dispatch => {
//     dispatch(updateChart(data, chartId));
//   };
// };

// dispatch({
//   type: UPDATE_DATA,
//   data
// });

// export const saveChart = (data) => async dispatch => {
//   let newChartKey = firebase.auth().currentUser.email.child('chart').key;
//   console.log('userid', userId)
//   userRef.set(data, snapshot => {
//     dispatch({
//       type: UPDATE_DATA,
//       data: data
//     });
//   });
// };

// Thunk creators

// Reducer
// export default function reducer(state = initialState, action) {
//   switch (action.type) {
//     case UPDATE_DATA:
//       console.log(action.data, 'DATA UPDATED');
//       defaultData = action.data;
//       return { ...state, data: action.data };
//     case DELETE_USER_CHART:
//       return { ...state, nodes: empty.nodes, links: empty.links };
//     case SET_CHART_ID:
//       return { ...state, chartId: action.chartId };
//     case SET_CHART:
//       return action.chart;
//     default:
//       return state;
//   }
// }