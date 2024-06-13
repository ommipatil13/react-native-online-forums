const express = require('express')

const { userRegister, userLogin, userUpdate, requireSignIn } = require('../controllers/userController')


const userRouter = express.Router()

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.put('/update-user', requireSignIn, userUpdate)

module.exports = userRouter;