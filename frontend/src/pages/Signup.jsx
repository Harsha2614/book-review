import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="form-card card">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" class="na" required />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" type="email" required />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" required />
        </div>
        <div className="form-actions">
          <button className="btn" type="submit">Sign up</button>
         
        </div>
        <p>Having an Account?</p>
         <Link to="/login"><button type="button" className="btn alt">Login</button></Link>
      </form>
    </div>
  );
}
