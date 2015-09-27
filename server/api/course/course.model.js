'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var CourseSchema = new Schema({
  year: { type: String, required: true},
  session: { type: String, required: true },
  subjectCode: { type: String, required: true},
  courseNumber: { type: String, required: true},
  courseName: { type: String, required: true },
  sections: [Schema.Types.ObjectId],
  _id: Schema.Types.ObjectId
});

CourseSchema.index({year: 1, session: 1, subjectCode: 1, courseNumber: 1},{unique: true});
module.exports = mongoose.model('Course', CourseSchema);
