import { Role } from "../../enums";

export interface IRoleBasedRedirect {
    allowedRoles: Role[];
    fallbackRoute: string;
}
