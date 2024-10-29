//Toute la logique metier

//importer book du model (bookshema)
const { json } = require("body-parser");
const Books = require("../models/book");

const fs = require("fs");

//envoyer book
exports.createBookPost = (req, res, next) => {
  // console.log(req.body);
  // delete req.body.id;

  //Une nouvelle approche
  //parser la requete
  const booksObject = JSON.parse(req.body.book);
  delete booksObject.id;
  delete booksObject.userId;

  const bookApp = new Books({
    ...booksObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  bookApp
    .save()
    .then(() => {
      res.status(201).json({ message: "Book envoyé avec succès !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });

  //première approche
  // const bookapp = new Books({
  //   // title: req.body.title,
  //   // author: req.body.author,
  //   // year: req.body.year,
  //   // imageUrl: req.body.imageUrl,
  //   // genre: req.body.genre,
  //   // averageRating: req.body.averageRating,

  //   ...req.body,

  //   // title: "Escalier de la tentation",
  //   // author: "Handy EYONG",
  //   // year: 2021,
  // });
  // console.log(bookapp);

  //   bookapp
  //     .save()
  //     .then(() => res.status(201).json({ message: "Book envoyés avec succès !" }))
  //     .catch((error) =>
  //       res.status(400).json({ message: "Pas de resultat, reesayer !" })
  //     );
};

//afficher books
exports.afficherBookGet = (req, res, next) => {
  Books.find()
    .then((books_all) => res.status(200).json(books_all))
    .catch((error) => res.status(400).json({ error }));
  //on affiche le resultat ou la reponse
  //res.status(200).json(book);
};

//afficher un seul objet par son identifiant

exports.afficherOneBookGet = (req, res, next) => {
  Books.findOne({
    _id: req.params.id,
  })
    .then((oneBook) => res.status(200).json(oneBook))
    .catch((error) => res.status(404).json({ error }));
};

//Modifier un seul book
exports.modifierOneBookPut = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  //on supprime l'userId
  delete bookObject.userId;

  Books.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Accès refusé, pas d'autorisation !" });
      } else {
        Books.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() =>
            res.status(200).json({ message: "Book modifié avec succès." })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
  //premiere approche
  // Books.updateOne(
  //   {
  //     _id: req.params.id,
  //   },
  //   { ...req.body, _id: req.params.id }
  // )
  //   .then(() => res.status(200).json({ message: "Books modifier avec succès" }))
  //   .catch((error) => res.status(400).json({ error }));
};

//supprimer un book
exports.supprimerOneBookdelete = (req, res, next) => {
  Books.findOne({
    _id: req.params.id,
  })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({
          message: "Accès refusé, pas d'autorisation !",
        });
      } else {
        const filename = book.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          Books.deleteOne({ _id: req.params.id })
            .then(() =>
              res.status(200).json({
                message: "Suppression du Book a été éffectuée avec succès !",
              })
            )
            .catch((error) => {
              res.status(500).json({ error });
            });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  //premiere Approche
  // Books.deleteOne({
  //   _id: req.params.id,
  // })
  //   .then(() =>
  //     res
  //       .status(200)
  //       .json({ message: "Les données sont supprimés avec plaisir !" })
  //   )
  //   .catch((error) => res.status(400).json({ error }));
};

//envoyez la note d'un book, tenir compte de userId
exports.definirNoteBookpost = (req, res, next) => {
  const bookRating = req.body.rating;
  // const userId = req.auth.userId;
  const userId = "671a06cd40af4feb036e1ade";

  Books.findOne({
    _id: req.params.id,
  })
    .then((bookOne) => {
      if (0 <= bookRating <= 5) {
        //verifier si userId exist déjà dans le tableau
      } else {
        res.status(401).json({ message: "Choisir une note entre 0 et 5" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//afficher 3 livres qui ont la meilleurs notes moyennes
exports.afficherThreeBookGet = (req, res, next) => {
  Books.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((treeBook) => res.status(200).json(treeBook))
    .catch((error) => res.status(400).json({ error }));
};
