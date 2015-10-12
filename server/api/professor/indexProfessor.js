'use strict'

var _ = require('lodash-node'),
        mongoose = require('mongoose');
var Professor = require('./professor.model');
var request = require('request');
var URL_pre = 'http://www.ratemyprofessors.com/find/professor/?department=&institution=University+of+British+Columbia&page=';
var URL_post = '&query=*%3A*&queryoption=TEACHER&queryBy=schoolId&sid=1413&sortBy=';


exports.getAllUBCProfessors = function () {

    getOnePage(1);

    function url(page) {
        var URL = URL_pre + page + URL_post;
        return URL;
    }
    function getOnePage(page) {
        request(url(page), function (err, res, body) {
            var jsonResponse = JSON.parse(body);
            var professors = jsonResponse.professors;

            for (var i = 0; i < professors.length; i++) {
                var prof = professors[i];
                if (prof.overall_rating == "N/A") {
                    prof.overall_rating = -1;
                }
                var newProf = new Professor({
                    'firstName': prof.tFname.toUpperCase(),
                    'lastName': prof.tLname.toUpperCase(),
                    'ratingClass': prof.rating_class,
                    'rateMyProfId': prof.tid,
                    'overallRating': prof.overall_rating,
                    'department': prof.tDept
                });
                    newProf.save(function(err, prof) {
                      if (err) return console.error(err);
                    });
            }

            if (jsonResponse.remaining > 0) {
                // getOnePage(page + 1);
            }
        });
	}

}
