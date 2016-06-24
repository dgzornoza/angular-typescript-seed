import "angular";
import "app/main";

import "app/controllers/users.controller";
import { IUsersController } from "app/controllers/users.controller";

describe("usersController", () => {

    let $rootScope: ng.IRootScopeService;
    let $controller: ng.IControllerService;
    let $scope: IUsersController;
    let $injector: ng.auto.IInjectorService;

    beforeEach(() => {

        angular.mock.module(APP_NAME);

        angular.mock.inject(["injector", "$rootScope", "$controller",
        (_$injector: ng.auto.IInjectorService, _$rootScope: ng.IRootScopeService, _$controller: ng.IControllerService) => {

                $injector = _$injector;
                $rootScope = _$rootScope;
                $scope = $rootScope.$new() as any;
                $controller = _$controller;
            }
        ]);

        $controller("usersController", {$scope: $scope});
    });


    it("Required property Users in controller", () => {

        expect($scope.Users).not.toBeNull();
    });

});



