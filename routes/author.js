const express = require('express')
const authorRoute = express.Router();

const authorController = require('../controller/authorController');

authorRoute.post('/', authorController.createAuthor);
authorRoute.get('/search', authorController.searchAuthor);
authorRoute.get('/:id', authorController.getAuthor);

module.exports = authorRoute;