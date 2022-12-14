const port = process.env.PORT || 8800;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const likeRoute = require('./routes/likes');
var cors = require('cors')
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
        method: ['GET', 'POST', 'DELETE', 'PUT']
    }
))

dotenv.config();

mongoose.connect(process.env.MONGO_URL
    , { useNewUrlParser: true, useUnifiedTopology: true }
    , () => {
        console.log('Connected to Mongo DB')
    });

// middleware
// body parser, on post request parse the request
app.use(upload.single('imageFile'));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/likes', likeRoute);

app.listen(port, () => { console.log(`Server listening to port ${port}`) });