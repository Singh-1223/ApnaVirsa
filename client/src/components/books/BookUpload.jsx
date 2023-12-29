import React, { useState } from 'react';

function BookUpload() {
  const [formDetails, setFormDetails] = useState({
    title: '',
    authorName: '',
    uploadedBy: '', // Adjust as needed
    pdfFile: null,
    thumbnailImage: '',
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormDetails({ ...formDetails, pdfFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    try {
        const formData = new FormData();
        for (const key in formDetails) {
          formData.append(key, formDetails[key]);
        }
  
        const response = await fetch('http://localhost:5000/api/uploadbook', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const uploadedBook = await response.json();
          console.log('Book uploaded successfully:', uploadedBook);
          // Handle success, e.g., clear form fields, display a success message
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Error uploading book');
        }
      } catch (err) {
        console.error(err);
        setError('Network error');
      } finally {
        setUploading(false);
      }
    
  };

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Upload a Book</h2>
      {error && <div className="bg-red-100 text-red-600 p-4 rounded mb-4">{error}</div>}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formDetails.title}
          onChange={handleChange}
          name="title"
        />
      </div>
      {/* ... other fields for authorName, uploadedBy, etc. */}
      <div className="mb-4">
        <label htmlFor="pdfFile" className="block text-gray-700 font-bold mb-2">
          PDF File
        </label>
        <input
          type="file"
          id="pdfFile"
          accept=".pdf"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleFileChange}
        />
      </div>
      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {uploading ? 'Uploading...' : 'Upload Book'}
      </button>
    </form>
  );
}

export default BookUpload;
