const express = require('express')

const userRouter = express.Router();

const userContoller = require('../controller/userController');

userRouter.post('/user', userContoller.createUser);
userRouter.get('/user', userContoller.getUsers)
userRouter.get('/user/:id', userContoller.getUser)

module.exports = userRouter;