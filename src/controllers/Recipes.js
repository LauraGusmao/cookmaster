const rescue = require('express-rescue');

const service = require('../services/Recipes');
const { newRecipeSchema } = require('../utils/joiSchemas');

const createRecipe = rescue(async (req, res, next) => {
  const { error } = newRecipeSchema(req.body);
  if (error) return next(error);

  const { name, ingredients, preparation } = req.body;
  
  const newRecipe = await service.createRecipe(name, ingredients, preparation, req.userId);
  console.log(req.userId);
  return res.status(201).json(newRecipe);
});

const getAllRecipes = rescue(async (_req, res) => {
  const recipes = await service.getAllRecipes();

  return res.status(200).json(recipes);
});

const findRecipeById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const recipe = await service.findRecipeById(id);

  if (recipe.code) return next(recipe);

  return res.status(200).json(recipe);
});

const updateRecipe = rescue(async (req, res, next) => {
  const { error } = newRecipeSchema(req.body);
  if (error) return next(error);

  const { id } = req.params;

  const updatedRecipe = await service.updateRecipe(id, req.body, req.userId, req.userRole);

  return res.status(200).json(updatedRecipe);
});

const deleteRecipe = rescue(async (req, res, next) => {
  const { id } = req.params;

  const recipe = await service.deleteRecipe(id);

  if (recipe.code) return next(recipe);

  return res.status(204).send();
});

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipeById,
  updateRecipe,
  deleteRecipe,
};
