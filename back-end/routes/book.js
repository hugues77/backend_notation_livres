//creation d'un router
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// const Books = require("../models/book");
// const Users = require("../models/user");

//importe le controleur Book pour tous les books
const bookCtrl = require("../controllers/book");

//importe middleware muter pour gerer les images
const multer = require("../middleware/multer-config");

//sharp
const resizeImage = require("../middleware/sharp-resize");

//chemin de base: /api/books
//notre route en POST, envoie des données

// router.post("/", auth, bookCtrl.createBookPost);
router.post("/", auth, multer, resizeImage, bookCtrl.createBookPost);

//notre premier route en GET pour afficher les livres en GET

//Tree Book - recommandations
router.get("/bestrating", bookCtrl.afficherThreeBookGet);

//All Books - accueil
router.get("/", bookCtrl.afficherBookGet);

//afficher un book avec son id
router.get("/:id", bookCtrl.afficherOneBookGet);

//afficher 3 livres qui ont la meilleurs notes moyennes
// router.get("/bestrating", bookCtrl.afficherThreeBookGet);

//envoyez la note pour un book
router.post("/:id/rating", auth, bookCtrl.definirNoteBookpost);

//modifier un book avec son id
router.put("/:id", auth, multer, resizeImage, bookCtrl.modifierOneBookPut);

//supprimer un book avec son id
router.delete("/:id", auth, bookCtrl.supprimerOneBookdelete);

module.exports = router;
