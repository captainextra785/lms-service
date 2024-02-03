const express = require('express')

const userRouter = express.Router();

const userContoller = require('../controller/userController');

userRouter.post('/', userContoller.createUser);
userRouter.get('/', userContoller.getUsers)
userRouter.get('/:id', userContoller.getUser)

module.exports = userRouter;