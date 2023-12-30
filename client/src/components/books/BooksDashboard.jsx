import React, { useState, useEffect,} from 'react';
import { useNavigate } from 'react-router-dom';


import BookCard from './BookCard';

function BooksDashboard() {
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

         <div className='mb-4 inline-block'>
               <button
                  className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
                  onClick={() => navigate('/bookupload')}
                >
                  Upload book
                </button>
         </div>

         <div className='mb-4 inline-block'>
               <button
                  className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
                  onClick={() => navigate('/adminlogin')}
                >
                  Admin
                </button>
         </div>

      {loading && <p className="text-center">Loading books...</p>}
      {error && <div className="bg-red-100 text-red-600 p-4 rounded">{error}</div>}
      {books.length > 0 && (
          <BookCard books={books}/>
       
      )}
      {books.length === 0 && (
        <p className="text-center">No books found.</p>
      )}
    </div>
  );
}

 
export default BooksDashboard;
