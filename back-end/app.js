const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//on importe le router de books
const bookRoutes = require("./routes/book");
//on importe le router de users
const userRoutes = require("./routes/user");

//importer path
const path = require("path");

//connexion avec la bdd
// mongoose.set();
mongoose
  .connect(
    "mongodb+srv://Books_user:25101997@cluster0.cvim7.mongodb.net/vGrmoire_db"
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() => console.log("connexion à MongoDB reussi !"))
  .catch(() => console.log("connexion à MongoDB échouée"));

const app = express();

//permettre a express de nous donner des route en post
app.use(express.json());

//on rajoute un middleware général pour gérer le CORS origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, x-Request-with, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

//on remplace la logique ici pour les routes attendues
app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
