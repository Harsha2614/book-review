import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

export default function BookList() {
  const [booksData, setBooksData] = useState({ books: [], page:1, totalPages:1 });
  const [loading, setLoading] = useState(false);

  const fetch = async (page=1) => {
    setLoading(true);
    try {
      const res = await API.get('/books', { params: { page } });
      setBooksData(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ fetch(1); }, []);

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 class="H1">Books</h2>
        <Link to="/add-book"><button className="btn">Add Book</button></Link>
      </div>

      <div className="grid">
        {booksData.books.map(b => (
          <div key={b._id} className="book-card">
            <div className="book-title">{b.title}</div>
            <div className="meta">by {b.author || 'Unknown'} • {b.year || '—'}</div>
            <div style={{marginTop:8}}>{b.description?.slice(0,120) || 'No description'}</div>
            <div style={{marginTop:10}}><Link to={`/book/${b._id}`} className='btn-small'>View details</Link></div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, display:'flex', justifyContent:'center', alignItems:'center', gap:12 }}>
        <button className="btnn" disabled={booksData.page<=1} onClick={()=>fetch(booksData.page-1)}>Prev</button>
        <span>{booksData.page} / {booksData.totalPages}</span>
        <button className="btnn" disabled={booksData.page>=booksData.totalPages} onClick={()=>fetch(booksData.page+1)}>Next</button>
      </div>
    </div>
  );
}
