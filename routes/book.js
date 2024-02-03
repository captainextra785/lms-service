const express = require('express')

const bookRouter = express.Router();

const bookController = require('../controller/bookController');

bookRouter.post('/', bookController.createBook);
bookRouter.get('/:id', bookController.getBook);


module.exports = bookRouter;