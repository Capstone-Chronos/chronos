const functions = require('firebase-functions');
const path = require('path')

exports.app = functions.https.onRequest((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
