import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function WelcomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/books');
    }
  }, [user, navigate]);

  return (
    <div
      className="welcome-page"
      style={{
        backgroundImage: "url('/image.png')", // 🔸 Save image in /public
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(3px)',
        }}
      ></div>

      {/* Animated Scrolling Text */}
      <div className="scrolling-text-container">
        <div className="scrolling-text">
          📚 Explore • Review • Share • Feel the heartbeat of every story 📖 ✨
        </div>
      </div>

      {/* Content */}
      <div className="welcome-content" style={{ position: 'relative', zIndex: 2 }}>
        <div className="welcome-logo floating-logo">
          <img src="/logo.png" alt="PlotPulse Logo" />
        </div>

        <h1 className="welcome-title zoom-in">PlotPulse</h1>
        <p className="welcome-tagline slide-up">
          Discover, review, and share your love for books. Join a global community of readers
          and dive into stories like never before.
        </p>

        <div className="welcome-buttons fade-in">
          <Link to="/login">
            <button className="btn welcome-btn">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn alt welcome-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
