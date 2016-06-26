import "angular";
import "app/main";

import "app/controllers/users.controller";
import { IUsersController } from "app/controllers/users.controller";

describe("usersController", () => {

    let $rootScope: ng.IRootScopeService;
    let $controller: ng.IControllerService;
    let $injector: ng.auto.IInjectorService;

    let _usersController: IUsersController;


    beforeEach(() => {

        angular.mock.module(APP_NAME);

        angular.mock.inject(["$injector", "$rootScope", "$controller",
        (_$injector: ng.auto.IInjectorService, _$rootScope: ng.IRootScopeService, _$controller: ng.IControllerService) => {

                $injector = _$injector;
                $rootScope = _$rootScope;
                $controller = _$controller;
            }
        ]);

        // get controller to test
        _usersController = $controller("usersController", { $scope: $rootScope.$new() }) as IUsersController;
    });


    describe("verify object members", () => {

        it("Required property 'Users' in controller", () => {
            expect(_usersController.Users).not.toBeNull();
        });

        // ...
    });

});

