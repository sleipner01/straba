import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import GoogleLogin from '../components/authentication/GoogleLogin';
import LoginForm from '../components/authentication/LoginForm';
import './LoginSignup.scss';

const Login = () => {
  return (
    <Fragment>
      <section className='login'>
        <div className='background'>
          <GoogleLogin />
          <LoginForm />
          <p className='text-sm text-white text-center'>
            No account yet?{' '}
            <NavLink className={'signUpIn'} to='/signup'>
              Sign up
            </NavLink>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
