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
    const token = getTokenFromLocalStorage();
    if(token) { 
      fetch('http://localhost:3000/users/data', {
        headers: {Authorization: `Bearer ${token}` },
      })
      .then((r) => {
        setUser(r.json());
      });
    }

  }, []);

  useEffect(() => {
    axios.interceptors.request.use(
      async (config) => {
        const token = getTokenFromLocalStorage();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );  

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setUser(null);
        }
        return Promise.reject(error);
      }
    );
    
  }, [user]);

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
  };

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
