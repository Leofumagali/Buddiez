const Post = require('../models/Post'),
      User = require('../models/User'),
      userVerification = require('../middlewares/verification')
const { populate } = require('../models/User')

class PostController {
  
  async createNewPost(req, res) {
    const { location, description, imageURL, image_public_id } = req.body
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
        image_public_id: image_public_id
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
      return res.status(401).send({status: 'failure', message: `Authentication failed.`})
    }

    try {
      let deletedPost = await Post.findOneAndDelete({ _id: postId })
      
      if(deletedPost.image_public_id) {
        await cloudinary.v2.api.delete_resources([deletedPost.image_public_id])
      }

      res.status(200).send({status: 'success', message: `Post deleted successfully.`})
    } catch (error) {
      res.status(409).send({status: 'failure', message: `Post could not be deleted.`})
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
      let specificPost = await Post.findOne({ _id: postid}).populate('comments.user_id')
      res.status(200).send({status: 'success', data: specificPost})
    } catch (error) {
      res.status(404).send({status: 'failure', message: `Post could not be found`})
    }
  }

  async saveFavoritePost(req, res) {
    const { postid } = req.body
    const userProfile = await userVerification(req, res)

    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed`})
    }

    try {
      await User.findOneAndUpdate({ _id: userProfile._id }, {
        $push: {
          favorite_posts: {
            post_id: postid
          }
        }
      })
      res.status(200).send({status: 'success', message: `Post saved`})
    } catch(error) {
      res.status(404).send({status: 'failure', message: `Post could not be saved`})
    }
  }

  async deleteFavoritePost(req, res) {
    const { postid } = req.body
    const userProfile = await userVerification(req, res)

    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed`})
    }

    try {
      await User.findOneAndUpdate({ _id: userProfile._id }, {
        $pull: {
          favorite_posts: {
            post_id: postid
          }
        }
      })
      res.status(200).send({status: 'success', message: `Favorite post deleted`})
    } catch(error) {
      res.status(404).send({status: 'failure', message: `Favorite post could not be deleted`})
    }
  }
}

module.exports = new PostController()