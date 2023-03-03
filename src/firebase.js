import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC4pDwTBA5PLzV8L4LlvC5JvnWrDjgLXx8',
  authDomain: 'straba-64026.firebaseapp.com',
  projectId: 'straba-64026',
  storageBucket: 'straba-64026.appspot.com',
  messagingSenderId: '417560124897',
  appId: '1:417560124897:web:af4cdaa50391982bdb86a0',
  measurementId: 'G-FF8KE98449',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Iinitialize Firestore
export const db = getFirestore(app);

export const auth = getAuth(app);
export default app;
