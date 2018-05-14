import { userRef, chartsRef, databaseRef } from '../base';
import firebase, { database } from 'firebase';


export const saveChart = async (data, title) => {
  let newChartKey;
  try {
    let uid = firebase.auth().currentUser.uid;
    newChartKey = await userRef.child(uid).child('charts').push().key;
    const chartInfo = {
      chartType: 'Sankey',
      isPublished: false,
      title,
      data,
      uid
    };
      // userRef.child(uid).child('charts').push()
      //   .set(chartIdKey);
      // chartsRef.push().set(chartInfo);
    let updates = {};
    updates[`users/${uid}/charts/${newChartKey}`] = newChartKey;
    updates[`charts/${newChartKey}`] = chartInfo;
    await databaseRef.update(updates);
  } catch (err) {
    throw Error(err);
  }
  console.log('lasdfsdafasdfsadfasdf', newChartKey)
  return newChartKey;
};

export const updateChart = async (data, chartId) => {
  try {
    let updates = {};
    console.log('')
    updates[`/charts/${chartId}/data`] = data;
    await databaseRef.update(updates);
  } catch (err) {
    throw Error(err);
  }
};

export const deleteChart = (chartId) => {
  console.log('chartid', chartId);
  userRef.child();
  // chartsRef.child()
};
