const express = require('express')
const { requireSignIn } = require('../controllers/userController');
const { createPostController, getAllPosts, getUserPosts, deletePosts, updatePosts } = require('../controllers/postController');

const postRouter = express.Router()

postRouter.post('/create-post', requireSignIn, createPostController)
postRouter.get('/get-all-post', getAllPosts)
postRouter.get('/get-user-post', requireSignIn, getUserPosts)
postRouter.delete('/delete-post/:id', requireSignIn, deletePosts)
postRouter.put('/update-post/:id', requireSignIn, updatePosts)


module.exports = postRouter;