var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var review_schema = Schema({
  reviewer: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  game_reviewed: {type: Schema.Types.ObjectId, ref: 'Game', required: true},
  review_content: {type: String, required: true},
  rating: {type: Number, required: true}
})

var Review = mongoose.model('Review', review_schema)

module.exports = Review
