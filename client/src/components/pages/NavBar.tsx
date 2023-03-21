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
        <nav className="bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="container mx-auto">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="text-2xl font-bold text-white">
                The best WebSite Ever!
              </Link>
              <button
                className="text-gray-200 hover:text-white focus:outline-none focus:text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <ul className="flex justify-end space-x-8">
              <li>
                <Link to="/option-a" className="text-gray-200 hover:text-white text-lg font-medium">
                  Option A
                </Link>
              </li>
              <li>
                <Link to="/option-b" className="text-gray-200 hover:text-white text-lg font-medium">
                  Option B
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
