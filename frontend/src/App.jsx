import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookList from './pages/BookList';
import AddEditBook from './pages/AddEditBook';
import BookDetails from './pages/BookDetails';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-book" element={<ProtectedRoute><AddEditBook /></ProtectedRoute>} />
            <Route path="/edit-book/:id" element={<ProtectedRoute><AddEditBook /></ProtectedRoute>} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </main>
        <footer className="footer">Built with ❤️ · BookReview Platform</footer>
      </Router>
    </AuthProvider>
  );
}
