const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/user");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const userApp = new Users({
        email: req.body.email,
        password: hash,
      });
      userApp
        .save()
        .then(() =>
          res
            .status(201)
            .json({ message: "User a été bien ajouté dans la base !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//fonction login
exports.login = (req, res, next) => {
  Users.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Identifiant/mot de passe incorrecte !" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "Identifiant/mot de passe incorrecte !" });
            } else {
              res.status(200).json({
                userId: user.id,
                token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
