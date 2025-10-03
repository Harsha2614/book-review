import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function AddEditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:'', author:'', description:'', genre:'', year:'' });

  useEffect(()=>{
    if (id) {
      API.get(`/books/${id}`).then(res => setForm({
        title: res.data.book.title,
        author: res.data.book.author || '',
        description: res.data.book.description || '',
        genre: res.data.book.genre || '',
        year: res.data.book.year || ''
      })).catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await API.put(`/books/${id}`, form);
      else await API.post('/books', form);
      alert('Saved');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="form-card card">
      <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Title</label>
          <input name="title" className="numb" value={form.title} onChange={handleChange} placeholder="Book title" required />
        </div>
        <div className="form-row">
          <label>Author</label>
          <input name="author" className="numb" value={form.author} onChange={handleChange} placeholder="Author name" />
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short description" />
        </div>
        <div className="form-row">
          <label>Genre</label>
          <input name="genre" className="numb" value={form.genre} onChange={handleChange} placeholder="Genre" />
        </div>
        <div className="form-row">
          <label>Year</label>
          <input name="year" type="number" value={form.year} onChange={handleChange} placeholder="Published year" />
        </div>
        <div className="form-actions">
          <button className="btn-sub" type="submit">{id ? 'Update' : 'Add'} Book</button>
        </div>
      </form>
    </div>
  );
}
