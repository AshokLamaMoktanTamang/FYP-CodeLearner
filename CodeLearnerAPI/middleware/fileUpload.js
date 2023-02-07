const multer = require("multer");
const { google } = require("googleapis");
const GoogleDriveStorage = require("multer-google-drive");

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;
const oauth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: "v3",
  auth: oauth2client,
});

// initializing the multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/CVs");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    req.body.CV = uniqueSuffix + "-" + file.originalname;
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// const upload = multer({
//   storage: GoogleDriveStorage({
//     drive: drive,
//     parents: "1rde0KeLAam4JBOlZUBwE-Fwi7bf4sZsl",
//     filename: (req, file, cb) => {
//       console.log(file.originalname, req.body);
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       req.body.fileName = uniqueSuffix + "-" + file.originalname;
//       cb(null, uniqueSuffix + "-" + file.originalname);
//     },
//   }),
// });

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage,
});

module.exports = upload;
