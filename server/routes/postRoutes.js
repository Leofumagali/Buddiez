const express = require('express'),
      router = express.Router(),
      postController = require('../controllers/postController')

router.put('/create', postController.createNewPost)
router.delete('/delete', postController.deletePost)

router.get('/allposts', postController.getAllPosts)
router.get('/:postid', postController.getSpecificPost)
router.post('/savepost', postController.saveFavoritePost)
router.delete('/unsavepost', postController.deleteFavoritePost)

module.exports = router