import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBook = ({ setModalVisible, book, setBooks }) => {
  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
    title: book.title,
    author: book.authorName || "",
    uploadedBy:book.uploadedBy || "",
    thumbnail: book.thumbnailImage || "",
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalVisible(false);

    try {
    
      console.log(JSON.stringify(bookData))
      const response = await fetch(`${import.meta.env.VITE_REACT_API_HOST_URL}/editbook/${book._id.toString()}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('apnavirsatoken'),
          },
        body: JSON.stringify(bookData),
      });
 
      const data = await response.json();

      if (data.success) {
        const title = bookData.title;
        setModalVisible(false);
        toast.success(`Successfully Updated ${title}!`, {
          // ... toast options
        });
        // setBooks((books) => books.map((b) => b._id === book._id ? data.book : b)); // Update book in list
        // setBookData({
        //   title: '',
        //   author: '',
        //   username: '',
        //   pdf: '',
        //   thumbnail: '',
        // });
      } else {
        setError(data.error || 'Error updating book');
        toast.error(error, {
          // ... toast options
        });
      }
    } catch (error) {
      setError('Error updating book');
      toast.error(error.message, {
        // ... toast options
      });
    //   console.error('Error updating book:', error.message);
    }
  };

  return (
    <div className="bg-white  flex flex-col justify-center shadow-lg shadow-slate-400 outline-double outline-red-300 ">
      <h1 className="text-[30px] text-center font-bold mb-[-10px]">Edit Book</h1>

      <div className="bg-white mx-auto w-full  max-w-md p-8">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* ... other fields */}

          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Title:
            </label>
            <input
              type="text"
              value={bookData.title}
              id="title"
              name="title"
              onChange={handleInputChange}
              className="shadow-lg shadow-red-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
         </div>

         <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 font-medium mb-2">
              Author:
            </label>
            <input
              type="author"
              id="author"
              value={bookData.author}
              name="author"
              onChange={handleInputChange}
              className="shadow-lg shadow-red-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
         </div>

         <div className="mb-4">
            <label htmlFor="uploadedBy" className="block text-gray-700 font-medium mb-2">
              Uploaded By:
            </label>
            <input
              type="uploadedBy"
              id="uploadedBy"
              value={bookData.uploadedBy}
              name="uploadedBy"
              onChange={handleInputChange}
              className="shadow-lg shadow-red-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
         </div>

          <div className="mb-4">
            <label htmlFor="thumbnail" className="block text-gray-700 font-medium mb-2">
              Thumbnail URL:
            </label>
            <input
              type="text"
              id="thumbnail"
              name="thumbnail"
              value={bookData.thumbnail}
              onChange={handleInputChange}
              className="shadow-lg shadow-red-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
         </div>

         {error && (
           <div className="mb-4 text-red-500 text-sm font-bold">{error}</div>
         )}

         <div className="text-center flex justify-around">
           <button
             type="submit"
             className="bg-red-600 hover:bg-red-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           >
             Edit Book
           </button>
         </div>
       </form>
     </div>
   </div>
 );
};

export default EditBook;
