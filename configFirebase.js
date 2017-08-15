const firebase = require('firebase');
const config = require('./config');

const app = firebase.initializeApp({
    apiKey: `${config.firebase.apiKey}`,
    authDomain: `${config.firebase.projectId}.firebaseapp.com`,
    databaseURL: `https://${config.firebase.projectId}.firebaseio.com`,
    projectId: `${config.firebase.projectId}`,
    storageBucket: `${config.firebase.projectId}.appspot.com`,
    messagingSenderId: `${config.firebase.messagingSenderId}`
});

module.exports = app;
