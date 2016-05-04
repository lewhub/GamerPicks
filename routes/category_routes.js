var
  express = require('express'),
  category_router = express.Router(),
  category_ctrl = require('../controllers/category_controller.js')

category_router.get('/make21', category_ctrl.create_21)
category_router.get('/deleteAll', category_ctrl.delete_all)
category_router.route('/')
  .get(category_ctrl.all_categories)
  .post(category_ctrl.create_category)
category_router.route('/:id')
  .get(category_ctrl.one_category)
  .patch(category_ctrl.edit_category_info)
  .delete(category_ctrl.delete_category)

module.exports = category_router
