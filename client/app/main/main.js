'use strict';

angular.module('whosTeachingAtUbcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'TypeaheadCtrl'
      });
  });

