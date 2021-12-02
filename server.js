const express = require('express');
const app = express();
const multer = require('multer');
const Tesseract = require('tesseract.js');
const dotenv = require('dotenv')

dotenv.config()

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'./uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage});

app.post('/api/upload',upload.single('uploadedImage'),(req,res)=>{
    try{
        Tesseract.recognize(
            'uploads/'+req.file.filename,
            // 'eng',
            'ara',
            {logger:m=>console.log(m)}
        ).then(({data:{text}})=>{
            return res.json({message:text})
        })

    }catch(error){
        console.log(error)
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

