import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChN64RGf60Lnu23oQYqbmgBw8kVj_-Y8w",
  authDomain: "chatbot-v9m9.firebaseapp.com",
  projectId: "chatbot-v9m9",
  storageBucket: "chatbot-v9m9.appspot.com",
  messagingSenderId: "547700191704",
  appId: "1:547700191704:web:349a86115c3be9ce1d02ad",
  measurementId: "G-3QT05D8S49",
};

const firebaseApp=initializeApp(firebaseConfig)

const db=getFirestore(firebaseApp);
const auth=getAuth(firebaseApp);
// const storage=getFirestore(firebaseApp);

export {
    db,
    auth,
};