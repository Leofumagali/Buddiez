const express = require('express'),
      router = express.Router(),
      userController = require('../controllers/userController')

router.post('/login', userController.login)
router.post('/verify', userController.verifyUser)
router.put('/signup', userController.signUp)
router.delete('/delete', userController.deleteAccount)
router.patch('/cgpassword', userController.changePassword)
router.patch('/editprofile', userController.editProfile)

module.exports = router