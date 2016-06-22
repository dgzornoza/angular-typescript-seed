// import { app } from "src/app/main";

define(['angular','app/controllers/users.controller', 'angular-mocks'],

  function(angular, userController) {

    describe('usersController', function() {

        beforeEach(angular.mock.module(APP_NAME));
        //angular.mock.module(APP_NAME);
        var a = angular.mock.module(APP_NAME);
        var $controller;

        beforeEach(inject(function(_$controller_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

        describe('$scope.Users', function() {

            var $scope, controller;

            beforeEach(function() {
                $scope = {};
                controller = $controller('usersController', { $scope: $scope });
            });

            it('sets the strength to "strong" if the password length is >8 chars', function() {

                expect($scope.Users()).not.toBeNull();
            });
        });
    });

  }
);


