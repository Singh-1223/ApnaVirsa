
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import Requests from './components/admin/Requests';
import BooksDashboard from './components/books/BooksDashboard';
import BookUpload from './components/books/BookUpload';
import ViewBook from './components/books/ViewBook';


function App() {
 
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<BooksDashboard />} />
        <Route path="/bookupload" element={<BookUpload />} />
        <Route path="/viewbook" element={<ViewBook />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/admindashboard" element={<Dashboard />} />
        <Route path="/adminrequests" element={<Requests />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
