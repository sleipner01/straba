import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, logEvent } from 'firebase/analytics';
// import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'
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
const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');

export const auth = getAuth(app);
export default app;
