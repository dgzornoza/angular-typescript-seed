import "angular";
import "app/main";

import "app/services/users.service";
import { IUsersService } from "app/services/users.service";
import { IUserModel } from "app/models/users";

// set jasmine timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe("usersService", () => {

    let $rootScope: ng.IRootScopeService;
    let $injector: ng.auto.IInjectorService;

    let _usersService: IUsersService;


    beforeEach(() => {

        angular.mock.module(APP_NAME);

        angular.mock.inject(["$injector", "$rootScope", "usersService",
        (_$injector: ng.auto.IInjectorService, _$rootScope: ng.IRootScopeService, usersService: IUsersService) => {

                $injector = _$injector;
                $rootScope = _$rootScope;
                _usersService = usersService;
            }
        ]);

    });


    describe("verify object members", () => {

        it("usersService should contain a 'getUsers' function", () => {
            expect(_usersService.getUsers).toBeDefined();
            expect(typeof _usersService.getUsers === "function").toBe(true);
        });

        // ...
    });

    describe("verify 'getUsers' function", () => {

        it("'getUsers' function should be get data", (done: any) => {

            _usersService.getUsers()
                .then((resultCallback: IUserModel[]) => {

                    expect(resultCallback).not.toBeNull();
                    expect(resultCallback.length > 0).toBeTruthy();

                    expect(resultCallback[0].Name).toBeDefined();
                    expect(resultCallback[0].FirstName).toBeDefined();
                    expect(resultCallback[0].LastName).toBeDefined();
                    expect(resultCallback[0].Birthdate).toBeDefined();

                })
                .catch((reason: any) => expect(reason).not.toBeDefined())
                .finally(() => done());

        });

        // ...
    });

});

