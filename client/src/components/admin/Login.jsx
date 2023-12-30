
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';


const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // console.log(import.meta.env.VITE_REACT_API_HOST_URL);
    const response = await fetch(`${import.meta.env.VITE_REACT_API_HOST_URL}/adminlogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      toast.success('Logged In! Redirecting...', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
      localStorage.setItem('apnavirsatoken',json.authtoken);
      setTimeout(() => {
        navigate('/admindashboard');
      }, 1000);
    } else {
      console.log(json.error);
      toast.error('Invalid Admin Credentials', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center mt-[-40px]">
      
      <div className="flex items-center justify-center flex-1 flex-col h-screen" style={{fontFamily: 'Figtree, sans-serif'}}>
        <h1 className="text-3xl font-bold p-10 text-orange-900" style={{ cursor: 'pointer',fontFamily: 'Figtree, sans-serif'  }}>
          Admin Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="h-[40%] bg-white rounded-[10px] px-8 pt-6 pb-8 mb-4 flex flex-col justify-evenly border-2 border-rose-200 shadow-lg shadow-orange-400"
        >
          <label className="flex items-center  text-gray-700 text-m font-bold mb-2">
            <FaUser className="mr-2" />
            Username:
          </label>
          <input
            type="text"
            name="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="Enter your username"
            value={credentials.username}
            onChange={onChange}
            required
          />
          <label className=" text-gray-700 text-m font-bold mb-2 mt-4 flex items-center">
          <RiLockPasswordFill className="mr-2"/>
            Password:
          </label>
          <input
            type="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={onChange}
            required
          />
          <div className='flex items-center justify-around'>
            <button type="submit" className="w-[35%] bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded mt-4">
              Login
            </button>
            <button className="w-[35%] bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => navigate('/')}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;


