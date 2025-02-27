import { expect, it, vi } from "vitest";
import { AnswerCard } from "../../components/answerCard";
import { exampleAnswerCardProps, exampleQuestionCardProps } from "../testUtils";
import { render } from "@testing-library/react";
import MockedContexts from "../../mocks/contexts/MockedContexts";
import { QuestionDetailsProvider } from "../../components";

it("AnswerCard to match snapshot", () => {
    const { asFragment } = render(
        <MockedContexts>
            <QuestionDetailsProvider
                question={{
                    ...exampleQuestionCardProps,
                    filePath: "",
                    answers: [exampleAnswerCardProps],
                }}
            >
                <AnswerCard
                    questionId="questionId"
                    isOwner={true}
                    onMarkAsSolved={() => vi.fn()}
                    data={exampleAnswerCardProps}
                />
            </QuestionDetailsProvider>
        </MockedContexts>,
    );

    expect(asFragment()).toMatchSnapshot();
});
