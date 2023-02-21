import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import GoogleLogin from '../components/authentication/GoogleLogin';
import LoginForm from '../components/authentication/LoginForm';

const Login = () => {
  return (
    <Fragment>
      <section>
        <div>
          <GoogleLogin />
          <LoginForm />

          <p className='text-sm text-white text-center'>
            No account yet? <NavLink to='/signup'>Sign up</NavLink>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
