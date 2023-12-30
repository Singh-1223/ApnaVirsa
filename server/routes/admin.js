const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Books = require("../models/Books");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // json web token , signing data with secret , make cookei
const adminauthenticate = require("../middleware/AdminAuthenticate");

const JWT_SECRET = "whatadayboy";


router.post("/adminlogin", async (req, res) => {
    let success = false;
  
    const { username, password } = req.body;
  
    try {
      let user = await Admin.findOne({ username });
  
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
  
      if (!passwordCompare) {
        success = false; // Set success to false if password comparison fails
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
  
      const data = {
        user: {
          id: user.id,
        },
      };
  
      const authtoken = jwt.sign(data, JWT_SECRET); // signing data with JWT_SECRET
      success = true; // Set success to true if password comparison succeeds
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  

// route for creating new admin
//   router.post("/createnewadmin",
//   [
//     body("username", "Enter a valid name").isLength({ min: 3 }),
//     body("email", "Enter a valid Email").isEmail(),
//     body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     let success = false;

//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success, errors: errors.array() });
//     }

//     try {
//       // Destructure the required fields from req.body
//       const { username, email, password, role } = req.body;

//       // Check if user already exists
//       const existingUser = await Admin.findOne({ username });
//       if (existingUser) {
//         return res.status(400).json({ error: 'Username already exists' });
//       }

//       const existingEmail = await Admin.findOne({ email });
//       if (existingEmail) {
//         return res.status(400).json({ error: 'Email already exists' });
//       }

//       // Generate a secure password hash
//       const salt = await bcrypt.genSalt(10);
//       const secPass = await bcrypt.hash(password, salt);

//       // Create a new user
//       const user = new Admin({
//         username,
//         password: secPass,
//         email,
//       });

//       await user.save();

//       success = true;
//       res.status(200).json({ success, message: 'Admin created successfully' });
//     } catch (error) {
//       console.error('Error creating user:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
// );


// delete a book
router.delete("/deletebook/:id",adminauthenticate, async (req, res) => {
  let success = false;

  // Extract the id from the request parameters
  const bookid = req.params.id;

  try {
    // Find the user by their username
    const book = await Books.findById(bookid);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Delete the user
    await Books.deleteOne({ _id:bookid });

    success = true;
    res.status(200).json({ success, message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.put('/editbook/:id',adminauthenticate, async (req, res) => {
  const bookid = req.params.id;
    
  try {
    const { title, author, uploadedBy, thumbnail } = req.body;
    
    const book = await Books.findById(bookid);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.title=title;
    book.authorName=author;
    book.uploadedBy=uploadedBy;
    book.thumbnailImage=thumbnail;

    await book.save();
    // console.log(book);
    res.json({ success: true, book: book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error updating book' });
  }
});


//route to handle requests for books
router.put('/handlerequests/:requestId',adminauthenticate, async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const action = req.body.action; // 'approve' or 'reject'

    const bookreq = await Books.findOne({ _id: requestId });

    if (!bookreq) {
      return res.status(404).json({ message: 'Inventory request not found' });
    }

    if (action === 'approve') {
      bookreq.requestStatus = 'approved';
    } else if (action === 'reject') {
      bookreq.requestStatus = 'rejected';
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await bookreq.save();

    res.status(200).json({ success: true, message: 'Book request updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



module.exports = router;


