const express = require('express'),
      router = express.Router(),
      commentsController = require('../controllers/commentsController')

router.post('/addcomment', commentsController.addNewComment)
router.delete('/deletecomment', commentsController.deleteComment)

module.exports = router