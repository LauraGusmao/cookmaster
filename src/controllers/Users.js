const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const service = require('../services/Users');
const { newUserSchema } = require('../utils/joiSchemas');

const secret = 'cookmaster';

const registerUser = rescue(async (req, res, next) => {
  const { error } = newUserSchema(req.body);
  if (error) next(error);

  const { name, email, password } = req.body;

  const newUser = await service.registerUser(name, email, password);
  if (!newUser.user) return next(newUser);

  return res.status(201).json(newUser);
});

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await service.login(email, password);
  if (!user.user) return next(user);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user.user }, secret, jwtConfig);

  return res.status(200).json({ token });
});

module.exports = {
  registerUser,
  login,
};
