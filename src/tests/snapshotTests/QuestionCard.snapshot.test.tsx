import { expect, it, vi } from "vitest";
import { QuestionCard } from "../../components";
import { exampleQuestionCardProps } from "../testUtils";

it("QuestionCard to match snapshot", () => {
    const result = (
        <QuestionCard
            isPostedByUser={true}
            data={exampleQuestionCardProps}
            handleDeleteClick={vi.fn}
        />
    );

    expect(result).toMatchSnapshot();
});
