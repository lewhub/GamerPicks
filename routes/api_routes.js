var
  express = require('express'),
  db_router = express.Router(),
  db_ctrl = require('../controllers/api.js')

db_router.get('/list/:limit/:offset', db_ctrl.all_games)
db_router.get('/:id', db_ctrl.one_game)
db_router.get('/search/:q/:limit', db_ctrl.search_for_game)

module.exports = db_router
