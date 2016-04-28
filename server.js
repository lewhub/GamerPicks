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
  https = require('https')

  var options = {
  host: "www.igdb.com",
  path: "/api/v1/games",
  headers: { "Accept": "application/json", "Authorization" : 'Token token="G5HDgxEsCEb0QRrZEIUtt3zgdcqbm-Ib3gqRa0MdO1s"' }
  }

  var callback = function(response){
  var dataResults = ''

  response.on('data', function(data){
    dataResults += data
    // dataResults += data
  })
  response.on('end', function(){
    console.log(dataResults.split(',{"id":')[3])
    // console.log(dataResults.split('}'))
  })
  }
// console.log(9000, process.env)
var LOCAL_URL = 'mongodb://localhost/gamerpicks'

mongoose.connect(process.env.DB_URL, function(err){
  if (err) throw err
  console.log('connected to mongodb')
  https.request(options, callback).end()

})

app.use(body_parser.urlencoded({extended: false}))
app.use(body_parser.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     if (req.method === 'Options') {
//       res.send(200);
//     } else {
//       return next();
//     }
//   })

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.use('/api/users', user_routes)
app.use('/api/reviews', review_routes)
app.use('/api/games', game_routes)
app.use('/api/categories', category_routes)

app.listen(process.env.PORT, function(err){
  if (err) throw err
  console.log('listening on port 3000')
})
