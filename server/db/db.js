require('dotenv').config()
const mongoose = require('mongoose'),
      MONGO_URI = process.env.MONGO_URI

mongoose.set('debug', true)

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log(`Connected to the database`)
  } catch (error) {
    console.log(
      `Wouldn't able to connect to the database: ${error}`
    )
  }
}

module.exports = connectToDatabase