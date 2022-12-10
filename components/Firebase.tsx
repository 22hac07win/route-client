import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyApjBUOtIlBls6Q0RcfkpFhmvJXE54fRT8',
  authDomain: 'route-d9e23.firebaseapp.com',
  projectId: 'route-d9e23',
  storageBucket: 'route-d9e23.appspot.com',
  messagingSenderId: '966341884577',
  appId: '1:966341884577:web:3dd3097dd378d8888acee0',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
