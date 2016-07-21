import "angular";
import "app/main";
import "angular-midwayTester";

import "app/services/users.service";
import { IUsersService } from "app/services/users.service";
import { IUserModel } from "app/models/users";

// set jasmine timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe("usersService", () => {

    let _ngMidwayTester: any;
    let _usersService: IUsersService;

    beforeEach(() => {

        // create object for real ajax calls
        _ngMidwayTester = ngMidwayTester(APP_NAME, {
             mockLocationPaths: false,
             template : MAIN_PAGE_TEST_TPL
            });

        _usersService = _ngMidwayTester.inject("usersService");

    });

    afterEach(() => {
        _ngMidwayTester.destroy();
        _ngMidwayTester = undefined;
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
                .finally(() =>
                    done()
                );

        });

        // ...
    });

});

