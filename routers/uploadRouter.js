const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'./uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage});

uploadRouter.post('/',upload.single('uploadedImage'),(req,res)=>{
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
// https://ocressera.herokuapp.com
module.exports = uploadRouter;
