const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    // const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    const name = Date.now() + "." + extension;
    callback(null, name);
  },
});

module.exports = multer({ storage }).single("image");
