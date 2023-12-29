// import React, { useState, useEffect } from 'react';
// import { Document, Page } from 'react-pdf';
// import * as pdfjsLib from 'pdfjs-dist';

// function ViewBook({ pdfData }) {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
  
//   console.log(pdfData);
//   useEffect(() => {
//     const pdf = new window.PDFJS.PDFDocument({ data: pdfData });
//     pdf.getPage(1).then((page) => {
//       setNumPages(pdf.numPages);
//     });
//   }, [pdfData]);

//   const handlePageChange = (newPageNumber) => {
//     setPageNumber(newPageNumber);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-xl font-semibold mb-4">View Book</h2>
//       <Document file={pdfData} onLoadSuccess={setNumPages}>
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <div className="flex justify-between mt-4">
//         <button
//           className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-l"
//           disabled={pageNumber === 1}
//           onClick={() => handlePageChange(pageNumber - 1)}
//         >
//           Previous
//         </button>
//         <button
//           className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-r"
//           disabled={pageNumber === numPages}
//           onClick={() => handlePageChange(pageNumber + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ViewBook;

import React from 'react'

const ViewBook = () => {
  return (
    <div>
      hi
    </div>
  )
}

export default ViewBook
