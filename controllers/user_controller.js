var
  User = require('../models/user.js'),
  jwt = require('jsonwebtoken')

module.exports = {
  all_users: function(req, res){
    User.find({})
    .populate({path: 'reviews', select: 'game_reviewed review_content rating -_id', populate: {
      path: 'game_reviewed',
      select: 'name -_id'
    }})
    .exec(function(err, users){
      if (err) throw err
      res.json({success: true, users: users})
    })
  },
  one_user: function(req, res){
    User.findById(req.params.id).exec(function(err, user){
      if (err) throw err
      res.json({sucess: true, user: user})
    })
  },
  create_user: function(req, res){
    var new_user = new User(req.body)
    new_user.password = new_user.generateHash(req.body.password)
    new_user.save(function(err, user){
      if (err) throw err
      var token = jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: 6000 })
      res.json({ success: true, message: 'user created with token', user: user, token: token })
    })
  },
  login: function(req, res){
    console.log(1, req.body)
    User.findOne({ email: req.body.email }).exec(function(err, user){
      if (err) throw err
      if (!user) return res.json({ success: false, messgae: 'No user found with that email.'})
      if (user && !user.validatePassword) return res.json({ success: false, message: 'user found with that email but incorrect password provided.'})
      var token = jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: 6000 })
      res.json({ success: true, message: 'user found and the correct password was provided. Token granted.', token: token, user: user })
    })
  },
  verify_access_level: function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token){
      jwt.verify(token, process.env.SECRET, function(err, decoded){
        if (err) return res.json({ success: false, message: 'token is not valid'})
        req.decoded = decoded
        next()
      })
    } else {
      return res.status(403).json({ success: false, message: "no token was provided" })
    }
  },
  edit_user: function(req, res){
    User.findById(req.params.id).exec(function(err, user){
      if (err) throw err
      user.username = req.body.username
      user.save(function(err, updated_user){
        if (err) throw err
        res.json({success: true, message: 'user saved', user: updated_user})
      })
    })
  },
  delete_user: function(req, res){
    User.findOneAndRemove({_id: req.params.id}, function(err){
      if (err) throw err
      res.json({message: 'user deleted'})
    })
  }
}
