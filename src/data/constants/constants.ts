import { Roles } from "../../utils";

//TODO Change base url to one implemented by backend.
export const BASE_URL = "ChangeMe";
export const LOCAL_STORAGE_TOKEN_KEY = "tokens";
//If changing POSSIBLE_ROLES, remember to change the type Roles in utils/types accordingly
export const POSSIBLE_ROLES: Roles[] = ["Admin", "Teacher", "User"];
