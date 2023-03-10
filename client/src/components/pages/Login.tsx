import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const encodedInfo = btoa(`${email}:${password}`);
    
    const headers = new Headers();
    headers.set('Authorization', `Basic ${encodedInfo}`);
    headers.set('Content-Type', 'application/json');

    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ email, password })
    });

    console.log(response);
    if (response.ok) {
      const accessToken = await response.text();
      navigate('/empty-page')
    } else {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        <Link to="/signup">Sign up</Link>
      </form>
    </div>
  );
};

export default Login;
