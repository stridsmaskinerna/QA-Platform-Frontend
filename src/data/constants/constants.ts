import { Roles } from "../../utils";
import { Role } from "../../utils/enums";

export const BASE_URL = "http://localhost:5084/api";
export const LOCAL_STORAGE_TOKEN_KEY = "tokens";

export const POSSIBLE_ROLES: Roles[] = [Role.Admin, Role.Teacher, Role.User];

//Routes
export const GUEST_QUESTION_DETAILS_ROUTE = "/guest/questions/";
export const ADMIN_ROUTE = "/admin/";
export const LOGIN_REGISTER_ROUTE = "/login/";
export const GUEST_HOME_ROUTE = "/guest/";
export const HOME_ROUTE = "/";
export const QUESTION_DETAILS_ROUTE = "/questions/";
export const QUESTION_ID = ":questionId";

export const PASSWORD_MIN_LENGTH = 8;
