'use strict';

angular.module('whosTeachingAtUbcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('options', {
        url: '/options',
        templateUrl: 'app/options/options.html',
        controller: 'OptionsCtrl'
      });
  });