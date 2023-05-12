import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { agent, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/api/auth/login', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      navigate('/');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  return (
    <div className='bg-secondary md:h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0'>
      <div className=' bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 w-full'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
            Sign in to your account
          </h1>
          <div
            className='p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 '
            role='alert'
          >
            <span className='font-bold'>Test Credentials</span>
            <div className='mt-2'>
              Email : tharindu@gmail.com <br /> Password : 12345
            </div>
          </div>
          {error && (
            <div
              className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 '
              role='alert'
            >
              <span className='font-medium'>Error! </span>
              {error.message}
            </div>
          )}
          <form className='space-y-4 md:space-y-6' action='#'>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Your email
              </label>
              <input
                type='email'
                id='email'
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  '
                placeholder='name@company.com'
                required=''
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 '
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                onChange={handleChange}
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                required=''
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              onClick={handleLogin}
              className='w-full text-white bg-secondary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
