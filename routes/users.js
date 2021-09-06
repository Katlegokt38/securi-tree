const User = require('../controller/user.controller');
const express = require('express');
const router = express.Router();

router.post('/authenticate', User.authenticate);

module.exports = router;