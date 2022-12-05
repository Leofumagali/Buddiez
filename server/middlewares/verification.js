require('dotenv').config()
const jwt = require('jsonwebtoken'),
      User = require('../models/User')

let userVerification = async (req, res) => {
  let token = req.header('auth-token')
  
  if(!token) {
    return false
  } else {
      try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        let userProfile = await User.findOne({ _id: verifiedToken.userId})

        if(!userProfile) {
          return false
        } else {
          return userProfile
        }

      } catch (error) {
        return false
      }
  }
}

module.exports = userVerification