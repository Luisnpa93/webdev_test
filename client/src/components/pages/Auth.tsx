import React from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add code here to handle login submission
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <button type="submit">Login</button>
          <Link to="/signup"><button>Sign up</button></Link>
        </div>
      </form>
    </div>
  );
};

export default Auth;