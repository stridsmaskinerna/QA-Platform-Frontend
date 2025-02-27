import { expect, it, vi } from "vitest";
import { QuestionCard } from "../../components";
import { exampleQuestionCardProps } from "../testUtils";
import { render } from "@testing-library/react";
import MockedContexts from "../../mocks/contexts/MockedContexts";

it("QuestionCard to match snapshot", () => {
    const { asFragment } = render(
        <MockedContexts>
            <QuestionCard
                isPostedByUser={true}
                data={exampleQuestionCardProps}
                handleDeleteClick={vi.fn}
            />
        </MockedContexts>,
    );
    expect(asFragment()).toMatchSnapshot();
});
