const rescue = require('express-rescue');

const service = require('../services/Users');
const { newUserSchema } = require('../utils/joiSchemas');

const registerUser = rescue(async (req, res, next) => {
  const { error } = newUserSchema(req.body);
  if (error) next(error);

  const { name, email, password } = req.body;

  const newUser = await service.registerUser(name, email, password);
  if (!newUser.user) return next(newUser);

  return res.status(201).json(newUser);
});

module.exports = {
  registerUser,
};
