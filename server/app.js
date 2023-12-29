const connectToMongo= require('./db');
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const bookspath = require('./routes/books');


connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // Make sure this line is present

//pdf, books paths/routes
app.use('/',bookspath);

app.listen(port,()=>{
    console.log(`Backend at port http://localhost:${port}`)
}) 


