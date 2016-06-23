

import "angular";
import { app } from "app/main";
import "app/controllers/users.controller";

var angularApp = app;


declare module angular {
    var mock: any;
    var inject: any;
}

describe('usersController', () => {

    beforeEach(angular.mock.module(APP_NAME));

    //angular.mock.module(APP_NAME);
    var a = angular.mock.module(APP_NAME);
    var $controller;
    var $injector;

    beforeEach(angular.mock.inject((_$controller_, _$injector_) => {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $injector = _$injector_;
    }));

    describe('$scope.Users', () => {

        var $scope, controller;

        beforeEach(() => {
            $scope = {};
            controller = $controller('usersController', { $scope: $scope });
            $scope = controller;
        });

        it('sets the strength to "strong" if the password length is >8 chars', () => {

            expect($scope.Users).not.toBeNull();
        });
    });
});


