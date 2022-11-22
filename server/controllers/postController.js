const Post = require('../models/Post'),
      userVerification = require('../middlewares/verification')

class PostController {
  
  async createNewPost(req, res) {
    const { location, description, imageURL } = req.body
    let userProfile = await userVerification(req, res)
    
    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed`})
    }

    try {
      let result = await Post.create({
        owner_id: userProfile._id,
        location: location,
        description: description,
        image_url: imageURL,
      })
      console.log(result)

      res.status(200).send({status: 'success', message: `Post created successfully`})
    } catch (error) {
      res.status(409).send({status: 'failure', message: `Posted cannot be created ${error}`})
    }
  }

  async deletePost(req, res) {
    const { postId } = req.body
    let userProfile = await userVerification(req, res)
    
    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed`})
    }

    try {
      await Post.deleteOne({ _id: postId })
      res.status(200).send({status: 'success', message: `Post deleted successfully`})
    } catch (error) {
      res.status(409).send({status: 'failure', message: `Post could not be deleted`})
    }

  }

  async getAllPosts(req, res) {
    try {
      let allPosts = await Post.find()
      res.status(200).send({status: 'success', data: allPosts})
    } catch (error) {
      res.status(404).send({status: 'failure', message: `Posts could not be found`})
    }
  }

  async getSpecificPost(req, res) {
    const { postid } = req.params

    try {
      let specificPost = await Post.findOne({ _id: postid})
      res.status(200).send({status: 'success', data: specificPost})
    } catch (error) {
      res.status(404).send({status: 'failure', message: `Post could not be found`})
    }
  }

}

module.exports = new PostController()