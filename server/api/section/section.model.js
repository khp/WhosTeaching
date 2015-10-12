'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var SectionSchema = new Schema({
  year: { type: String, required: true},
  session: { type: String, required: true },
  term: { type: String, required: true }, 
  subjectCode: { type: String, required: true},
  courseNumber: { type: String, required: true},
  courseName: { type: String },
  sectionCode: { type: String, required: true},
  instructor: { type: Schema.Types.ObjectId },
  firstName: { type: String },
  lastName: { type: String },
  days: { type: String },
	startTime: { type: String },
	endTime: { type: String },
  building: { type: String },
  room: { type: String },
	_id: Schema.Types.ObjectId
});

SectionSchema.index({year: 1, session: 1, term: 1, subjectCode: 1, courseNumber: 1, sectionCode: 1},{unique: true});
module.exports = mongoose.model('Section', SectionSchema);