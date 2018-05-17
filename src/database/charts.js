import { userRef, chartsRef, databaseRef } from '../base';
import firebase, { database } from 'firebase';
import history from '../routes/history';
import store, { setChart } from '../store';

export const saveNewChart = async (data, title, chartType) => {
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

export const saveExistingChart = async (data, chartId) => {
  if (!chartId) throw Error('Save existing chart received a falsy chartId');
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
  console.log('deleting', chartId, uid);
  if (!chartId || uid)
    throw Error('Delete chart received a falsy chartId or uid');
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

export async function fetchChartById(chartId) {
  console.log('Fetching ID...', chartId);
  if (!chartId) throw Error('Fetch chart called with falsy chartId', chartId);
  let chart;
  try {
    chart = await chartsRef
      .child(chartId)
      .once('value')
      .then(snapshot => snapshot.val());
  } catch (err) {
    throw Error(err);
  }
  return chart;
}
