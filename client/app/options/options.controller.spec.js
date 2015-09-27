'use strict';

describe('Controller: OptionsCtrl', function () {

  // load the controller's module
  beforeEach(module('whosTeachingAtUbcApp'));

  var OptionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OptionsCtrl = $controller('OptionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
