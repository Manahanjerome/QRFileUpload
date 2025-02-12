const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const QRCode = require('qrcode');

const app = express();
app.use(cors()); // Enable CORS for mobile devices
app.use(express.static('public')); // Serve static files

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve the main page with the QR code
app.get('/', async (req, res) => {
  const localIp = '192.168.1.100'; // Replace this with your actual local IP address
  const qrUrl = `http://${localIp}:3000/upload`; // URL the QR code will link to
  const qrCode = await QRCode.toDataURL(qrUrl); // Generate QR code as a base64 image

  res.send(`
    <html>
      <head>
        <title>QR File Upload</title>
      </head>
      <body style="text-align: center; font-family: Arial;">
        <h1>Scan the QR Code to Upload a File</h1>
        <p><img src="${qrCode}" alt="QR Code" /></p>
        <p>Or visit: <a href="${qrUrl}">${qrUrl}</a></p>
      </body>
    </html>
  `);
});

// File upload page
app.get('/upload', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Upload File</title>
      </head>
      <body style="text-align: center; font-family: Arial;">
        <h1>Upload a File</h1>
        <form action="/upload" method="POST" enctype="multipart/form-data">
          <input type="file" name="file" required />
          <button type="submit">Upload</button>
        </form>
      </body>
    </html>
  `);
});

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send(`File uploaded successfully: ${req.file.originalname}`);
});

// Start the server
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running at http://0.0.0.0:3000');
});
