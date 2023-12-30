
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import Requests from './components/admin/Requests';
import BooksDashboard from './components/books/BooksDashboard';
import BookUpload from './components/books/BookUpload';
import ViewBook from './components/books/ViewBook';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRouteAdmin from './components/admin/ProtectedAdminRoutes';

function App() {

  return (
    <>
     <div className='bg-red-50'>
      <Router>
        <Navbar />
        <Routes>

           {/* Common Routes */}
          <Route path="/" element={<BooksDashboard />} />
          <Route path="/bookupload" element={<BookUpload />} />
          <Route path="/viewbook" element={<ViewBook />} />
          <Route path="/adminlogin" element={<Login />} />
         
           {/* Protected Admin routes */}
          <Route path="/" element={<ProtectedRouteAdmin/>}>
              <Route path="/admindashboard" element={<Dashboard />} />
               <Route path="/adminrequests" element={<Requests />} />
          </Route>
           

        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
      </div>
    </>
  )
}

export default App
