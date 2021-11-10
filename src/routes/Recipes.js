const express = require('express');

const Recipes = require('../controllers/Recipes');
const validateJWt = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWt, Recipes.createRecipe);
router.get('/', Recipes.getAllRecipes);
router.get('/:id', Recipes.findRecipeById);

module.exports = router;