import { Outlet, Navigate } from 'react-router-dom';

const Authenticated = (props) => {
  return props.user ? <Outlet /> : <Navigate to='/login' />;
};

export default Authenticated;
