var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var user_schema = Schema({
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
})

var User = mongoose.model('User', user_schema)

module.exports = User
