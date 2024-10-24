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
