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

export type UserInteractionFilter = "asked" | "answered" | "commented";
