const express = require('express');

const Recipes = require('../controllers/Recipes');
const validateJWt = require('../middlewares/validateJWT');
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/', validateJWt, Recipes.createRecipe);
router.get('/', Recipes.getAllRecipes);
router.get('/:id', Recipes.findRecipeById);
router.put('/:id', validateJWt, Recipes.updateRecipe);
router.delete('/:id', validateJWt, Recipes.deleteRecipe);
router.put('/:id/image', validateJWt, upload.single('image'), Recipes.addRecipeImage);

module.exports = router;