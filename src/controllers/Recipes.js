const rescue = require('express-rescue');

const service = require('../services/Recipes');
const { newRecipeSchema } = require('../utils/joiSchemas');

const createRecipe = rescue(async (req, res, next) => {
  const { error } = newRecipeSchema(req.body);
  if (error) return next(error);

  const { name, ingredients, preparation } = req.body;
  
  const newRecipe = await service.createRecipe(name, ingredients, preparation, req.userId);

  return res.status(201).json(newRecipe);
});

module.exports = {
  createRecipe,
};
