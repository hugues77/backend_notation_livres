const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { error } = require("console");

// test avec sharp
// sharp("images/1234.jpeg")
//   .resize({ width: 427 })
//   .toFile("images/handy1.jpeg");

module.exports = (req, res, next) => {
  const inputfile = path.join(__dirname, "../images/", req.file.filename);
  const outputfile = path.join(
    __dirname,
    "../images/compressed_" + req.file.filename
  );

  if (!req.file) {
    console.log("merci de télécharger une image du livre");
  }
  sharp.cache(false);

  sharp(inputfile)
    .resize({ width: 206, height: 260 })
    .toFile(outputfile)
    .then(() => {
      fs.unlink(inputfile, () => {
        req.file.filename = `compressed_${req.file.filename}`;
        next();
      });
    })
    .catch((error) => res.status(400).json(error));
};
