import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin token from localStorage
    localStorage.removeItem('adminToken');
    // Redirect to admin login page
    navigate('/admin/signin');
  };

  return (
    <nav className="bg-gradient-to-r from-orange-600 to-yellow-500 py-4 shadow-lg">
  <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
    
    {/* Left: App Name with Link to Home */}
    <Link to="/" className="text-white text-2xl font-bold hover:text-yellow-100 transition duration-300">
      Course Selling Application
    </Link>

    {/* Right: Admin Nav Links */}
    <div className="flex items-center gap-6">
      <Link
        to="/"
        className="text-white font-semibold hover:text-yellow-100 transition duration-300"
      >
        Home
      </Link>
      <Link
        to="/admin/create-course"
        className="text-white font-semibold hover:text-yellow-100 transition duration-300"
      >
        Create Course
      </Link>
      <Link
        to="/admin/all-courses"
        className="text-white font-semibold hover:text-yellow-100 transition duration-300"
      >
        All Courses
      </Link>
      <button
        onClick={handleLogout}
        className="bg-white text-orange-600 font-semibold py-2 px-4 rounded-lg hover:bg-orange-100 transition duration-300"
      >
        Logout
      </button>
    </div>
  </div>
</nav>
  );
}

export default AdminNavbar;
