'use strict';

var _ = require('lodash');
var Section = require('./section.model');

// Get list of sections
exports.index = function(req, res) {
  Section.find(function (err, sections) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(sections);
  });
};

// Get a single section
exports.show = function(req, res) {
  Section.findById(req.params.id, function (err, section) {
    if(err) { return handleError(res, err); }
    if(!section) { return res.status(404).send('Not Found'); }
    return res.json(section);
  });
};

// Creates a new section in the DB.
exports.create = function(req, res) {
  Section.create(req.body, function(err, section) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(section);
  });
};

// Updates an existing section in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Section.findById(req.params.id, function (err, section) {
    if (err) { return handleError(res, err); }
    if(!section) { return res.status(404).send('Not Found'); }
    var updated = _.merge(section, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(section);
    });
  });
};

// Deletes a section from the DB.
exports.destroy = function(req, res) {
  Section.findById(req.params.id, function (err, section) {
    if(err) { return handleError(res, err); }
    if(!section) { return res.status(404).send('Not Found'); }
    section.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.search = function(req, res) {
  var search = req.query.course;

  function concatSubjectAndCode(course) {
    return course['subjectCode'] + ' ' + course['courseNumber'];
  };
  var searchTerms = search.split(" ");
    Section.find( {
                    subjectCode: searchTerms[0],
                    courseNumber: searchTerms[1]
                  })
      .sort({ sectionCode: 1 })
      .exec(
        function(err, sections) {
          if(err) {
            return handleError(res, err);
          }
          var returnArray = sections;
          return res.status(200).json(returnArray);
        });
  
};