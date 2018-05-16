import { userRef, chartsRef, databaseRef } from '../base';
import firebase, { database } from 'firebase';
import history from '../routes/history';
import store, { setChart } from '../store';

export const saveChart = async (data, title, chartType) => {
  console.log(data, title, chartType);
  let newChartKey;
  try {
    let uid = firebase.auth().currentUser.uid;
    newChartKey = await userRef
      .child(uid)
      .child('charts')
      .push().key;
    const chartInfo = {
      chartType,
      isPublished: false,
      title,
      data,
      uid,
      chartId: newChartKey
    };
    let updates = {};
    updates[`users/${uid}/charts/${newChartKey}`] = newChartKey;
    updates[`charts/${newChartKey}`] = chartInfo;
    await databaseRef.update(updates);
  } catch (err) {
    throw Error(err);
  }
  return newChartKey;
};

export const updateChart = async (data, chartId) => {
  try {
    let updates = {};
    updates[`/charts/${chartId}/data`] = data;
    await databaseRef.update(updates);
  } catch (err) {
    throw Error(err);
  }
};

export const publishChart = async chartId => {
  try {
    let updates = {};
    updates[`/charts/${chartId}/isPublished`] = true;
    await databaseRef.update(updates);
  } catch (err) {
    throw Error(err);
  }
};

export const deleteChart = async (chartId, uid) => {
  console.log('deleting');
  try {
    let toBeDeleted = {};
    toBeDeleted[`/charts/${chartId}`] = null;
    toBeDeleted[`/users/${uid}/charts/${chartId}`] = null;
    databaseRef.update(toBeDeleted);
  } catch (err) {
    throw Error(err);
  }
  history.push(`/charts`);
};

export const fetchChartById = chartId => async dispatch => {
  let chart;
  try {
    chart = await chartsRef
      .child(chartId)
      .once('value')
      .then(snapshot => snapshot.val());
  } catch (err) {
    throw Error(err);
  }
  store.dispatch(setChart(chart));
};
