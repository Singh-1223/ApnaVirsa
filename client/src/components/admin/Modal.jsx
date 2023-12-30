import React from 'react';
import Deletebook from './Deletebook';
import Editbook from './Editbook';

const Modal = ({ setModalVisible ,book,button,setRefresh}) => {
  return (
    <div className="modal-wrapper " onClick='' style={{fontFamily: 'Figtree, sans-serif'}}>
      <div className="modal-content">
        {/* Your modal content goes here */}
        {button==1?
        <Deletebook setModalVisible={setModalVisible} book={book} setRefresh={setRefresh}/> :
         <Editbook setModalVisible={setModalVisible} book={book} setRefresh={setRefresh}/>}
        
        
      </div>
      <style>
        {`
          /* Add this to your existing styles or create a new CSS file */

          .modal-wrapper {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(8px);
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1; /* Ensure it is above other content */
          }

          .modal-content {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 2; /* Ensure it is above the blurred background */
          }
        `}
      </style>
    </div>
  );
};

export default Modal;

