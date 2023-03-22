import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/pages/NavBar';
import Home from './components/pages/Home';
import OptionA from './components/pages/OptionA';
import OptionB from './components/pages/OptionB';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import './sass/main.scss';
import axios from 'axios';
import { UserContext } from './context/user.context';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Check if user is stored in local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    // Store user in local storage
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          {user ? (
            <div>
              {<NavBar />}
              <Routes key="loggedIn">
                <Route index element={<Home />} />
                <Route path="/option-a" element={<OptionA />} />
                <Route path="/option-b" element={<OptionB />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          ) : (
            <Routes key="loggedOut">
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          )}
        </Router>
      </QueryClientProvider>
    </UserContext.Provider>
  );
};

export default App;
