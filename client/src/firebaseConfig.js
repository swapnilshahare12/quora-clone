import firebase from 'firebase/app';
import 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyDvNIuvHiV95PhX-BCOwxvJF50Q8M_8Llk",
//   authDomain: "social-login-c2563.firebaseapp.com",
//   projectId: "social-login-c2563",
//   storageBucket: "social-login-c2563.appspot.com",
//   messagingSenderId: "917403181445",
//   appId: "1:917403181445:web:31f01dfe7a2112b40d24ec",
// };

const {
  VITE_apiKey,
  VITE_authDomain,
  VITE_projectId,
  VITE_storageBucket,
  VITE_messagingSenderId,
  VITE_appId,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_apiKey,
  authDomain: VITE_authDomain,
  projectId: VITE_projectId,
  storageBucket: VITE_storageBucket,
  messagingSenderId: VITE_messagingSenderId,
  appId: VITE_appId,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
