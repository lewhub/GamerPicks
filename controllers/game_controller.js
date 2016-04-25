var Game = require('../models/game.js')

module.exports = {
  all_games: function(req, res){
    Game.find({})
    .populate({path: 'category', select: 'name -_id'})
    .populate({path: 'reviews', select: 'review_content rating reviewer -_id', populate: {
      path: 'reviewer', select: 'username -_id'
    }})
    .exec(function(err, games){
      if (err) throw err
      res.json({success: true, games: games})
    })
  },
  one_game: function(req, res){
    Game.findById(req.params.id)
    .populate('category')
    .exec(function(err, game){
      if (err) throw err
      res.json({success: true, game: game})
    })
  },
  create_game: function(req, res){
    var new_game = new Game(req.body)
    new_game.save(function(err, saved_game){
      if (err) throw err
      res.json({success: true, message: 'new game created', game: saved_game})
    })
  },
  delete_game: function(req, res){
    Game.findOneAndRemove({_id: req.params.id}, function(err, deleted_game){
      if (err) throw err
      res.json({success: true, message: 'game successfully deleted', deleted_game: deleted_game})
    })
  },
  edit_game_info: function(req, res){
    Game.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, updated_game){
      if (err) throw err
      res.json({success: true, message: 'game information updated', game: updated_game})
    })
  }
}
