var
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  body_parser = require('body-parser'),
  path = require('path'),
  morgan = require('morgan'),
  user_routes = require('./routes/user_routes.js'),
  review_routes = require('./routes/review_routes.js'),
  game_routes = require('./routes/game_routes.js'),
  category_routes = require('./routes/category_routes.js'),
  dotenv = require('dotenv').load({silent: true}),
  cors = require('cors'),
  https = require('https'),
  game_api_routes = require('./routes/api_routes.js')

// console.log(9000, process.env)
var LOCAL_URL = 'mongodb://localhost/gamerpicks'

mongoose.connect(process.env.DB_URL, function(err){
  if (err) throw err
  console.log('connected to mongodb')

})

app.use(body_parser.urlencoded({extended: false}))
app.use(body_parser.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.use('/api/users', user_routes)
app.use('/api/reviews', review_routes)
app.use('/api/games', game_routes)
app.use('/api/categories', category_routes)
app.use('/api/games/api', game_api_routes)

app.listen(process.env.PORT, function(err){
  if (err) throw err
  console.log('listening on port')
})
