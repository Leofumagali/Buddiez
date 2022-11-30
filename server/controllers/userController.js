const jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs'),
      User = require('../models/User'),
      validator = require('validator'),
      userVerification = require('../middlewares/verification')

class UserController {

  async verifyUser(req, res) {
    let userProfile = await userVerification(req, res)

    if(!userProfile) {
      return res.send({status: 'failure', message: `Authentication failed`})
    }

    res.status(200).send({status: 'success', message:`Authentication succeeded`, user: userProfile})
  }

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

      let userProfile = await User.findOne({ username })

      const payload = {
        userId: userProfile._id,
      }
      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY)

      res.status(200).send({status: 'success', message: `Account created successfully`, token: jwtToken})

    } catch (error) {
      res.status(409).send({status: 'failure', message: `Cannot create account`})
    }
  }

  async changePassword(req, res) {
    const { oldPassword, newPassword } = req.body
    let userProfile = await userVerification(req, res)

    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed`})
    }

    try {
      // Checking oldPassword
      const isPasswordValid = await bcrypt.compare(oldPassword, userProfile.password)
        if(!isPasswordValid) {
          return res.status(422).send({status: 'failure', message: `No valid data provided`})
        }
      
      // Encrypting new password
      const salt = await bcrypt.genSalt(10)
      const newEncryptedPassword = await bcrypt.hash(newPassword, salt)

      // Changing password
      await User.updateOne({password: newEncryptedPassword})

      res.status(200).send({status: 'success', message: `Password changed successfully`})

    } catch (error) {
      res.status(409).send({status: 'failure', message: `Cannot change password`})
    }
  }

  async editProfile(req, res) {
    const { name, username, description, profile_pic } = req.body
    const userProfile = await userVerification(req, res)

    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed`})
    }

    const usernameExists = await User.findOne({ username })
    if(usernameExists) {
      return res.status(409).send({status: 'failure', message: `Username already exists`})
    }

    try {
      const modifierPayload = {
        name: name,
        username: username,
        description: description,
        profile_pic: profile_pic
      } 

      for(var key in modifierPayload) {
        if(modifierPayload[key] === undefined || modifierPayload[key] === null || modifierPayload[key].length === 0) {
          delete modifierPayload[key]
        }
      }

      await User.findOneAndUpdate({ username: userProfile.username }, modifierPayload)

      res.status(200).send({status: 'success', message: `Profile updated.`})
    } catch (error) {
      res.status(409).send({status: 'failure', message: `Cannot edit profile`})
    }
  }

  async deleteAccount(req, res) {
    const { password } = req.body
    let userProfile = await userVerification(req)

    if(!userProfile) {
      return res.status(401).send({status: 'failure', message: `Authentication failed`})
    }

    try {
      // Checking password 
      const isPasswordValid = await bcrypt.compare(password, userProfile.password)
      if(!isPasswordValid) {
        return res.status(422).send({status: 'failure', message: `No valid data provided`})
      }
      // Deleting account
      await User.deleteOne({ _id: userProfile._id })

      res.status(200).send({status: 'success', message: `Account deleted successfully`})

    } catch (error) {
      res.status(409).send({status: 'failure', message: `Cannot delete account`})
    }
  }
}

module.exports = new UserController()