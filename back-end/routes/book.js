//creation d'un router
const express = require("express");
const router = express.Router();

// const Books = require("../models/book");
// const Users = require("../models/user");

//importe le controleur createBook
const bookCtrl = require("../controllers/book");

//chemin de base: /api/books
//notre route en POST, envoie des données
router.post("/", bookCtrl.createBookPost);

//notre premier route en GET pour afficher les livres en GET
router.get("/", bookCtrl.afficherBookGet);

module.exports = router;
