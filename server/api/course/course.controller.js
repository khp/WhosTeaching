'use strict';

var _ = require('lodash');
var Course = require('./course.model');
var Subject = require('../subject/subject.model');

exports.search = function(req, res) {
  var search = req.query.course;

  function concatSubjectAndCode(course) {
    return course['subjectCode'] + ' ' + course['courseNumber'];
  };
  var words = search.match(/[a-zA-Z]+|[0-9]+/g);
  if(words.length == 1) {
	  	Course.find({'$or': 	
	  						       [
				                  {subjectCode: {$regex : ".*" + search + ".*", $options : "-i"}},
				                  {courseNumber: {$regex : ".*" + search + ".*", $options : "-i"}}
			                 ]})
	  		.sort({ courseNumber: 1 })
	  		.exec(
	  			function(err, courses) {
				    if(err) {
				      return handleError(res, err);
				    }
				    var returnArray = _.map(courses, concatSubjectAndCode);
				    return res.status(200).json(returnArray);
	  			});
	} else {
		Course.find({'$and': 	
							[
				                {subjectCode: {$regex : ".*" + words[0] + ".*", $options : "-i"}},
				                {courseNumber: {$regex : ".*" + words[1] + ".*", $options : "-i"}}
			                ]})
	  		.sort({ courseNumber: 1 })
	  		.exec(
	  			function(err, courses) {
				    if(err) {
				      return handleError(res, err);
				    }
				    var returnArray = _.map(courses, concatSubjectAndCode);
				    return res.status(200).json(returnArray);
	  			});
	}
};