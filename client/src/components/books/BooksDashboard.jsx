import React, { useState, useEffect,} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
   

  const handleBookClick = async (book) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/download/${book._id}`,
        { responseType: "blob" }
      );
  
      const blob = new Blob([res.data], { type: res.data.type });
      const url = window.URL.createObjectURL(blob);
  
      // Open in a new tab directly:
      window.open(url, "_blank");
  
    } catch (error) {
      console.log(error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  };
  

  return (
    <div className="container mx-auto p-4">

         <div className='mb-4'>
               <button
                  className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
                  onClick={() => navigate('/bookupload')}
                >
                  Upload book
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

const downloadFile = async (id,title) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/download/${id}`,
        { responseType: "blob" }
      );
      console.log(res);
      const blob = new Blob([res.data], { type: res.data.type });
      
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${title}.pdf`;
    //   link.download = res.headers["content-disposition"].split("filename=")[1];
      link.click();
     
    } catch (error) {
      console.log(error);
    }
  };
   
  async function fetchPdfDataForView(bookId) {
    try {
        const res = await axios.get(
          `http://localhost:5000/download/${bookId}`,
          // { responseType: "blob" }
        );
         return res.data;
      } catch (error) {
        console.log(error);
      }
  }

 
export default BooksDashboard;
