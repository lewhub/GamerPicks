var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var catagory_schema = Schema({
  games: [{type: Schema.Types.ObjectId, ref: 'Game'}],
  category_photo: String,
  name: {type: String, required: true}
})

var Category = mongoose.model('Category', catagory_schema)

module.exports = Category
