import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3000/');
      setMessage(result.data.message);
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: 'red' }}>
      <h1>Home Page</h1>
      <p>{message}</p>
    </div>
  );
};

export default Home;
