const Post = require('../models/Post'),
      userVerification = require('../middlewares/verification')

class CommentsController {

  async addNewComment(req, res) {
    const { message, postid } = req.body
    let userProfile = await userVerification(req, res)
    
    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed`})
    }

    try {
      await Post.findOneAndUpdate({ _id: postid }, {
            $push: { 
              comments: {
                user_id: userProfile._id,
                message: message,
                timestamp: new Date
            }}
          }
        )
      res.status(200).send({status: 'success', message: `Comment added`})
    } catch (error) {
      res.status(401).send({status: 'failure', message: `Comment could not be added`, error: error})
    }
  }

  async deleteComment (req, res) {
    const { postid, commentid } = req.body
    let userProfile = await userVerification(req, res)

    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed`})
    }

    try {
      await Post.findOneAndUpdate({ _id: postid }, {
            $pull: { 
              comments: {
                _id: commentid,
            }}
          }
        )
      res.status(200).send({status: 'success', message: `Comment deleted`})
    } catch (error) {
      res.status(401).send({status: 'failure', message: `Comment could not be deleted`, error: error})
    }
  }

}

module.exports = new CommentsController()