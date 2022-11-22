const port = process.env.PORT || 4000,
      express = require('express'),
      app = express(),
      connectToDatabase = require('./db/db'),
      cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

connectToDatabase()

// AdminJS
const admjs = require('./adminjs/admin')
const { admin, router } = admjs

app.use(admin.options.rootPath, router);

// Routes
app.use('/user', require('./routes/userRoutes'))
app.use('/post', require('./routes/commentRoutes'))
app.use('/post', require('./routes/postRoutes'))

app.listen(port, () => {
  console.log(`Buddiez server listening at port: ${port}`)
})