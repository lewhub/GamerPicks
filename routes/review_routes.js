var
  express = require('express'),
  review_router = express.Router(),
  review_ctrl = require('../controllers/review_controller.js')

review_router.post('/', review_ctrl.create_review)
review_router.get('/', review_ctrl.all_reviews)
review_router.route('/:id')
  .get(review_ctrl.one_review)
  .patch(review_ctrl.edit_review)
  .delete(review_ctrl.delete_review)


module.exports = review_router
