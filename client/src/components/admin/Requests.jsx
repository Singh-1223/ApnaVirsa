import React, { useState, useEffect,} from 'react';
import { useNavigate } from 'react-router-dom';

import BookCardRequests from './BookCardRequests';

function Requests() {
  const [pendingbooks, setPendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectedbooks, setRejectedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/pendingbooks'); // Replace with your endpoint URL
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const booksData = await response.json();
        setPendingBooks(booksData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);



  return (
    <div className="container mx-auto p-4">
       <h1 className='text-center font-bold text-slate-600 m-4 text-[50px]'> Book Requests</h1>
      {loading && <p className="text-center">Loading books...</p>}
      {error && <div className="bg-red-100 text-red-600 p-4 rounded">{error}</div>}
      {pendingbooks.length > 0 && (
          <BookCardRequests books={pendingbooks}/>
      )}
      {pendingbooks.length === 0 && (
        <p className="text-center">No books found.</p>
      )}
    </div>
  );
}

 
export default Requests;
