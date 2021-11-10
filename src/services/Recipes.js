const model = require('../models/Recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await model.createRecipe(name, ingredients, preparation, userId);

  return { recipe: newRecipe };
};

module.exports = {
  createRecipe,
};
