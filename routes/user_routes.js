var
  express = require('express'),
  user_router = express.Router(),
  user_ctrl = require('../controllers/user_controller.js')

user_router.post('/login', user_ctrl.login)
user_router.route('/')
  .get(user_ctrl.all_users)
  .post(user_ctrl.create_user)
//lisa eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfX3YiOjAsInVzZXJuYW1lIjoibGlzYSIsImVtYWlsIjoibEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCRwVFVhWjhGTnBMcXFwUDVLNGV6YVZ1bXdqYUR4ZmRZdll4R1RndkxscmZMb1V3V2hLenNBSyIsIl9pZCI6IjU3MWZkMDdhNDFjYzg2ZTQwNGU0YzZlZCIsInJldmlld3MiOltdLCJpYXQiOjE0NjE3MDI3NzksImV4cCI6MTQ2MTcwODc3OX0.sB3hsVucJ5B6DhMAIDnt4ihUoe7IgY7yQDOMgyR9ges
//mike eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NzFmY2RiMWQ5YWRmYjk2MDQ5MjU3OTgiLCJ1c2VybmFtZSI6Im1pa2UiLCJlbWFpbCI6Im1AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkQld2bWpzdEhQVkdjTlZKVS40RTBNdVZVRGttUlowakFUSTh4eWtyd3Zqb0tXYUpETzJ4M0MiLCJfX3YiOjAsInJldmlld3MiOltdLCJpYXQiOjE0NjE3MDIzNTIsImV4cCI6MTQ2MTcwODM1Mn0.8E6hMOdxIvLYwqY752W9cQxnZgc76di-MMbhSty0ngg
user_router.use(user_ctrl.verify_access_level)
user_router.route('/:id')
  .get(user_ctrl.one_user)
  .patch(user_ctrl.edit_user)
  .delete(user_ctrl.delete_user)

module.exports = user_router
