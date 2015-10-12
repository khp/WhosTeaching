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
      if (val != null && val.length > 1) {
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
      if (val != null && val.length > 1) {
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
  });
