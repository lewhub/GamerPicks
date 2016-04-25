var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Game = require('./game.js'),
  User = require('./user.js')

var review_schema = Schema({
  reviewer: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  game_reviewed: {type: Schema.Types.ObjectId, ref: 'Game', required: true},
  review_content: {type: String, required: true},
  rating: {type: Number, required: true}
})

review_schema.post('save', function(review){
  Game.findOne({_id: review.game_reviewed}, function(err, game){
    if (err) throw err
    game.reviews.push(review)
    game.save()
  })
  User.findOne({_id: review.reviewer}, function(err, user){
    if (err) throw err
    user.reviews.push(review)
    user.save()
  })
})

// deleting the review from the reviewer's reviews and the games review
// also called when you delete a user
review_schema.pre('findOneAndRemove', function(next){
  var self = this
  self.findOne({}, function(err, review){
    if (err) throw err
    console.log(review, '<< this is the review that will be deleted')
    User.findOne({_id: review.reviewer}, function(err, user){
      if (err) throw err
      var i = user.reviews.indexOf(Object(review._id))
      user.reviews.splice(i, 1)
      user.save()
    })
    Game.findOne({_id: review.game_reviewed}, function(err, game){
      if (err) throw err
      var i = game.reviews.indexOf(Object(review._id))
      game.reviews.splice(i, 1)
      game.save()
    })
    next()
  })
})

var Review = mongoose.model('Review', review_schema)

module.exports = Review
