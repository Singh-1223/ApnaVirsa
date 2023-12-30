import React, { useEffect, useState } from 'react'
import bookimg from "../../assets/bookimage.jpg"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoTrashBin } from "react-icons/io5";
import { MdEdit } from 'react-icons/md';
import Modal from './Modal';

const BookCardRequests = ({ books }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [button, setButton] = useState()
  const [selectedbook, setSelectedBook] = useState(null);
  const [refresh,setRefresh]=useState(false);
  // const [books, setBooks] = useState([]);
  
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


  const downloadFile = async (id, title) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/download/${id}`,
        { responseType: "blob" }
      );
      // console.log(res);
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



  const handleApproveRequest = async (requestId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API_HOST_URL}/handlerequests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('apnavirsatoken'),
        },
        body: JSON.stringify({
          action: 'approve',
        }),
      });
      const data = await response.json();

      if (data.success) {
        // const updatedRequests = inventory.filter((request) => request._id !== requestId);
        toast.success('Request Approved', { theme: 'light' });
        //  setTimeout(() => {
        //     setInventory(updatedRequests);
        // },1000 );

      } else {
        // Display the error message from the API response
        const errorMessage = data.message || 'Error approving request';
        toast.error(errorMessage, { theme: 'light' });
      }
    } catch (error) {
      console.error(error);
      toast.error('Error! Not able to approve the request', { theme: 'light' });

    }
  };


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalVisible && e.target.classList.contains('modal-wrapper')) {
        setModalVisible(false);
      }
    };

    if (modalVisible) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [modalVisible]);


  const handleEditClick1 = (book) => {
    console.log("hi");
    setSelectedBook(book);
    setModalVisible(true);
    setButton(1)
    
  };

  const handleEditClick2 = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
    setButton(2)
 };


  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <div key={book._id} className="bg-white shadow-lg shadow-amber-900 rounded-lg overflow-hidden">
          <div className='flex relative top-3  flex-row-reverse gap-3   '>
            <IoTrashBin
              className="hover:text-[#cd1818] text-2xl bg-white"
              style={{ fontSize: '2xl', cursor: 'pointer', marginRight: 15 }}
              onClick={() => handleEditClick1(book)}
            />
            <MdEdit
              className="hover:text-[#186f65] text-2xl bg-white"
              style={{ fontSize: '2xl', cursor: 'pointer' }}
              onClick={() => handleEditClick2(book)}
            />
          </div>
          <img
            src={book.thumbnailImage || bookimg} // Adjust if needed
            alt={book.title}
            className="w-full h-60  mt-[-28px]"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-center">{book.title}</h3>
            <p className="text-gray-600 text-center">{book.authorName}</p>

            <div className="flex  justify-center gap-6 pt-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white  text-sm font-bold py-2 px-4 rounded "
                onClick={() => downloadFile(book._id, book.title)}
              >
                Download
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded  "
                onClick={() => handleBookClick(book)}
              >
                View
              </button>
            </div>

            <div className="flex  justify-center gap-6 pt-2">
              <button
                className="bg-slate-600 hover:bg-violet-800 text-white  text-sm font-semibold py-2 px-4 rounded "
                onClick={() => handleApproveRequest(book._id)}
              >
                Approve
              </button>
            
            </div>

          </div>
        </div>
      ))}
          {modalVisible && <Modal setModalVisible={setModalVisible} book={selectedbook} button={button}  />}
    </div>
  )
}

export default BookCardRequests;
