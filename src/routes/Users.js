const express = require('express');

const Users = require('../controllers/Users');

const router = express.Router();

router.post('/users', Users.registerUser);
router.post('/login', Users.login);

module.exports = router;
