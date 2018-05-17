// import { userRef, chartsRef, databaseRef } from '../base';
// import firebase, { database } from 'firebase';
// import history from '../routes/history';
// import store, { setMapChart } from '../store';

// export const saveAsNewMap = async (data, title) => {
//   let newChartKey;
//   try {
//     let uid = firebase.auth().currentUser.uid;
//     newChartKey = await userRef
//       .child(uid)
//       .child('charts')
//       .push().key;
//     const chartInfo = {
//       chartType: 'Choropleth',
//       isPublished: false,
//       title,
//       data,
//       uid,
//       chartId: newChartKey
//     };
//     // userRef.child(uid).child('charts').push()
//     //   .set(chartId);
//     // chartsRef.push().set(chartInfo);
//     let updates = {};
//     updates[`users/${uid}/charts/${newChartKey}`] = newChartKey;
//     updates[`charts/${newChartKey}`] = chartInfo;
//     await databaseRef.update(updates);
//   } catch (err) {
//     throw Error(err);
//   }
//   return newChartKey;
// };

// export const saveExistingMap = async (data, chartId) => {
//   if (!chartId) throw Error('Update chart was given a falsy chartId');
//   console.log('UPDATING MAP', data, chartId);
//   try {
//     let updates = {};
//     updates[`/charts/${chartId}/data`] = data;
//     await databaseRef.update(updates);
//   } catch (err) {
//     throw Error(err);
//   }
// };

// export const publishChart = async chartId => {
//   try {
//     let updates = {};
//     updates[`/charts/${chartId}/isPublished`] = true;
//     await databaseRef.update(updates);
//   } catch (err) {
//     throw Error(err);
//   }
// };

// export const deleteChart = async (chartId, uid) => {
//   try {
//     let toBeDeleted = {};
//     toBeDeleted[`/charts/${chartId}`] = null;
//     toBeDeleted[`/users/${uid}/charts/${chartId}`] = null;
//     databaseRef.update(toBeDeleted);
//   } catch (err) {
//     throw Error(err);
//   }
//   history.push(`/charts`);
// };

// export const fetchChartById = chartId => async dispatch => {
//   console.log('fetch');
//   let chart;
//   try {
//     chart = await chartsRef
//       .child(chartId)
//       .once('value')
//       .then(snapshot => {
//         console.log(snapshot.val());
//         snapshot.val();
//       });
//   } catch (err) {
//     throw Error(err);
//   }
//   store.dispatch(setMapChart(chart));
// };
