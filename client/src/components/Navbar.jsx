import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-yellow-900 min-w-screen fixed text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        RenewEra
      </Link>
      <ul className="flex space-x-6">

        <li>
          <Link to="/login" className="hover:text-gray-200">Login/Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
