const express = require('express'),
      router = express.Router(),
      userController = require('../controllers/userController')

router.post('/login', userController.login)
router.put('/signup', userController.signUp)
router.delete('/delete', userController.deleteAccount)
router.patch('/cgpassword', userController.changePassword)

module.exports = router