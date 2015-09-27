'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var SubjectSchema = new Schema({
  subjectCode: { type: String, required: true, index: { unique: true } },
  subjectTitle: { type: String, required: true },
  facultySchool: String,
  courses: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Subject', SubjectSchema);
