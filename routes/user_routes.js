var
  express = require('express'),
  user_router = express.Router(),
  user_ctrl = require('../controllers/user_controller.js')

user_router.route('/')
  .get(user_ctrl.all_users)
  .post(user_ctrl.create_user)
user_router.route('/:id')
  .get(user_ctrl.one_user)
  .patch(user_ctrl.edit_user)
  .delete(user_ctrl.delete_user)

module.exports = user_router
