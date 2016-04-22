var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var game_schema = Schema({
  name: {type: String, required: true},
  photo: String,
  gameplay_video: String,
  game_summary: {type: String, required: true},
  average_user_rating: Number,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true}
})


game_schema.post('save', function(game){
  console.log(game.name, 'in game.js')
})


var Game = mongoose.model('Game', game_schema)

module.exports = Game
