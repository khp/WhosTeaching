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
    $scope.courses = [];
    $scope.getSubjects = function(val) {
      return $http.get('/api/subjects/json'
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
      return $http.get('/api/courses'
        , {
          params: {
            query: val
          }
        }
        ).then(function(response) {
            console.log(response);
            $scope.courses = response.data;
            return response.data;
        });
    };
  });
