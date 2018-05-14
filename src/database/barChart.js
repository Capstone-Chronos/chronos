import { userRef, chartsRef, databaseRef, app } from '../base';
import { database } from 'firebase';

export async function postBarChartToDatabase(data, title) {
  let newChartKey;
  try {
    const uid = await app.auth().currentUser.uid;
    const chartInfo = {
      title,
      chartType: 'Bar',
      isPublished: false,
      data,
      uid
    };
    newChartKey = await userRef
      .child(uid)
      .child('charts')
      .push().key;

    let updates = {};
    updates[`/users/${uid}/charts/${newChartKey}`] = newChartKey;
    updates[`charts/${newChartKey}`] = chartInfo;
    await databaseRef.update(updates);
  } catch (err) {
    throw Error(err);
  }
  console.log(newChartKey);
  return newChartKey;
}

export async function putBarChart(data, chartId) {
  console.log('putBarChart');
  try {
    const uid = await app.auth().currentUser.uid;
    const chartInfo = {
      data
    };
    let updates = {};
    updates[`/charts/${chartId}`] = data;
    await databaseRef.update(updates);
  } catch (err) {
    throw Error(err);
  }
}
