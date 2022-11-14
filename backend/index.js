const port = process.env.PORT || 8800;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

mongoose.connect(process.env.MONGO_URL
    , { useNewUrlParser: true, useUnifiedTopology: true }
    , () => {
        console.log('Connected to Mongo DB')
    });

// middleware
// body parser, on post request parse the request
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.listen(port, () => { console.log(`Server listening to port ${port}`) });