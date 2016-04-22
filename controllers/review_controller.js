var Review = require('../models/review.js')

module.exports = {
  all_reviews: function(req, res){
    Review.find({}).populate('reviewer game_reviewed').exec(function(err, reviews){
      if (err) throw err
      res.json({success: true, reviews: reviews})
    })
  },
  one_review: function(req, res){
    Review.findById(req.params.id).populate('reviewer game_reviewed').exec(function(err, review){
      if (err) throw err
      res.json({success: true, review: review})
    })
  },
  create_review: function(req, res){
    var new_review = new Review(req.body)
    new_review.save(function(err, review){
      if (err) throw err
      res.json({success: true, message: 'review created', review: review})
    })
  },
  delete_review: function(req, res){
    Review.findById(req.params.id, function(err, review){
      if (err) throw err
      Review.remove({_id: review._id}, function(err){
        if (err) throw err
        res.json({success: true, message: 'review deleted'})
      })
    })
  },
  edit_review: function(req, res){
    Review.findById(req.params.id).exec(function(err, review){
      if (err) throw err
      review.review_content = req.body.review_content
      review.rating = req.body.rating
      review.save(function(err, updated_review){
        if (err) throw err
        res.json({success: true, message: 'review updated', review: updated_review})
      })
    })
  }
}
