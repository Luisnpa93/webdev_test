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
    <div style={{ backgroundColor: 'gray' }}>
  <h1 style={{ textAlign: 'center' }}>Home Page</h1>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <img src="/images/img.png" alt="Amazing Image" style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
    <div style={{ textAlign: 'center', margin: '20px 0', fontSize: '1.5em', fontWeight: 'bold' }}>Designed by: me</div>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20%', lineHeight: '1.5', marginTop: '2px' }}>
    <div style={{ textAlign: 'center' }}>
      <h2>Support</h2>
      <p>Need help? Contact our support team at support@yourcompany.com</p>
    </div>
    <div style={{ textAlign: 'center' }}>
      <h2>Email</h2>
      <p>Send us an email at info@yourcompany.com</p>
    </div>
  </div>
</div>


  


  );
};

export default Home;
