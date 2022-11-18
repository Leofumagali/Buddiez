const jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs'),
      User = require('../models/User')

class UserController {

//   async login (req, res) {
//     try {
//       const { email_or_username, password } = req.body
//     } catch (error) {

//     }
//   }
  
  async signUp (req, res) {
    try {
      const { name, username, email, password, 
        birthday, gender, species } = req.body


    } catch (error) {
      res.status(409).send({status: fail})
    }
  }

}

module.exports = new UserController()