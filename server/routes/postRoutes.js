const express = require('express'),
      router = express.Router(),
      postController = require('../controllers/postController')

router.get('/test', postController.Test)

module.exports = router