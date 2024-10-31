require('dotenv').config();
const cors = require('cors');
const multer = require("multer");
const express = require('express');

const app = express();

app.use(cors());
app.use(express.static(process.cwd() + '/public'));

// File Metadata Microservice
const upload = multer({ dest: "uploads/" });
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const { originalname: name, mimetype: type, size } = req.file;
  res.json({ name, type, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

process.once("SIGKILL", () => {
  console.log("test");
  require('fs').rmSync('uploads', { recursive: true });
});