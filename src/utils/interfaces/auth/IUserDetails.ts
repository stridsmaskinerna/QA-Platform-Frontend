import { Role } from "../../enums";

export interface IUserDetails {
    username: string;
    userId: string;
    roles: Role[];
}
