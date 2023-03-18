import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import TodoList from './todolist';

function Userpage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showList, setShowList] = useState(false);
  const [token, setToken] = useState('');

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
        console.log('User data:', data);
        setUserData(data);
        setToken(localStorage.getItem('accessToken'));
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    // Implement logout logic here, e.g. delete the token and redirect to login page
    localStorage.removeItem('accessToken');
    navigate('/login')
  };

  const handleMyList = () => {
    setShowList(true); 
  };

  return (
    <div>
      {userData && (
        <>
          <h1>Hello {userData.email}, {userData.age} years old!</h1>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleMyList}>My List</button>
          {showList && <TodoList userId={userData.id} tokenn={token} />}
        </>
      )}
    </div>
  );
}

export default Userpage;
