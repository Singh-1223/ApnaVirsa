import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';

import BookCardAdmin from './BookCardAdmin';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/books'); // Replace with your endpoint URL
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const booksData = await response.json();
        setBooks(booksData);
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
      <div className=" m-4 p-4 flex items-center">
        <div className=" text-end text-[30px] font-bold text-pretty w-[70%]">
          Admin Dashbord
        </div>
        <div className="text-end text-lg text-pretty w-[30%]">
          <button
            className="bg-yellow-600 hover:bg-yellow-700 text-white  text-sm font-bold py-2 px-4 rounded "
            onClick={() => navigate("/adminrequests")}
          >
            Requests
          </button>
        </div>

      </div>


      {loading && <p className="text-center">Loading books...</p>}
      {error && <div className="bg-red-100 text-red-600 p-4 rounded">{error}</div>}
      {books.length > 0 && (
        <BookCardAdmin books={books} />

      )}
      {books.length === 0 && (
        <p className="text-center">No books found.</p>
      )}
    </div>
  );
}


export default Dashboard;
