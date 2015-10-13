'use strict';

angular.module('whosTeachingAtUbcApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });

angular.module('whosTeachingAtUbcApp')
  .controller('TypeaheadCtrl', function($scope, $http) {

    $scope.selected = undefined;
    // Any function returning a promise object can be used to load values asynchronously

    //$scope.getLocation = function(val) {
    //  return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
    //    params: {
    //      address: val,
    //      sensor: false
    //    }
    //  }).then(function(response){
    //    console.log(response.data.results.map(function(item) {
    //      return item.formatted_address;
    //    }));
    //    return response.data.results.map(function(item){
    //
    //      return item.formatted_address;
    //    });
    //  });
    //};
    $scope.subjects = [];
    $scope.sections = [];
    $scope.courses;
    $scope.shortCourses;
    $scope.getSubjects = function(val) {
      return $http.get('/api/subjects/search'
        , {
        params: {
          subject: val
        }
      }
      ).then(function(response){
          console.log(response);
          $scope.subjects = response.data;
        return response.data;
      });
    };

    $scope.getCourses = function(val) {
      if (val !== undefined && val.length > 1) {
        return $http.get('/api/courses/searchAutoComplete'
          , {
            params: {
              course: val
            }
          }
          ).then(function(response) {
              console.log(response);
              $scope.courses = response.data;
              return response.data.slice(0,10);
          });
        }
    };

    $scope.sendQuery = function(val) {
      if (val !== undefined && val.length > 2) {
        return $http.get('/api/sections/search'
          , {
            params: {
              course: val
            }
          }
          ).then(function(response) {
              console.log(response);
              $scope.sections = response.data;
              return response.data;
          });
        }
    }
    $scope.instructorName = function (section) {
      var firstName;
      var lastName;
      if (section.instructor == null && section.firstName == null && section.lastName == null) {
        return "";
      }
      if (section.instructor != null) {
        lastName = section.instructor.lastName;
        firstName = section.instructor.firstName;
      } else {
        lastName = section.lastName;
        firstName = section.firstName;
      }
      firstName = firstName.split(/[^A-Za-z]/);
      lastName = lastName.split(/[^A-Za-z]/);
      firstName = $.map(firstName, function(str) {
        if (str.length > 1) {
          return str.charAt(0) + str.toLowerCase().slice(1);
        }
      });
      lastName = $.map(lastName, function(str) {
        if (str.length > 1) {
          return str.charAt(0) + str.toLowerCase().slice(1);
        }
      });
      return lastName.join(" ") + ", " + firstName.join(" ");

      
    }
    $scope.instructorRating = function (section) {
      if (section.instructor != null) {
        return section.instructor.overallRating;
      }
    }
  });
