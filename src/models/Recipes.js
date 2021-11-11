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

const updateRecipe = async (id, body, userId) => {
  const { name, ingredients, preparation } = body;
  
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connection().then((db) => db.collection('recupes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
    .then(() => ({ _id: id, name, ingredients, preparation, userId }));

  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipeById,
  updateRecipe,
};
