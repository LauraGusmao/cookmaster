const model = require('../models/Recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await model.createRecipe(name, ingredients, preparation, userId);

  return { recipe: newRecipe };
};

const getAllRecipes = async () => {
  const recipes = await model.getAllRecipes();

  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
