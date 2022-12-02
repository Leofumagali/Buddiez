const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile_pic: {
    type: String,
    default: 'https://64.media.tumblr.com/58ad30500e096781e56e5f31e50c561c/0767393739a2484f-05/s540x810/2bfbc14411783260ef0d80c4cafd99a55a12aca1.pnj'
  },
  profile_pic_id: {
    type: String,
    default: '',
  },
  birthday: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    lowercase: true
  },
  species: {
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    default: ""
  },
  favorite_posts: [{
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
  followers: [{
      follower_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
  following: [{
      following_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
  admin: {
    type: Boolean,
    default: false
  },
  signin_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('users', UserSchema)