export type RegisterErrorMessage =
    | "usernameTaken"
    | "serverProblem"
    | "passwordsNoMatch"
    | "mustEndWithLtuErrMsg"
    | "emailTaken";

export type LoginErrorMessage =
    | "wrongCredentials"
    | "serverProblem"
    | "mustEndWithLtuErrMsg";

export type UserInteractionFilter = "created" | "answered" | "commented";
