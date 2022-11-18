const port = process.env.PORT || 4000,
      express = require('express'),
      app = express(),
      connectToDatabase = require('./db/db'),
      cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

connectToDatabase()

app.use('/user', require('./routes/userRoutes'))
app.use('/post', require('./routes/postRoutes'))

app.listen(port, () => {
  console.log(`Buddiez server listening at port: ${port}`)
})