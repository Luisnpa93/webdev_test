import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import '../../sass/signup.scss';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  const navigate = useNavigate();

  const signup = async (data) => {
    const response = await axios.post('http://localhost:3000/auth/signup', data);
    return response.data;
  };

  const mutation = useMutation(signup, {
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+.])(?!.*\s).{8,}$/;

    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter and one symbol.');
      return;
    }

    mutation.mutate({ name, email, password, age });
  };


  return (
    <div className="signup-form">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/">Go back to homepage</Link>
    </div>
  );
};

export default Signup;
