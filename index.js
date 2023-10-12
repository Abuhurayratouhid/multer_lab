const express = require('express')
const app = express()
const port = 3001;
const cors = require('cors');
const multer = require('multer');

app.use(cors());

//  Configure Multer to store files in a specific directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Set the file name to the original name of the uploaded file
  },
});
const upload = multer({ storage: storage });




// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
  res.send('File uploaded successfully!');
});



// Handle multiple file uploads from a single field
app.post('/upload-multiple-files-from-single-field', upload.array('files', 5), (req, res) => {
    console.log(req.files)
    // 'files' is the field name for the file input in your form
    // You can specify the maximum number of files allowed (e.g., 5 in this case)
    // req.files will contain an array of uploaded files
    res.send('Multiple-files-from-single-field uploaded successfully!');
  });




  // Handle multiple file uploads with different field names
app.post('/upload-multiple-files', upload.fields([
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 1 },
  ]), (req, res) => {
    console.log(req.files)
    // 'file1' and 'file2' are the field names for the file inputs in your form
    // You can specify the maximum count for each field
    // req.files will contain the uploaded files with their respective field names
    res.send('Multiple Files uploaded successfully!');
  });

app.get('/', (req, res) => {
  res.send('Hello Multer!')
})

app.listen(port, () => {
  console.log(`🔥 File uploading app listening on port ${port} 🔥`)
})