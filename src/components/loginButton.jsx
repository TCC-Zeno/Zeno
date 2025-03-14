import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/User/slice';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.userReducer.login);

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <p>Status: {loginStatus === null ? 'Deslogado' : 'Logado'}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LoginComponent;