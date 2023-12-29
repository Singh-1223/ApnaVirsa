// const Book = require('../models/Books');
// const path = require("path");
// const asyncWrapper = require("../middleware/asyncWrapper");

// const downloadFile = asyncWrapper(async (req, res) => {
//     const { id } = req.params;
//     const item = await Book.findById(id);
//     if (!item) {
//       return next(new Error("No item found"));
//     }
//     const file = item.file;
//     const filePath = path.join(__dirname, `../${file}`);
//     res.download(filePath);
//   });