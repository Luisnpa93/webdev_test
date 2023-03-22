import React, { useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import TodoList from './todolist';
import { UserContext } from '../../context/user.context';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const { isLoading, data: message } = useQuery('homePageMessage', async () => {
    const result = await axios.get('http://localhost:3000/');
    return result.data.message;
  });

  return (
    <div className="bg-gray-100">
      <h1 className="text-3xl text-center pt-8">Home Page</h1>
      {user ? (
        <>
          <h2 className="text-xl font-bold mt-8">Hello {user.name}, {user.age} years old!</h2>
          <TodoList />
        </>
      ) : null}
      <div className="flex flex-col items-center justify-center my-8">
        <img src="/images/img.png" alt="Amazing Image" className="w-full max-w-screen-sm my-4" />
        <div className="text-center mb-4 text-lg font-bold">Designed by: me</div>
      </div>
      <div className="flex flex-col items-center justify-center h-32 space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold">Support</h2>
          <p>Need help? Contact our support team at support@yourcompany.com</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">Email</h2>
          <p>Send us an email at info@yourcompany.com</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
