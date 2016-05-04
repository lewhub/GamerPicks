var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Category = require('./category.js')

var game_schema = Schema({
  name: {type: String, required: true},
  photo: String,
  gameplay_video: String,
  game_summary: {type: String, required: true},
  average_user_rating: Number,
  api_id: Number,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true}
})

game_schema.post('save', function(game){
  // console.log(game.category, 'in game.js')
  Category.findById(game.category).exec(function(err, category){
    if (err) throw err
    // saving the new game into the category's games array
    if (category.games.indexOf(game._id) === -1){
      category.games.push(game)
      category.save()
    }
  })
})

// when updating a game
game_schema.pre('findOneAndUpdate', function(next){
  var self = this
  var gameId = Object(self._conditions._id)
  var newCategoryID = self._update.category
  // finding the game before it is saved
  self.findOne({}, function(err, previous_game){
    if (err) throw err
    // setting the game's current category id before it is updated to a new category id to a variable
    var previousGameCategoryID = previous_game.category.toString()
    // if the request.body has a category key/value pair and that category key/value pair isn't equal to the current state of the game's category then run if statement
    if (newCategoryID && newCategoryID !== previousGameCategoryID){
      // finds the current category and deletes the game from it
      Category.findOne({_id: previousGameCategoryID}, function(err, category){
        if (err) throw err
        var i = category.games.indexOf(Object(self._conditions._id))
        // console.log(category, '<< category')
        // console.log(category.games.indexOf(Object(self._conditions._id)), '<<< index of game')
        category.games.splice(i, 1)
        category.save()
      })
      // finds the new category and adds the game to categorie's game array
      Category.findOne({_id: newCategoryID}, function(err, category){
        if (err) throw err
        // console.log(category, "<< new category before push")
        category.games.push(gameId)
        category.save()
          // console.log(category, "<< new category after push")
      })
    }
    // save and finish update route
    next()
  })
})


game_schema.pre('findOneAndRemove', function(next){
  // when you remove a game
  // console.log(this)
  var self = this
  self.findOne({}, function(err, game){
    if (err) throw err
    var gameCategoryID = game.category.toString()
    Category.findOne({_id: gameCategoryID}, function(err, category){
      if (err) throw err
      var i = category.games.indexOf(Object(game._id))
      category.games.splice(i, 1)
      category.save()
    })
    next()
  })

})

var Game = mongoose.model('Game', game_schema)

module.exports = Game
