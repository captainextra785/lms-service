const { Router } = require('express');

const rootRouter = Router();
const protectedRouter = Router();
const unprotectedRouter = Router();

// import middleware
const { verifyUser } = require('../middleware/auth')

// Router import
const userRouter = require('./user');
const authRouter = require('./authentication');
const authorRoute = require('./author');
const publicationRouter = require('./publication');
const bookRouter = require('./book');

// router integration protected
protectedRouter.use('/user', userRouter);
protectedRouter.use('/author', authorRoute);
protectedRouter.use('/publication', publicationRouter);
protectedRouter.use('/book', bookRouter);

// router integraton unprotected.
unprotectedRouter.use('/auth', authRouter);

// Combine routes
rootRouter.use('/', unprotectedRouter);
rootRouter.use('/', verifyUser, protectedRouter);

module.exports = rootRouter;