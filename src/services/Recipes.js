const model = require('../models/Recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await model.createRecipe(name, ingredients, preparation, userId);

  return { recipe: newRecipe };
};

const getAllRecipes = async () => {
  const recipes = await model.getAllRecipes();

  return recipes;
};

const findRecipeById = async (id) => {
  const recipe = await model.findRecipeById(id);

  if (!recipe) {
    return {
      code: 404,
      message: 'recipe not found',
    };
  }

  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipeById,
};
