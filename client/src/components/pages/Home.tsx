import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import TodoList from './todolist';
import { UserContext } from '../../context/user.context';




const HomePage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:3000/');
      setMessage(result.data.message);
    };
    fetchData();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const token = localStorage.getItem('accessToken');

  return (
    <div style={{ backgroundColor: 'gray' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          The best WebSite Ever!
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {user && (
            <>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
      <h1 style={{ textAlign: 'center' }}>Home Page</h1>
      {user?(
        <>
          <h2>Hello {user.name}, {user.age} years old!</h2>
          {<TodoList />}
        </>
      ): null}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/images/img.png" alt="Amazing Image" style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
        <div style={{ textAlign: 'center', margin: '20px 0', fontSize: '1.5em', fontWeight: 'bold' }}>Designed by: me</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20%', lineHeight: '1.5', marginTop: '2px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Support</h2>
          <p>Need help? Contact
 our support team at support@yourcompany.com</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2>Email</h2>
          <p>Send us an email at info@yourcompany.com</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
