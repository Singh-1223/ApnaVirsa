import React from 'react'
import bookimg from "../../assets/bookimage.jpg"

const BookCard = ({books}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {books.map((book) => (
      <div key={book._id} className="bg-white shadow-lg shadow-amber-900 rounded-lg overflow-hidden">
        <img
          src={book.thumbnailImage ? book.thumbnailImage : bookimg} // Adjust if needed
          alt={book.title}
          className="w-full"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-center">{book.title}</h3>
          <p className="text-gray-600 text-center">{book.authorName }</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white  text-sm font-bold py-2 px-4 rounded mt-4"
            onClick={() =>  downloadFile(book._id,book.title)} 
          >
            Download
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded mt-4 ml-4"
            onClick={() => handleBookClick(book)}
          >
            View
          </button>
        </div>
      </div>
    ))}
  </div>
  )
}

export default BookCard
