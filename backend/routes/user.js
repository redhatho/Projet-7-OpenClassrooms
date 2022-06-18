const express = require('express');
const router = express.Router();
const max = require("../middleware/limit")

const userCtrl = require('../controllers/user');
const password = require('../middleware/password');

router.post('/signup', password, userCtrl.signup);
router.post('/login', max.limiter, userCtrl.login);

module.exports = router;