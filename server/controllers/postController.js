const Post = require('../models/Post')

class PostController {
  async Test(req, res) {
    res.send('Post working')
  }

}

module.exports = new PostController()