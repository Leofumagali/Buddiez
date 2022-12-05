const User = require('../models/User'),
      Post = require('../models/Post'),
      userVerification = require('../middlewares/verification')

class ProfilesController {

  async showSpecificProfile(req, res) {
    const { username_or_id } = req.params
    try {
      let user = await User.findOne({ username: username_or_id })
      if(user === null) {
        user = await User.findOne({ _id: username_or_id })
      }
      res.status(200).send({status: 'success', data: user})
    } catch(error) {
      res.status(404).send({status: 'failure', message: `User not found`})
    }
  }
  
  async showAllProfilesThatMatches(req, res) {
    const { username } = req.body

    try {
      let allUsersThatMatches = await User.find({ username: new RegExp(username, 'i') })
      res.status(200).send({status: 'success', data: allUsersThatMatches})
    } catch(error) {
      res.status(404).send({status: 'failure', message: `Users not found`})
    }
  }

  async followProfile(req, res) {
    const { id } = req.body
    let userProfile = await userVerification(req, res)

    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed.`})
    }
    
    try {
      await User.findOneAndUpdate({ _id: id }, {
        $push: {
          followers: {
            follower_id: userProfile._id
          }
        }
      })
      
      let userToGetProfileId = await User.findOne({ _id: id })

      await User.findOneAndUpdate({ _id: userProfile._id }, {
        $push: {
          following: {
            following_id: userToGetProfileId._id
          }
        }
      })

      res.status(200).send({status: 'success', message: `Profile followed successfully.`})
    } catch(error) {
      res.status(401).send({status: 'failure', message: `Profile was not followed.`})
    }
  }

  async unfollowProfile(req, res) {
    const { id } = req.body
    let userProfile = await userVerification(req, res)
    
    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed.`})
    }

    try {
      await User.findOneAndUpdate({ _id: id }, {
        $pull: {
          followers: {
            follower_id: userProfile._id
          }
        }
      })

      let userToGetProfileId = await User.findOne({ _id: id })

      await User.findOneAndUpdate({ _id: userProfile._id }, {
        $pull: {
          following: {
            following_id: userToGetProfileId._id
          }
        }
      })

      res.status(200).send({status: 'success', message: `Profile unfollowed successfully.`})
    } catch(error) {
      res.status(401).send({status: 'failure', message: `Profile was not unfollowed.`})
    }
  }

  async showPostsFromProfile(req, res) {
    const { username } = req.params

    try {
      let userProfile = await User.findOne({ username })
      let postsFromProfile = await Post.find({ owner_id: userProfile._id })
      res.status(200).send({status: 'success', data: postsFromProfile})
    } catch(error) {
      res.status(404).send({status: 'failure', message: `Posts not found.`})
    }
  }

  async showFavoritePosts(req, res) {
    const { profileid } = req.params

    try {
      let favoritePostsFromProfile = await User.findOne({ _id: profileid })
      res.status(200).send({status: 'success', data: favoritePostsFromProfile.favorite_posts})
    } catch(error) {
      res.status(404).send({status: 'failure', message: `Favorite posts not found.`})
    }
  }
}


module.exports = new ProfilesController()