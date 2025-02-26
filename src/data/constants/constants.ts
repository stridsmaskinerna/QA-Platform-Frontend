export const BASE_URL = import.meta.env.VITE_BASE_URL as string;
export const LOCAL_STORAGE_TOKEN_KEY = "tokens";

//Routes
export const GUEST_HOME_ROUTE = "/guest/";
export const HOME_ROUTE = "/";
export const ADMIN_ROUTE = "/admin/";
export const LOGIN_REGISTER_ROUTE = "/login/";
export const EDIT_QUESTION_ROUTE = "/questions/edit/";
export const GUEST_QUESTION_DETAILS_ROUTE = "/guest/questions/";
export const QUESTION_DETAILS_ROUTE = "/questions/";

//URLS
export const ANSWER_URL = "/answers";
export const COMMENT_URL = "/comments";
export const QUESTION_URL = "/questions";
export const SUBJECT_URL = "/subjects";
export const TOPIC_URL = "/topics";
export const PUBLIC_URL = "/public";
export const USERS_URL = "/admin/users";

//Misc
export const QUESTION_ID = ":questionId";
export const PASSWORD_MIN_LENGTH = 8;

export const EMAIL_TAKEN = "Email taken";
export const USERNAME_TAKEN = "Username taken";
