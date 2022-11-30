const express = require('express'),
      router = express.Router(),
      profilesController = require('../controllers/profilesController')

  router.post('/profile', profilesController.showAllProfilesThatMatches)
  router.post('/follow', profilesController.followProfile)
  router.post('/unfollow', profilesController.unfollowProfile)
  router.get('/favorites/:profileid', profilesController.showFavoritePosts)
  router.get('/posts/:username', profilesController.showPostsFromProfile)
  router.get('/:username_or_id', profilesController.showSpecificProfile)

module.exports = router