import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="nav-left" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <div className="logo">
          <img src="/logo.png" alt="PlotPulse Logo" className="logo-img" />
        </div>
        <div>
          <div className="site-title">
            Plot Pulse
            </div>
          <div className="site-tagline">Feel the heartbeat of every story.</div>
        </div>
      </div>

      {user && (
        <div className="nav-links">
          <Link to="/books">Home</Link>
          <Link to="/add-book">Add Book</Link>
        </div>
      )}

      <div className="nav-actions">
        {user ? (
          <>
           
            <button className="btn alt" onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <>
            
          </>
        )}
      </div>
    </header>
  );
}
