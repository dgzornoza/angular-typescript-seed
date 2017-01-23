import { infraestructure } from "app/infraestructure";

export interface IUserModel {
    code: string;
    rol: infraestructure.enumUserRoles;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
}
