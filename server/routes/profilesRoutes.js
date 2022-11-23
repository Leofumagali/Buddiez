const express = require('express'),
      router = express.Router(),
      profilesController = require('../controllers/profilesController')

  router.post('/profile', profilesController.showAllProfilesThatMatches)
  router.post('/follow', profilesController.followProfile)
  router.post('/unfollow', profilesController.unfollowProfile)
  router.get('/favorites/:profileid', profilesController.showFavoritePosts)
  router.get('/posts/:profileid', profilesController.showPostsFromProfile)
  router.get('/:userid', profilesController.showSpecificProfile)

module.exports = router