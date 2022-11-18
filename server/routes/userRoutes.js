const express = require('express'),
      router = express.Router(),
      userController = require('../controllers/userController')

router.post('/login', userController.login)
router.post('/signup', userController.signUp)
router.post('/delete', userController.deleteAccount)

module.exports = router