
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDNizRB0_eqaKQ5gRnSOQEA8w2Avtt41vY",
    authDomain: "project-6568999463290733281.firebaseapp.com",
    projectId: "project-6568999463290733281",
    storageBucket: "project-6568999463290733281.appspot.com",
    messagingSenderId: "166587917028",
    appId: "1:166587917028:web:35f4af49bf82444dc102f1",
    measurementId: "G-8KWN0CF2KY"
};

 const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();
export const googleAuthProvider = new GoogleAuthProvider();
export const storage = getStorage();


