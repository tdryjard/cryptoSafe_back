const bcrypt = require('bcrypt');
const User = require('../../models/register/register.model');
const verifyPassword = require('../../middlewares/formValidity/verifyPassword');
const regexList = require('../../utils/regexList');
const jwt = require('jsonwebtoken');
const checkToken = require('../../middlewares/webToken/checkToken')
const checkTokenCookie = require('../../middlewares/webToken/checkTokenCookie')

// Creer un nouvel utilisateur
exports.create = function createUser(request, response) {
  const {
    email,
      password,
      customer_id
  } = request.body;

  // Creer un utilisateur
  const user = new User({
    email: email || null,
    password: password || null,
    customer_id: customer_id || null
  });

  // Encryptage du mot de passe
  user.password = bcrypt.hashSync(user.password, 10);

  // Enregistre un utilisateur
  return User.create(user, (error, data) => {
    if (error) {
      return response.status(500).send({
        message: error.message || 'Some error occurred while creating the user.'
      });
    } else{
    // Envoi de la réponse en status 201 soit (Created)
    return response.status(200).send({
      text: 'Vous êtes connecté.',
      id : data.id
    });
  }
});
};




exports.connect = function userConnectToTheWebsite(request, response) {
  const { email, password } = request.body;

  return User.connect(email, (err, data) => {
    // Decryptage du mot de passe en base de données et verification d'une correspondance avec celui que l'utilisateur a rentrer

    if (password && data) {
      const samePassword = bcrypt.compareSync(password, data.password);
      if (!samePassword) return response.status(400).send({
        alertType: 'error'
      });
    } else return response.status(400);

    if (err) {
      return response.status(400);
    }

    // Génération du jsonWebToken
    const token = jwt.sign({ id: data.id, exp: (Date.now() / 1000 + (60 * 60 * 120)) }, `${process.env.SECRET_KEY}`);
    let email = data.email || null
    let id = data.id || null

    return response.status(200).send({
      text: 'Vous êtes connecté.',
      id,
      email,
      token,
      alertType: 'success'
    });
  });
};

exports.find = (request, response) => {
  User.find(request.params.userId, (error, dbResult) => {
    if (error !== null) {
      if (error.kind === 'not_found') {
        return response.status(404).send({
          message: `Not found user with id ${request.params.userId}.`
        });
      }
      return response.status(500).send({
        message: `Error retrieving user with id ${request.params.userId}`
      });
    }
    return response.status(200).send(dbResult);
  });
};

exports.delete = (request, response) => {
  const { id } = request.params;
  User.delete(id, (err, result) => {
    if (err !== null) {
      return response.status(err.status).send(err);
    }

    return response.status(200).send(result);
  });
};