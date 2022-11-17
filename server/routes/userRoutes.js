const express = require('express'),
      router = express.Router(),
      userController = require('../controllers/userController')

router.get('test', userController.Test)

module.exports = router