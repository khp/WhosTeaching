/**
 * Created by khp on 29/08/15.
 */

/**
 * Created by khp on 27/08/15.
 */

'use strict';


var request = require('request'),
  cheerio = require('cheerio'),
  urlSubjects = 'https://courses.students.ubc.ca/cs/main?pname=subjarea',
  _ = require('lodash-node'),
  mongoose = require('mongoose');
var Subject = require('./subject.model');
var Course = require('../course/course.model');
var Section = require('../section/section.model');

var $ = cheerio;

exports.getSectionsForCourses = function(subjectCode, courseNumber) {
  var url = 'https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=3&dept=' + subjectCode + "&course=" + courseNumber;
  request(url, function (err, res, body) {
    if(!err) {
      var $page = cheerio.load(body);      
      var text = $page('.breadcrumb').find('button').text();
      text = _.words(text, /.*\s(\d+)\s(Winter|Summer).*/i)
      var year = text[1];
      var session = text[2];
      // console.log(year + " " + session);
      $page(".section1, .section2").each(function (i,elem){
        var sectionArray = [];
        $('td', elem).each(function (i, elem) {
          sectionArray.push(_.trim($(this).text()));
          // console.log(sectionArray);

        });
        if (sectionArray[2] == 'Lecture') {
            addSection(sectionArray, year, session);
        }
      });
      }
    });
  function addSection(sectionArray, year, session) {
    var newId = new mongoose.Types.ObjectId;
    var sectionInfo = sectionArray[1].split(' ');
    var subjectCode = sectionInfo[0];
    var courseNumber = sectionInfo[1];
    var sectionCode = sectionInfo[2];
    var term = sectionArray[3];
    var days = sectionArray[5];
    var startTime = sectionArray[6];
    var endTime = sectionArray[7];
    var section = new Section({
      "year": year,
      "session": session,
      "term": term,
      "subjectCode": subjectCode,
      "courseNumber": courseNumber,
      "sectionCode": sectionCode,
      "days": days,
      "startTime": startTime,
      "endTime": endTime,
      "_id": newId
    });
    // console.log(sectionArray);
    section.save(function(err, subject) {
      if (err) return console.error(err);
    });
    Course.update( {  courseNumber: courseNumber,
                      subjectCode: subjectCode },
                      { $addToSet: { sections: newId }},
                      function( err, result ) {
                        if (err) {
                         console.log(err);
                          }
                      });
  }
  }


//   STT
// CPSC 110 V2C
// Laboratory
// 2

// Fri
// 15:00
// 18:00
// Section Comments  This section is available only to students registered in Vantage College.
// STT
// CPSC 110 V2D
// Laboratory
// 2

// Fri
// 15:00
// 18:00
// Section Comments  This sect

exports.getCoursesForSubject = function(subjectCode) {
  var url = 'https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=1&dept=' + subjectCode;
  request(url, function (err, res, body) {
    if(!err) {
      var $page = cheerio.load(body);
      var text = $page('.breadcrumb').find('button').text();
      text = _.words(text, /.*\s(\d+)\s(Winter|Summer).*/i)
      var year = text[1];
      var session = text[2];
      console.log(year + " " + session);
      $page(".section1, .section2").each(function (i,elem) {
        var elemText = _.trim($page(this).text());
        var elemSplit = elemText.split('\n');
        var elemCourseSplit = elemSplit[0].split(" ");
        var subjectCode = elemCourseSplit[0];
        var courseNumber = elemCourseSplit[1];
        var courseName = elemSplit[1];
        console.log(subjectCode + " " + courseNumber + ", " + courseName);
        addCourse({
          'year': year,
          'session': session,
          'subjectCode': subjectCode,
          'courseNumber': courseNumber,
          'courseName': courseName
        });
      })
    }
  })

  function addCourse(arr) {
    var newId = new mongoose.Types.ObjectId;
    var course = new Course({
      "year": arr['year'],
      "session": arr['session'],
      "subjectCode": arr['subjectCode'],
      "courseNumber": arr['courseNumber'],
      "courseName": arr['courseName'],
      "_id": newId
    });

    course.save(function(err, subject) {
      if (err) return console.error(err);
    });
    Subject.update( { subjectCode: arr['subjectCode']},
                      { $addToSet: { courses: newId }},
                      function( err, result ) {
                        if (err) {
                         console.log(err);
                          }
                      });
  } 
}

exports.updateAllSubjectsWithCourses = function() {
  console.log('getting courses!!');
  Subject.find({}, function(err, subjects){
    console.log(subjects);
      subjects.forEach(function(subject){
        exports.getCoursesForSubject(subject.subjectCode);
    }
  )})
}

exports.updateAllCoursesWithSections = function() {
  console.log('getting sections!!');
  Course.find({}, function(err, courses){
    courses.forEach(function(course){
      exports.getSectionsForCourses(course.subjectCode, course.courseNumber);
    })
    console.log('Finished updating courses with sections');
  })
}

exports.updateAllSectionsWithProfs = function () {
  console.log('asdfasdf')
  Section.find({}, function(err, sections) {
    sections.forEach(function (elem, index, array) {
      // update each elem with instructor and maybe other data
      console.log(elem);
    })
  });

  function updateSection(subjectCode, courseNumber, sectionCode) {
    var urlSection = 'https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=5&dept=' + subjectCode + '&course=' + courseNumber +'&section=' + sectionCode;
  
  }
}


exports.getSubjects = function() {
  console.log("in mah module YEEE");

  request(urlSubjects, function (err, res, body) {
    if(!err){
      var $page = cheerio.load(body);
      $page(".section1, .section2").each(function (i,elem){
        var elemText = _.trim($page(this).text());
        var elemSplit = elemText.split(/\n/g);
        elemSplit = _.map(elemSplit, _.trim);
        // filter out empty strings from array
        elemSplit = _.filter(elemSplit, function(str) {
          return (str !== "");
        });
        console.log(elemSplit);
        console.log('-------------');

        addSubject(elemSplit);

      });

      //console.log(text);
    }
    //Subject.createIndex({"$**": "text"});
  });

  function addSubject(arr) {

    var obj = new Subject({
      "subjectCode": arr[0],
      "subjectTitle": arr[1],
      "facultySchool": arr[2],
      "classes": []
    });

    obj.save(function(err, subject) {
      if (err) return console.error(err);
    });

  }
};
