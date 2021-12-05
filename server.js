const express = require('express');
const app = express();
const multer = require('multer');
const Tesseract = require('tesseract.js');
const dotenv = require('dotenv')
var cors = require('cors')  //use this
const uploadRouter = require('./routers/uploadRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()) 

dotenv.config()



app.use('/api/uploads', uploadRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

