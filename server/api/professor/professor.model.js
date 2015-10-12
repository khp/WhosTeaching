'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfessorSchema = new Schema({
  firstName: { type: String, index: true },
  lastName: { type: String, index: true },
  ratingClass: String,
  rateMyProfId: { type: String, index: { unique: true} },
  overallRating: { type: Number, index: true },
  department: String
});

module.exports = mongoose.model('Professor', ProfessorSchema);