import { CustomError, IQuestion } from "../../utils";

export async function fetchQuestions(
    url: RequestInfo | URL,
): Promise<IQuestion[] | void> {
    try {
        const response: Response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new CustomError(response.status, response.statusText);
        }

        return (await response.json()) as IQuestion[];
    } catch (error) {
        if (error instanceof CustomError) {
            console.error(error);
        }
        throw error;
    }
}
