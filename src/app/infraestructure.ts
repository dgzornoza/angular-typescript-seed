 /* tslint:disable no-bitwise */

export namespace infraestructure {
"use strict";

    /** Flags enumeration for user roles */
    export enum enumUserRoles {
        NONE = 0x0,
        ADMIN = 0x1,
        USER = 0x1 << 1
    }


    /** Order enumeration */
    export enum enumSortOrder {
        NONE = 0,
        ASC = 1,
        DESC = 2
    }



}


