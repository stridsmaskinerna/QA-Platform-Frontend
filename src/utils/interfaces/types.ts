// TODO! Move to auth or ui ???
export type RegisterErrorMessage =
    | "usernameTaken"
    | "serverProblem"
    | "passwordsNoMatch"
    | "mustEndWithLtuErrMsg"
    | "emailTaken";

// TODO! Move to auth or ui ???
export type LoginErrorMessage =
    | "wrongCredentials"
    | "serverProblem"
    | "mustEndWithLtuErrMsg";

// TODO! Move to UI interface folder
export type UserInteractionFilter = "created" | "answered" | "commented";
