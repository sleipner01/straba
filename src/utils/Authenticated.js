import { Outlet, Navigate } from 'react-router-dom';

const Authenticated = ({ auth }) => {
  return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default Authenticated;
