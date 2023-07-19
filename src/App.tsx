import React, { PropsWithChildren, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { closeModal,  } from './redux/modalSlice';
import { setAuthenticated } from './redux/authSlice';
import axios from 'axios';

import Landing from './pages/landing';
import Dashboard from './pages/dashboard';


import LoginModal from './components/LoginModal';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const showModal = useSelector((state: RootState) => state.modal.showModal);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        // Update the isAuthenticated state in Redux
        dispatch(setAuthenticated(true));
        dispatch(closeModal());
        // window.location.replace('/dashboard');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert('Login failed. Please check your username and password.');
    }
  };

  const handleModalClose = () => {
    dispatch(closeModal());
  };


  return (
    <>
      {console.log(isAuthenticated, "app")} 
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<LoginModal />} />

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>

        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-stone-500">
            <div className="bg-stone-50 p-8 rounded shadow-md">
              <h2 className="text-xl font-bold mb-4">Login</h2>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleLogin}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Login
                </button>
                <button
                  onClick={handleModalClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Router>
    </>
  );
};


interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, redirectPath = '/landing' }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};


export default App;
