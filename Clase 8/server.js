const express = require('express');
const multer = require('multer');

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage });


app.post('/uploadFile', upload.single('myFile'),(req, res) => {
    const file = req.file;
    if(!file) {
        const error = new Error('Please select a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
})

app.listen(PORT, () => {
    console.log('Listening on port:' + PORT)
})