const Joi = require('joi');

const newUserSchema = (body) => Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).validate(body);

const newRecipeSchema = (body) => Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
}).validate(body);

module.exports = {
  newUserSchema,
  newRecipeSchema,
};
