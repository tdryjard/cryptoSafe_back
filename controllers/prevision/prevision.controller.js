const bcrypt = require('bcrypt');
const Prevision = require('../../models/prevision/prevision.model');
const verifyPassword = require('../../middlewares/formValidity/verifyPassword');
const regexList = require('../../utils/regexList');
const jwt = require('jsonwebtoken');
const checkToken = require('../../middlewares/webToken/checkToken')
const checkTokenCookie = require('../../middlewares/webToken/checkTokenCookie')


exports.find = (request, response) => {
  Prevision.find((error, dbResult) => {
    return response.status(200).send(dbResult);
  });
};