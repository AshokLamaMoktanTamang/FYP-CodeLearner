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

// initializing the multer for cv upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "CV") {
      cb(null, "uploads/CVs");
    }
    if (file.fieldname === "profile") {
      cb(null, "uploads/Profiles");
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    if (file.fieldname === "CV") {
      req.body.CV = uniqueSuffix + "-" + file.originalname;
    } else if (file.fieldname === "profile") {
      req.body.profilePic = uniqueSuffix + "-" + file.originalname;
    }
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// initializing the multer for course upload
const courseStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "courseFile") {
      cb(null, "uploads/Courses");
    } else if (file.fieldname === "thumbnail") {
      cb(null, "uploads/Thumbnails");
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    if (file.fieldname === "courseFile") {
      req.body.courseFile = uniqueSuffix + "-" + file.originalname;
    } else if (file.fieldname === "thumbnail") {
      req.body.thumbnail = uniqueSuffix + "-" + file.originalname;
    }
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage,
});

const courseUpload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.slice("/")[0] == "video" &&
      file.size > 100 * 1024 * 1024
    ) {
      return cb(new Error("File too large"));
    }

    if (file.mimetype.slice("/")[0] == "image" && file.size > 5 * 1024 * 1024) {
      return cb(new Error("File too large"));
    }

    cb(null, true);
  },
  limits: { fileSize: 100 * 1024 * 1024 },
  storage: courseStorage,
});

module.exports = { upload, courseUpload };
