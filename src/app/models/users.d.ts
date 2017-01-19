import { infraestructure } from "app/infraestructure";

export interface IUserModel {
    Code: string;
    Rol: infraestructure.enumUserRoles;
    Name: string;
    FirstName: string;
    LastName: string;
    Email: string;
}
