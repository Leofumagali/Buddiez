const express = require('express'),
      router = express.Router(),
      postController = require('../controllers/postController')

router.put('/create', postController.createNewPost)
router.delete('/delete', postController.deletePost)

router.get('/allposts', postController.getAllPosts)
router.post('/likepost', postController.likePost)
router.post('/unlikepost', postController.unlikePost)
router.post('/savepost', postController.saveFavoritePost)
router.delete('/unsavepost', postController.deleteFavoritePost)
router.get('/:postid', postController.getSpecificPost)

module.exports = router