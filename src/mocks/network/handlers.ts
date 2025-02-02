import { http, HttpResponse } from "msw";
import { BASE_URL } from "../../data";
import { IQuestion } from "../../utils";
export const handlers = [
    http.get(`${BASE_URL}/questions/public`, ({ request }) => {
        const url = new URL(request.url);
        const subjectId = url.searchParams.get("subjectId");

        if (subjectId === "subject-1") {
            return HttpResponse.json([questions[0]]);
        }

        return HttpResponse.json(questions);
    }),
    http.get(`${BASE_URL}/questions`, () => {
        return HttpResponse.json(questions);
    }),

    http.post(`${BASE_URL}/authentication/login`, () => {
        return HttpResponse.json({
            accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAbHR1LnNlIiwidXNlcklkIjoiNzE5YzhiMGItOWQ4Yy00NzFjLWEzOTgtOTcyMTRkMTg0ZWQyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsIm5iZiI6MTczODQ5NTUxOSwiZXhwIjoxNzQyMDk1NTE5LCJpc3MiOiJxYS1wbGF0Zm9ybS5sdHUuc2UiLCJhdWQiOiJxYS1wbGF0Zm9ybS5sdHUuc2UifQ.BqkZAA5KEoa0iof4NaaOWqw8cBpLFbKOBaVnFSebsNY",
            refreshToken: ""
        });
    })
];

const randomDate = (): string => {
    const start = new Date(2020, 0, 1); // Start date (Jan 1, 2020)
    const end = new Date(); // Current date
    const randomTime =
        start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime).toISOString(); // Return as ISO string
};

const questions: IQuestion[] = Array.from({ length: 10 }, (_, index) => ({
    id: `q-${index + 1}`,
    topicName: `Topic ${index + 1}`,
    topicId: `topic-${index + 1}`,
    subjectId: `subject-${index + 1}`,
    subjectName: `Subject ${index + 1}`,
    subjectCode: `SUBJ${index + 1}`,
    username: `user${index + 1}`,
    title: `Question Title ${index + 1}`,
    created: randomDate(),
    isResolved: index % 2 === 0, // Alternate between resolved and unresolved
    isProtected: index % 3 === 0, // Every third question is protected
    isHidden: index % 4 === 0, // Every fourth question is hidden
    answerCount: Math.floor(Math.random() * 10), // Random answer count
    tags: [`tag${index + 1}-1`, `tag${index + 1}-2`], // Example tags
    userId: `user-${index + 1}`
}));
