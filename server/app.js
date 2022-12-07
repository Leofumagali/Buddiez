const port = process.env.PORT || 4000,
      express = require('express'),
      app = express(),
      connectToDatabase = require('./db/db'),
      cors = require('cors'),
      path = require('path')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

connectToDatabase()

// Routes
app.use('/user', require('./routes/userRoutes'))
app.use('/user', require('./routes/profilesRoutes'))
app.use('/post', require('./routes/commentRoutes'))
app.use('/post', require('./routes/postRoutes'))

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});


app.listen(port, () => {
  console.log(`Buddiez server listening at port: ${port}`)
})