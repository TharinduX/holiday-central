import { Navigate, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { agent } = useContext(AuthContext);
  return agent ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
