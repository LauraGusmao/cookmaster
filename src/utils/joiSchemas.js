const Joi = require('joi');

const newUserSchema = (body) => Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).validate(body);

module.exports = {
  newUserSchema,
};
