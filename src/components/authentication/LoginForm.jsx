import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Error } from '../misc/usefulComponents';
import errorCodeToTextConverter from '../../utils/ErrorCodeToTextConverter';
import './forms.scss';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValidState] = useState(false);
  const [passwordValid, setPasswordValidState] = useState(false);
  const [submitDisabled, setSubmitDisabledState] = useState(true);
  const [errorText, setError] = useState();

  useEffect(() => {
    checkSubmitValid();
  }, [emailValid, passwordValid]);

  function checkSubmitValid() {
    // check if all fields are valid
    let submitValid = emailValid && passwordValid;
    setSubmitDisabledState(!submitValid);
  }

  function handleChangeEmail(mail) {
    // separate handler for each field
    let emailValid = mail ? true : false; // basic email validation
    setEmail(mail);
    setEmailValidState(emailValid);
  }

  function handleChangePassword(password) {
    // separate handler for each field
    let passwordValid = password ? true : false; // basic text validation
    setPassword(password);
    setPasswordValidState(passwordValid);
  }

  const updateLoginTime = async (user) => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        lastLogin: serverTimestamp(),
      });
    } catch (e) {
      console.error('Could not update last login time for: ', user.uid);
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/');

        console.log(user);
        updateLoginTime(user);
      })
      .catch((error) => {
        console.log(error);
        setError(errorCodeToTextConverter(error.code));
      });
  };

  return (
    <form>
      <div>
        <label className='label' htmlFor='email-address'>
          Email address
        </label>
        <br />
        <input
          className='input'
          id='email-address'
          name='email'
          type='email'
          required
          placeholder='Email address'
          onChange={(e) => handleChangeEmail(e.target.value)}
        />
      </div>

      <div>
        <label className='label' htmlFor='password'>
          Password
        </label>
        <br />
        <input
          className='input'
          id='password'
          name='password'
          type='password'
          required
          placeholder='Password'
          onChange={(e) => handleChangePassword(e.target.value)}
        />
      </div>

      <div>
        <button disabled={submitDisabled} className='logSignInButton' onClick={onLogin}>
          Login
        </button>
        {errorText && <Error errorMessage={errorText} />}
      </div>
    </form>
  );
};

export default LoginForm;
