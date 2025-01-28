import { Roles } from "../../utils";

//TODO Change base url to one implemented by backend.
export const BASE_URL = "ChangeMe";
export const LOCAL_STORAGE_TOKEN_KEY = "tokens";
//If changing POSSIBLE_ROLES, remember to change the type Roles in utils/types accordingly
export const POSSIBLE_ROLES: Roles[] = ["Admin", "Teacher", "User"];

//Routes
export const GUEST_QUESTION_DETAILS_ROUTE = "/guest/questions/";
export const ADMIN_ROUTE = "/admin/";
export const LOGIN_REGISTER_ROUTE = "/login/";
export const GUEST_HOME_ROUTE = "/guest/";
export const HOME_ROUTE = "/";
export const QUESTION_DETAILS_ROUTE = "/questions/";
export const QUESTION_ID = ":questionId";
