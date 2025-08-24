import React from "react";
import { Link, useNavigate } from "react-router-dom";

const StartupSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Startup Menu</h2>
      <ul>
        <li className="mb-2">
          <Link to="/startup/upload-requirement">Upload Requirement</Link>
        </li>
        <li className="mb-2">
          <Link to="/startup/my-requirements">My Requirements</Link>
        </li>
        <li className="mb-2">
          <Link to="/startup/filter-materials">Filter Materials</Link>
        </li>
        <li className="mt-4">
          <button onClick={logout} className="text-red-600">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StartupSidebar;
