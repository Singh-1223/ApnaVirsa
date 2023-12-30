const express = require("express");
const router = express.Router();
const multer = require("multer");
const Book = require("../models/Books");
const path = require("path");
const fs = require("fs");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/api/uploadbook", upload.single("pdfFile"), async (req, res) => {
  try {
    const { title, authorName, uploadedBy, thumbnailImage } = req.body;

    // Ensure title and pdfFile are present
    if (!title || !req.file) {
      return res
        .status(400)
        .json({ message: "Title and PDF file are required" });
    }

    const book = new Book({
      title,
      authorName,
      uploadedBy,
      pdfFile: req.file.path,
      thumbnailImage,
    });

    const savedBook = await book.save();
    res.json(savedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving book" });
  }
});

// get all approved books, available to all
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find({requestStatus: 'approved' }); // Retrieve all books
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

// all the pending books, to be handled by admin
router.get("/pendingbooks", async (req, res) => {
  try {
    const books = await Book.find({requestStatus: 'pending' }); // Retrieve all books
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

//all the rejected books,
router.get("/rejectedbooks", async (req, res) => {
  try {
    const books = await Book.find({requestStatus: 'rejected' }); // Retrieve all books
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});


router.get("/download/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Book.findById(id);
      if (!item) {
        return next(new Error("No item found"));
      }
  

      const filePath = path.join(__dirname, "../", item.pdfFile);
    //   console.log(filePath);
      // Check for file existence
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found" });
      }
  
      res.download(filePath);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error downloading book" });
    }
  });
  
module.exports = router;
