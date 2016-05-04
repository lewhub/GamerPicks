var Category = require('../models/category.js')

module.exports = {
  all_categories: function(req, res){
    Category.find({})
    .populate({path: 'games', select: 'name game_summary'})
    .exec(function(err, categories){
      if (err) throw err
      res.json({success: true, categories: categories})
    })
  },
  one_category: function(req, res){
    Category.findById(req.params.id).populate('games').exec(function(err, category){
      if (err) throw err
      res.json({success: true, category: category})
    })
  },
  create_category: function(req, res){
    var new_category = new Category(req.body)
    new_category.save(function(err, saved_category){
      if (err) throw err
      res.json({success: true, message: 'new category saved', category: saved_category})
    })
  },
  delete_category: function(req, res){
    Category.findById(req.params.id, function(err, category){
      if (err) throw err
      Category.remove({_id: category._id}, function(err){
        if (err) throw err
        res.json({success: true, message: 'category successfully deleted'})
      })
    })
  },
  edit_category_info: function(req, res){
    Category.findById(req.params.id).exec(function(err, category){
      if (err) throw err
      category.name = req.body.name
      category.category_photo = req.body.category_photo
      category.save(function(err, updated_category){
        console.log(updated_category)
        if (err) throw err
        res.json({success: true, message: 'category updated', category: updated_category})
      })
    })
  },
  create_21: function(req, res){
    var categories = [
      {name: "Adventure"},
      {name: "Arcade"},
      {name: "Fighting"},
      {name: "Indie"},
      {name: "Music"},
      {name: "Pinball"},
      {name: "Platform"},
      {name: "Point-and-click"},
      {name: "Racing"},
      {name: "Real Time Strategy (RTS)"},
      {name: "Role-playing (RPG)"},
      {name: "Shooter"},
      {name: "Simulator"},
      {name: "Sport"},
      {name: "Strategy"},
      {name: "Tactical"},
      {name: "Turn-based strategy (TBS)"},
      {name: "Hack and slash/Beat 'em up"},
      {name: "Other"},
      {name: "Quiz/Trivia"},
      {name: "Puzzle"}
    ]
    Category.create(categories, function(err, data){
      if (err) throw err
      res.json({message: '21 categories created', categories: data})
    })
  },
  delete_all: function(req, res){
    Category.remove({}, function(err){
      res.json({message: 'all categories removed'})
    })
  }
}
