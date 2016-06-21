// import { app } from "src/app/main";


describe('UsersController', function() {

  //beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.Users', function() {

    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('UsersController', { $scope: $scope });
    });

    it('sets the strength to "strong" if the password length is >8 chars', function() {
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });
  });
});
