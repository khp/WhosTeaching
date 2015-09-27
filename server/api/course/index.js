'use strict';

var express = require('express');
var controller = require('./course.controller');

var router = express.Router();


router.get('/search', controller.search);
router.get('/search/:course', controller.search);


module.exports = router;
