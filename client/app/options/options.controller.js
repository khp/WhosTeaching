'use strict';
angular.module('whosTeachingAtUbcApp')
  .controller('OptionsCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.getSubjects = function(req, res) {
      $http.post('/api/subjects/getSubjects').
        then(function(res) {
          console.log('success');
        }, function(res) {
          console.log('error');
        });
    };
    $scope.getCourses = function(req, res) {
      $http.post('/api/subjects/getCourses').
        then(function(res) {
          console.log('success');
        }, function(res) {
          console.log('error');
        });
    };
    $scope.updateCourses = function(req, res) {
      $http.post('/api/subjects/updateCourses').
        then(function(res) {
          console.log('success');
        }, function(res) {
          console.log('error');
        });
    };
    $scope.updateSections = function(req, res) {
      $http.post('/api/subjects/updateSections').
        then(function(res) {
          console.log('success');
        }, function(res) {
          console.log('error');
        });
    };
  }]);


