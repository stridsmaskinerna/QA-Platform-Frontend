import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { QuestionFinder } from "../../components";
import MockedContexts from "../../mocks/contexts/MockedContexts";

describe("App", () => {
    it("renders the QuestionFinder component", async () => {
        const { queryByText, getByText, getAllByText, findByText } = render(
            <MockedContexts>
                <QuestionFinder />
            </MockedContexts>
        );

        expect(await findByText("Topic 2")).to.toBeTruthy();

        const firstSubjectFilter = await waitFor(() =>
            getByText("SUBJ1 Subject 1")
        );
        expect(firstSubjectFilter).to.toBeTruthy();
        await waitFor(() =>
            fireEvent(
                firstSubjectFilter,
                new MouseEvent("click", { bubbles: true, cancelable: true })
            )
        );

        expect(await waitFor(() => queryByText("Topic 2"))).to.toBeFalsy();
        expect(await waitFor(() => queryByText("Topic 3"))).to.toBeFalsy();

        expect(await waitFor(() => getAllByText("Topic 1"))).to.toHaveLength(2);

        screen.debug(); // prints out the jsx in the App component unto the command line
    });
});
