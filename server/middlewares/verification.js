require('dotenv').config()
const jwt = require('jsonwebtoken'),
      User = require('../models/User')

let userVerification = async (req, res) => {
  let token = req.header('auth-token')

  if(!token) {
    return res.status(401).send({status: 'failure', message: `Authentication failed, token is required.`})
  }

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

module.exports = userVerification