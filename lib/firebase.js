import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDNizRB0_eqaKQ5gRnSOQEA8w2Avtt41vY",
    authDomain: "project-6568999463290733281.firebaseapp.com",
    projectId: "project-6568999463290733281",
    storageBucket: "project-6568999463290733281.appspot.com",
    messagingSenderId: "166587917028",
    appId: "1:166587917028:web:35f4af49bf82444dc102f1",
    measurementId: "G-8KWN0CF2KY"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();


