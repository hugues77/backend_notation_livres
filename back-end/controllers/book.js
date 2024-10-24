//Toute la logique metier

//importer book du model (bookshema)
const Books = require("../models/book");

//envoyer book
exports.createBookPost = (req, res, next) => {
  // console.log(req.body);
  delete req.body.id;
  const bookapp = new Books({
    // title: req.body.title,
    // author: req.body.author,
    // year: req.body.year,
    // imageUrl: req.body.imageUrl,
    // genre: req.body.genre,
    // averageRating: req.body.averageRating,
    ...req.body,
    // title: "Escalier de la tentation",
    // author: "Handy EYONG",
    // year: 2021,
  });
  console.log(bookapp);

  bookapp
    .save()
    .then(() =>
      res.status(201).json({ message: "Mes donnée sont bien envoyées !" })
    )
    .catch((error) =>
      res.status(400).json({ message: "Pas de resultat, reesayer !" })
    );
};

//afficher book
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
  Books.updateOne(
    {
      _id: req.params.id,
    },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Books modifier avec succès" }))
    .catch((error) => res.status(400).json({ error }));
};

//supprimer un book
exports.supprimerOneBookdelete = (req, res, next) => {
  Books.deleteOne({
    _id: req.params.id,
  })
    .then(() =>
      res
        .status(200)
        .json({ message: "Les données sont supprimés avec plaisir !" })
    )
    .catch((error) => res.status(400).json({ error }));
};
