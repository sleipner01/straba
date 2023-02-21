import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const GoogleLogin = () => {
  const navigate = useNavigate();

  // const createUserAsGooglePopup = async (user) => {
  //   try {
  //     await setDoc(
  //       // If the user already exists, merge the new data with the existing data
  //       doc(db, 'users', user.uid),
  //       {
  //         name: user.displayName,
  //         email: user.email,
  //         lastLogin: serverTimestamp(),
  //       },
  //       { merge: true },
  //     );

  //     console.log('Document written/updated in firestore');
  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //   }
  // };

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

        // createUserAsGooglePopup(user);

        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return <button onClick={onSignInWithGoogle}>Sign in with Google</button>;
};

export default GoogleLogin;
