import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import GoogleLogin from '../components/authentication/GoogleLogin';
import SignupForm from '../components/authentication/SignupForm';
import './LoginSignup.scss';

const Signup = () => {
  return (
    <Fragment>
      <section className='login'>
        <div className='background'>
          <div>
            <GoogleLogin />
            <SignupForm />
            <p className='text'>
              Already have an account? <NavLink to='/login'>Log in</NavLink>
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Signup;
