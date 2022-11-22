const express = require('express'),
      router = express.Router(),
      postController = require('../controllers/postController')

router.put('/create', postController.createNewPost)
router.delete('/delete', postController.deletePost)

router.get('/allposts', postController.getAllPosts)
router.get('/:postid', postController.getSpecificPost)

module.exports = router