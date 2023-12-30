const connectToMongo= require('./db');
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const bookspath = require('./routes/books');
const adminpath = require('./routes/admin');

connectToMongo();

const app = express();
const port = 5000;

// Enable CORS middleware with multiple origins
app.use(cors({
    origin: ['http://localhost:5173', 'https://apnavirsa.vercel.app'] // Allow requests from these origins
  }));

app.use(express.json());
app.use(bodyParser.json()); // Make sure this line is present

//pdf, books paths/routes
app.use('/',bookspath);

//admin routes , login , dashboard ,requests
app.use('/',adminpath);

app.listen(port,()=>{
    console.log(`Backend at port http://localhost:${port}`)
}) 


