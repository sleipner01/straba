import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, serverTimestamp, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import './forms.scss';

const GoogleLogin = () => {
  const navigate = useNavigate();

  const createUserInCollection = async (user) => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        lastLogin: serverTimestamp(),
        created: serverTimestamp(),
      });

      console.log('Document written/updated in firestore');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const checkifUserExistsAndUpdateDoc = async (user) => {
    try {
      await getDoc(doc(db, 'users', user.uid)).then((doc) => {
        console.log('Exists?:', doc.exists());
        if (doc.exists()) {
          updateLoginTime(user);
        } else {
          createUserInCollection(user);
        }
      });
    } catch (error) {
      console.error('Checking if customer exists failed" ' + error);
    }
  };

  const updateLoginTime = async (user) => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        lastLogin: serverTimestamp(),
      });
      console.log('Logintime updated in firestore - ID: ', user.uid);
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

  const onSignInWithGoogle = async (e) => {
    e.preventDefault();

    // Sign in using a popup.
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        checkifUserExistsAndUpdateDoc(user);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <button className='googleButton' onClick={onSignInWithGoogle}>
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
