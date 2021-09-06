const System = require('../controller/system.contorller');
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/tree', passport.authenticate('jwt', {session : false}), System.getTree);
router.get('/door', passport.authenticate('jwt', {session : false}), System.getDoor);
router.post('/update', passport.authenticate('jwt', {session : false}), System.update);

module.exports = router;

