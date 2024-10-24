//creation d'un router
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// const Books = require("../models/book");
// const Users = require("../models/user");

//importe le controleur createBook
const bookCtrl = require("../controllers/book");

//chemin de base: /api/books
//notre route en POST, envoie des données
router.post("/", auth, bookCtrl.createBookPost);

//notre premier route en GET pour afficher les livres en GET
router.get("/", bookCtrl.afficherBookGet);

//afficher un book avec son id
router.get("/:id", bookCtrl.afficherOneBookGet);

//modifier un book avec son id
router.put("/:id", bookCtrl.modifierOneBookPut);

//supprimer un book avec son id
router.delete("/:id", bookCtrl.supprimerOneBookdelete);

module.exports = router;
