import { userRef, chartsRef, databaseRef, app } from '../base';
import { database } from 'firebase';

export async function postBarChartToDatabase(data) {
  const uid = await app.auth().currentUser.uid;
  const chartInfo = {
    chartType: 'Bar',
    isPublished: false,
    data,
    uid
  };

  const newChartKey = await userRef
    .child(uid)
    .child('charts')
    .push().key;

  let updates = {};
  updates[`/users/${uid}/charts/${newChartKey}`] = newChartKey;
  updates[`charts/${newChartKey}`] = chartInfo;
  await databaseRef.update(updates).catch(err => console.error(err));
}
