const jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs'),
      User = require('../models/User'),
      validator = require('validator')

class UserController {
  async login (req, res) {
    const { email_or_username, password } = req.body
    let userProfile = {}

    try {
      // Checking if it's email or username
      if(validator.isEmail(email_or_username)) {
        userProfile = await User.findOne({ email: email_or_username})
      } else {
        userProfile = await User.findOne({ username: email_or_username })
      }

      // Checking if user exists
      if(!userProfile) {
        return res.status(422).send({status: 'failure', message: `No valid data provided`})
      }
    
      // Checking password
      const isPasswordValid = await bcrypt.compare(password, userProfile.password)
      if(!isPasswordValid) {
        return res.status(422).send({status: 'failure', message: `No valid data provided`})
      }

      // Creating token
      const payload = {
        userId: userProfile._id,
      }
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY)

      res.status(200).send({
        status: 'success', 
        message: `Login successfully`,
        token: jwtToken
      })

    } catch (error) {
      res.status(409).send({status: 'failure', message: `Login has failed`})
    }
  }
  
  async signUp (req, res) {
    const { name, username, email, password, 
      birthday, gender, species } = req.body
    
    try {

      // back-end data validation
      if(validator.isEmpty(username) || validator.isEmpty(password) || validator.isEmpty(gender) || validator.isEmpty(species)){
        return res.status(422).send({status: 'failure', message: `Required items must be provided.`})
      }
      
      if(!validator.isEmail(email)) {
        return res.status(422).send({status: 'failure', message: `E-mail must be a valid e-mail.`})
      }

      // checking email
      const emailExists = await User.findOne({ email })
      if(emailExists) {
        return res.status(409).send({status: 'failure', message: `E-mail already exists.`})
      }

      // checking username
      const usernameExists = await User.findOne({ username })
      if(usernameExists) {
        return res.status(409).send({status: 'failure', message: `Username already exists`})
      }

      // encrypting password
      const salt = await bcrypt.genSalt(10)
      const encryptedPassword = await bcrypt.hash(password, salt)

      // create new account
      await User.create({
        name: name,
        username: username,
        email: email,
        password: encryptedPassword,
        birthday: birthday,
        gender: gender,
        species: species
      })

      res.status(200).send({status: 'success', message: `Account created successfully`})

    } catch (error) {
      res.status(409).send({status: 'failure', message: `Cannot create account`})
    }
  }

  async deleteAccount(req, res) {
    const { token, password } = req.body,
          decodedToken = jwt.decode(token)

    try {
      // Finding user profile
      let userProfile = await User.findOne({ _id: decodedToken.userId})

      // Checking password
      const isPasswordValid = await bcrypt.compare(password, userProfile.password)
      if(!isPasswordValid) {
        return res.status(422).send({status: 'failure', message: `No valid data provided`})
      }
    
      await User.deleteOne({ _id: decodedToken.userId })

      res.status(200).send({status: 'success', message: `Account deleted successfully`})

    } catch (error) {
      res.status(409).send({status: 'failure', message: `Cannot delete account`})
    }

    res.send('hihi')
  }
}

module.exports = new UserController()