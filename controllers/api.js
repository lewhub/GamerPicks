var db = require('igdb-api-node')

module.exports = {
  all_games: function(req, res){
    // t_cover_big_2x - game photo
    // console.log(req.params)
    db.games.index({limit: req.params.limit, offset: req.params.offset}, function(data){
      res.json(data)
    })
  },
  one_game: function(req, res){
    db.games.get(req.params.id, function(data){
      res.json(data)
    })
  },
  search_for_game: function(req, res){
    db.games.search({q: req.params.q, limit: req.params.limit}, function(data){
      res.json(data)
    })
  }
}

// gamedb.games.index({limit: 1500, offset: 6000}, function(data){
//   // console.log(data)
// })
// gamedb.games.get(2030, function(data){
//   console.log(100, data)
// })
// gamedb.games.search({q: 'fighter', limit: 2}, function(data){
//   console.log(480, data)
// })
