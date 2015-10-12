'use strict';

var express = require('express');
var controller = require('./course.controller');

var router = express.Router();


router.get('/searchAutoComplete', controller.searchAutoComplete);
router.get('/searchAutoComplete/:course', controller.searchAutoComplete);


module.exports = router;
