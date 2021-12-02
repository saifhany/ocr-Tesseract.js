const express = require('express');
const app = express();
const multer = require('multer');
const Tesseract = require('tesseract.js');

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
            'ara',
            {logger:m=>console.log(m)}
        ).then(({data:{text}})=>{
            return res.json({message:text})
        })

    }catch(error){
        console.log(error)
    }
})

app.listen(3000,()=> {
    console.log('server running');  
})