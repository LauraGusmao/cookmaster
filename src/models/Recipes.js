const { ObjectId } = require('mongodb');
const connection = require('./connection');

// { "name" : "Receita do Jacquin", "ingredients" : "Frango", "preparation" : "10 minutos no forno" }
const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => result.ops[0]);
  
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());

  return recipes;
};

const findRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

  if (!recipe) return null;

  return recipe;
};

const updateRecipe = async (id, recipe) => {
  if (!ObjectId.isValid(id)) return null;

  await connection().then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { ...recipe } }));

  const response = await findRecipeById(id);

  return response;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const deleted = await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

  return deleted;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipeById,
  updateRecipe,
  deleteRecipe,
};
