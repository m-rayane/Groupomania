const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type', 'Authorization'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}

const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const multer = require('multer');
const upload = multer();
const morgan = require('morgan');
const dotenv = require("dotenv").config();
const helmet = require('helmet');


const apiRoute = '/api';
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const app = express();

// app.use(
//   helmet({
//     crossOriginResourcePolicy: false, // allow img in cors for http
//     crossOriginEmbedderPolicy: false, // allow img in cors for https
//   })
// )

// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.apwibmo.mongodb.net/?retryWrites=true&w=majority


// connect to mongodb
mongoose.connect(`mongodb://localhost:27017/groupomania?authMechanism=DEFAULT`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connecttion to MongoDB successful !'))
  .catch(() => console.log('Connecttion to MongoDB failed !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(
  mongoSanitize({
    remplaceWith: '_',
  })
)


app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())


// app.use(upload.array()); 
app.use(express.static('public'));

app.use('/api', userRoutes);
app.use('/api', postRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
