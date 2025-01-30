import { Role } from "./enums";

//If changing Roles, remember to change POSSIBLE_ROLES in constants and the Role enum accordingly
export type Roles = Role.Admin | Role.Teacher | Role.User;
