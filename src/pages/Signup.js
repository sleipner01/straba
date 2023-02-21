import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import GoogleLogin from '../components/authentication/GoogleLogin';
import SignupForm from '../components/authentication/SignupForm';

const Signup = () => {
  return (
    <Fragment>
      <section>
        <div>
          <div>
            <GoogleLogin />
            <SignupForm />
            <p>
              Already have an account? <NavLink to='/login'>Log in</NavLink>
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Signup;
