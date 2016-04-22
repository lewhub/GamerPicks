var Game = require('../models/game.js')

module.exports = {
  all_games: function(req, res){
    Game.find({}).populate('category').exec(function(err, games){
      if (err) throw err
      res.json({success: true, games: games})
    })
  },
  one_game: function(req, res){
    Game.findById(req.params.id).populate('category').exec(function(err, game){
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
    Game.findById(req.params.id, function(err, game){
      if (err) throw err
      Game.remove({_id: game._id}, function(err){
        if (err) throw err
        res.json({success: true, message: 'game successfully deleted'})
      })
    })
  },
  edit_game_info: function(req, res){
    Game.findById(req.params.id).exec(function(err, game){
      if (err) throw err
      game.name = req.body.name
      game.photo = req.body.photo
      game.gameplay_video = req.body.gameplay_video
      game.game_summary = req.body.game_summary
      game.average_user_rating = req.body.average_user_rating
      game.reviews = req.body.reviews
      game.category = req.body.category
      game.save(function(err, updated_game){
        if (err) throw err
        res.json({success: true, message: 'game information updated', game: updated_game})
      })
    })
  }
}
