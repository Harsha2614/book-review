import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="form-card card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" type="email" required />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" required />
        </div>
        <div className="form-actions">
          <button className="btn" type="submit">Login</button>
         
        </div>
        <p>New User?</p>
         <Link to="/signup"><button type="button" className="btn alt">Create account</button></Link>
      </form>
    </div>
  );
}
