const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());  // Enable CORS for mobile devices
app.use(express.static('public'));  // Serve static files (like the HTML page)

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });  // 'uploads' is the folder where files will be saved

// Endpoint for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded successfully: ${req.file.originalname}`);
});

// Start the server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
