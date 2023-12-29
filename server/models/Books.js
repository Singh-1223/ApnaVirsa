const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    // validate: {
    //   validator: (value) => value.length > 3,
    //   message: 'Title must be at least 4 characters long',
    // },
  },
  authorName: {
    type: String,
    // required: true,
    trim: true,
    // validate: {
    //   validator: (value) => value.length > 3,
    //   message: 'Author name must be at least 4 characters long',
    // },
  },
  uploadedBy: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    // required: true,
    type:String,
  },
  pdfFile: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.endsWith('.pdf'),
      message: 'Uploaded file must be a PDF',
    },
  },
  thumbnailImage: {
    type: String, // Assuming this is a URL or path to the image
    // required: true,
  },
  dateUploaded: {
    type: Date,
    default: Date.now,
  },
  totalViews: {
    type: Number,
    default: 0,
  },
  totalDownloads: {
    type: Number,
    default: 0,
  },
  requestStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Book', bookSchema);
