var
  express = require('express'),
  game_router = express.Router(),
  game_ctrl = require('../controllers/game_controller.js')

game_router.route('/')
  .get(game_ctrl.all_games)
  .post(game_ctrl.create_game)
game_router.route('/:id')
  .get(game_ctrl.one_game)
  .patch(game_ctrl.edit_game_info)
  .delete(game_ctrl.delete_game)

module.exports = game_router
