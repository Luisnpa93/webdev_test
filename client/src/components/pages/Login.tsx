import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, {  useContext, useState } from 'react';
import '../../sass/login.scss';
import { UserContext } from '../../context/user.context';




function Login( ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext)

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
      const data = await response.json();
      console.log(data);
      const { tokenData: { token } } = data;
      console.log('access token before setting to local storage: ', token);
      localStorage.setItem('accessToken', token);
      setUser(data.user);
      // Send request to get user data
      const userDataResponse = await fetch('http://localhost:3000/users/data', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (userDataResponse.ok) {
        const userData = await userDataResponse.json();
        const { email, age } = userData;
        navigate('/', { state: { email, age } });
      } else {
        alert('Failed to retrieve user data');
      }
  }}
  

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
        <Link to="/signup" className="signup-link">Sign up</Link>
      </form>
    </div>
  );
  
};

export default Login;
