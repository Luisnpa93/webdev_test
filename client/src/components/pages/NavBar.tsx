import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
    window.location.reload(); // reload the page after navigating to /login
  };
  

  return (
    <>
      {user && (
        <nav className="bg-light">
          <div className="container mx-auto">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="text-lg font-bold">
                The best WebSite Ever!
              </Link>
              <button
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <ul className="flex justify-end space-x-8">
              <li className="text-gray-500 hover:text-gray-600">
                <Link to="/option-a">Option A - empty</Link>
              </li>
              <li className="text-gray-500 hover:text-gray-600">
                <Link to="/option-b">Option B - empty</Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
