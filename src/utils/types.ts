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
