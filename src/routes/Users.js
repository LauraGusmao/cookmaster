const express = require('express');

const Users = require('../controllers/Users');

const router = express.Router();

router.post('/', Users.registerUser);

module.exports = router;
