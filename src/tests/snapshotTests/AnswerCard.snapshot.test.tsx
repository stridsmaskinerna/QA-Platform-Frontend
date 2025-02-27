import { expect, it, vi } from "vitest";
import { AnswerCard } from "../../components/answerCard";
import { exampleAnswerCardProps } from "../testUtils";

it("AnswerCard to match snapshot", () => {
    const result = (
        <AnswerCard
            questionId="questionId"
            isOwner={true}
            onMarkAsSolved={() => vi.fn()}
            data={exampleAnswerCardProps}
        />
    );

    expect(result).toMatchSnapshot();
});
