const express = require('express');

const Users = require('../controllers/Users');
const validateJWt = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/users', Users.registerUser);
router.post('/login', Users.login);
router.post('/users/admin', validateJWt, Users.registerAdmin);

module.exports = router;
