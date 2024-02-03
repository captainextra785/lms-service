const express = require('express')
const publicationRouter = express.Router();

const publicationController = require('../controller/publicationController');

publicationRouter.post('/', publicationController.createPublication);
publicationRouter.get('/search', publicationController.searchPublication);
publicationRouter.get('/:id', publicationController.getPublication);

module.exports = publicationRouter;