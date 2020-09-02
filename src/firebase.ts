import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyB-YJRIYi9xMAzq9Nai32m5RFvhLo71rkM",
    authDomain: "basic-18c8b.firebaseapp.com",
    databaseURL: "https://basic-18c8b.firebaseio.com",
    projectId: "basic-18c8b",
    storageBucket: "basic-18c8b.appspot.com",
    messagingSenderId: "586729346745",
    appId: "1:586729346745:web:0a2056d587b4a311a42d68",
    measurementId: "G-MCHXD7YFB7"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;

