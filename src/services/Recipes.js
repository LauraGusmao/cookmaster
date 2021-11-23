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

const updateRecipe = async (id, body, userId, userRole) => {
  const recipe = await model.findRecipeById(id);

  if (userId !== recipe.userId && userRole !== 'admin') {
    return {
      code: 401,
      message: 'User unauthorized to update recipe',
    };
  }

  const updatedRecipe = await model.updateRecipe(id, body);

  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const recipe = await model.findRecipeById(id);

  if (!recipe) {
    return {
      code: 422,
      message: 'Invalid Id',
    };
  }

  const deleted = await model.deleteRecipe(id);

  return deleted;
};

const addRecipeImage = async (id, image, userId, userRole) => {
  const recipe = await model.findRecipeById(id);

  if (userId !== recipe.userId && userRole !== 'admin') {
    return {
      code: 401,
      message: 'User unauthorized to update recipe image',
    };
  }

  const updatedRecipe = await model.updateRecipe(id, { image });

  return updatedRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipeById,
  updateRecipe,
  deleteRecipe,
  addRecipeImage,
};
