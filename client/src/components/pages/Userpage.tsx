import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';

function Userpage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/users/data', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Invalid token');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    // Implement logout logic here, e.g. delete the token and redirect to login page
    navigate('/login')
  };

  const handleMyList = () => {
    navigate('/login')
  };

  return (
    <div>
      <h1>Welcome</h1>
      {userData && (
        <>
          <p>Email: {userData.email}</p>
          <p>Age: {userData.age}</p>
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleMyList}>My List</button>
    </div>
  );
}


export default Userpage;
