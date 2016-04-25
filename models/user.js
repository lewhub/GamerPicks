var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Review = require('./review.js')

var user_schema = Schema({
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
})

user_schema.pre('findOneAndRemove', function(next){
  var self = this
  self.findOne({}, function(err, user){
    if (err) throw err
    user.reviews.forEach(function(review){
      Review.findOneAndRemove({_id: review._id}, function(err){ if (err) throw err })
    })
    next()
  })
})

var User = mongoose.model('User', user_schema)

module.exports = User
