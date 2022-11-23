const User = require('../models/User'),
      Post = require('../models/Post'),
      userVerification = require('../middlewares/verification')

class ProfilesController {

  async showSpecificProfile(req, res) {
    const { userid } = req.params
    try {
      let user = await User.find({ _id: userid })
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
    const { profileid } = req.body
    let userProfile = await userVerification(req, res)
    
    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed.`})
    }

    try {
      await User.findOneAndUpdate({ _id: profileid }, {
        $push: {
          followers: {
            follower_id: userProfile._id
          }
        }
      })

      await User.findOneAndUpdate({ _id: userProfile._id }, {
        $push: {
          following: {
            following_id: profileid
          }
        }
      })

      res.status(200).send({status: 'success', message: `Profile followed successfully.`})
    } catch(error) {
      res.status(401).send({status: 'failure', message: `Profile was not followed.`})
    }
  }

  async unfollowProfile(req, res) {
    const { profileid } = req.body
    let userProfile = await userVerification(req, res)
    
    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed.`})
    }

    try {
      await User.findOneAndUpdate({ _id: profileid }, {
        $pull: {
          followers: {
            follower_id: userProfile._id
          }
        }
      })

      await User.findOneAndUpdate({ _id: userProfile._id }, {
        $pull: {
          following: {
            following_id: profileid
          }
        }
      })

      res.status(200).send({status: 'success', message: `Profile unfollowed successfully.`})
    } catch(error) {
      res.status(401).send({status: 'failure', message: `Profile was not unfollowed.`})
    }
  }

  async showPostsFromProfile(req, res) {
    const { profileid } = req.params

    try {
      let postsFromProfile = await Post.find({ owner_id: profileid })
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