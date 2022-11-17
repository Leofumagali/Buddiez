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
  birthday: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  favorite_posts: [{
      post_id: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
  followers: [{
      follower_id: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
  following: [{
      following_id: mongoose.Schema.Types.ObjectId,
      ref: 'users',
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