const functions = require('firebase-functions');
const express = require('express')
const path = require('path')


const app = express()

app.get('/hi', (req, res, next) => {
    console.log('HELLOOOOOOOOO')
    res.send('HIIIII')
})

// sends index.html
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
