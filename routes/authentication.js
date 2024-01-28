const express = require('express')
const authRoute = express.Router();

const { Login } = require('../controller/auth');

authRoute.post('/login', Login);

module.exports = authRoute;