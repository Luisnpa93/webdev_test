import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import '../../sass/login.scss';
import { UserContext } from '../../context/user.context';
import { useMutation } from 'react-query';

interface LoginResponse {
  tokenData: {
    token: string;
  };
  user: {
    email: string;
    age: number;
  };
}


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const loginUser = async ({ email, password }): Promise<LoginResponse> => {
    const encodedInfo = btoa(`${email}:${password}`);

    const headers = new Headers();
    headers.set('Authorization', `Basic ${encodedInfo}`);
    headers.set('Content-Type', 'application/json');

    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    return response.json();
  };

  const mutation = useMutation<LoginResponse, Error, { email: string; password: string }>(
    (credentials) => loginUser(credentials),
    {
    onSuccess: async (data) => {
      console.log(data);
      const {
        tokenData: { token },
      } = data;
      console.log('access token before setting to local storage: ', token);
      localStorage.setItem('accessToken', token);
      setUser(data.user);
      // Send request to get user data
      const userDataResponse = await fetch('http://localhost:3000/users/data', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userDataResponse.ok) {
        const userData = await userDataResponse.json();
        const { email, age } = userData;
        navigate('/', { state: { email, age } });
      } else {
        alert('Failed to retrieve user data');
      }
    },
    onError: () => {
      alert('Failed to log in');
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="login-container bg-gray-100 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form className="login-form flex flex-col items-center" onSubmit={handleLogin}>
        <div className="form-input mb-4">
          <label htmlFor="email" className="mr-4 font-bold">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="form-input mb-4">
          <label htmlFor="password" className="mr-4 font-bold">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <button type="submit" className="submit-button bg-blue-500 text-white rounded px-4 py-2">
          Submit
        </button>
      </form>
      <Link to="/signup" className="signup-link mt-4 text-blue-500">
        Sign up
      </Link>
    </div>
  );
  
}

export default Login;
