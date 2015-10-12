'use strict';

var _ = require('lodash');
var Professor = require('./professor.model');
var indexProfessor = require('./indexProfessor.js');

exports.getAllProfessors = function (req, res) {
  indexProfessor.getAllUBCProfessors();
}

// Get list of professors
exports.index = function(req, res) {
  Professor.find(function (err, professors) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(professors);
  });
};

// Get a single professor
exports.show = function(req, res) {
  Professor.findById(req.params.id, function (err, professor) {
    if(err) { return handleError(res, err); }
    if(!professor) { return res.status(404).send('Not Found'); }
    return res.json(professor);
  });
};

// Creates a new professor in the DB.
exports.create = function(req, res) {
  Professor.create(req.body, function(err, professor) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(professor);
  });
};

// Updates an existing professor in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Professor.findById(req.params.id, function (err, professor) {
    if (err) { return handleError(res, err); }
    if(!professor) { return res.status(404).send('Not Found'); }
    var updated = _.merge(professor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(professor);
    });
  });
};

// Deletes a professor from the DB.
exports.destroy = function(req, res) {
  Professor.findById(req.params.id, function (err, professor) {
    if(err) { return handleError(res, err); }
    if(!professor) { return res.status(404).send('Not Found'); }
    professor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}