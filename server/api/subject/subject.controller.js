'use strict';

var _ = require('lodash');
var Subject = require('./subject.model');
var indexCourses = require('./indexcourses');

// Clear and regenerate subjects

exports.getSubjects = function(req, res) {
  //Subject.find(function (err, subjects) {
  //  if(err) { return handleError(res, err); }
  //  return res.status(200).json(subjects);
  //});
  indexCourses.getSubjects();
  return res.status(202).send();
};

exports.getCourses = function(req, res) {
  indexCourses.getCoursesForSubject('CPSC');
  return res.status(202).send();
};

exports.updateCourses = function(req, res) {
  indexCourses.updateAllSubjectsWithCourses();
  return res.status(202).send();
}

exports.updateSections = function(req, res) {
  indexCourses.updateAllCoursesWithSections();
  return res.status(202).send();
}

exports.updateSectionsWithProfs = function(req, res) {
  indexCourses.updateAllSectionsWithProfs();
  return res.status(202).send();
}
exports.getProfsForSections = function(req, res) {
  indexCourses.getProfsForSections();
  return res.status(202).send();
}
exports.search = function(req, res) {
  var search = req.query.subject;
  console.log(search);

  function concatSubjectAndCode(subject) {
    return subject['subjectTitle'] + ' (' + subject['subjectCode'] + ')';
  }

  Subject.find({'$or': [
                {subjectTitle: {$regex : ".*" + search + ".*", $options : "-i"}},
                {subjectCode: {$regex : ".*" + search + ".*", $options : "-i"}}]}, 
                function(err, subjects) {
    if(err) {
      return handleError(res, err);
    }
    var returnArray = _.map(subjects, concatSubjectAndCode);
    console.log(subjects);
    return res.status(200).json(returnArray);
  });
}

// Get list of subjects
exports.index = function(req, res) {
  Subject.find(function (err, subjects) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(subjects);
  });
};

// Get a single subject
exports.show = function(req, res) {
  Subject.findById(req.params.id, function (err, subject) {
    if(err) { return handleError(res, err); }
    if(!subject) { return res.status(404).send('Not Found'); }
    return res.json(subject);
  });
};

// Creates a new subject in the DB.
exports.create = function(req, res) {
  Subject.create(req.body, function(err, subject) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(subject);
  });
};

// Updates an existing subject in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Subject.findById(req.params.id, function (err, subject) {
    if (err) { return handleError(res, err); }
    if(!subject) { return res.status(404).send('Not Found'); }
    var updated = _.merge(subject, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(subject);
    });
  });
};

// Deletes a subject from the DB.
exports.destroy = function(req, res) {
  Subject.findById(req.params.id, function (err, subject) {
    if(err) { return handleError(res, err); }
    if(!subject) { return res.status(404).send('Not Found'); }
    subject.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
