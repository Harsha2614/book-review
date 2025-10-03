import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [form, setForm] = useState({ rating:5, reviewText:'' });

  const fetch = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  useEffect(()=>{ fetch(); }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/reviews/${id}`, { rating: form.rating, reviewText: form.reviewText });
      setForm({ rating:5, reviewText:'' });
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (!data) return <div style={{ padding:20 }}>Loading...</div>;

  return (
    <div className="card">
      <h2>{data.book.title}</h2>
      <p className="meta">by {data.book.author || 'Unknown'} • {data.book.year || '—'}</p>
      <p style={{marginTop:10}}>{data.book.description}</p>
      <p style={{marginTop:8}}><strong>Average rating:</strong> {data.avgRating ? data.avgRating.toFixed(2) : 'No ratings'}</p>

      <div className="reviews">
        <h3>Reviews</h3>
        {data.reviews.length===0 && <div>No reviews yet.</div>}
        {data.reviews.map(r => (
          <div key={r._id} className="review">
            <strong>{r.userId?.name}</strong> — {r.rating} ⭐
            <div style={{marginTop:6}}>{r.reviewText}</div>
          </div>
        ))}
      </div>

      {user && (
        <div style={{marginTop:16}} className="form-card">
          <h4>Add / Update your review</h4>
          <form onSubmit={submitReview}>
            <div className="form-row">
              <label>Rating</label>
              <select value={form.rating} onChange={e=>setForm({...form,rating:+e.target.value})} className='review-scroll'>
                {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n} ⭐</option>) }
              </select>
            </div>
            <div className="form-row">
              <label>Review</label>
              <textarea value={form.reviewText} onChange={e=>setForm({...form,reviewText:e.target.value})} placeholder="Your thoughts..." />
            </div>
            <div className="form-actions">
              <button className="btn" type="submit">Submit Review</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
