import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
export default function Navbar(){
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="logo">
  <img src="/logo.png" alt="BookReview Logo" className="logo-img" />
</div>
        <div className="site-title">Plot Pulse</div>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add-book">Add Book</Link>
      </div>
      <div className="nav-actions">
        {user ? (
          <>
            <button className="btn" onClick={()=>navigate('/profile')}>Profile</button>
            <button className="btn alt" onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/signup"><button className="btn">Signup</button></Link>
            <Link to="/login"><button className="btn alt">Login</button></Link>
          </>
        )}
      </div>
    </header>
  );
}
