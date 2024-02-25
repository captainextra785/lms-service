const express = require('express')

const bookRouter = express.Router();
const bookNumberController = require('../controller/BookNumber');

const bookController = require('../controller/bookController');

bookRouter.post('/', bookController.createBook);
bookRouter.post('/add', bookController.addBooks);
bookRouter.get('/search', bookController.searchBook);
bookRouter.get('/generate', bookNumberController.generateBookNumber)
bookRouter.get('/:id', bookController.getBook);


module.exports = bookRouter;