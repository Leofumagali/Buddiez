const express = require('express'),
      router = express.Router(),
      userController = require('../controllers/userController')

router.get('/signup', userController.signUp)

module.exports = router