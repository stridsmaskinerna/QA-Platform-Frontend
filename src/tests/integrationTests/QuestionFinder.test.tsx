import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { QuestionFinder } from "../../components";
import MockedContexts from "../../mocks/contexts/MockedContexts";
import { mockAPI } from "../testUtils";

describe("QuestionFinder", () => {
    it("renders subject filters and list of questions and not any topic filters", async () => {
        const { queryByText, queryAllByText, getByTestId } = render(
            <MockedContexts>
                <QuestionFinder />
            </MockedContexts>,
        );
        expect(await waitFor(() => mockAPI)).to.toHaveBeenCalledTimes(1);
        //Check that subject filters have been rendered
        expect(
            await waitFor(() => queryByText("SUBJ2 Subject 2")),
        ).toBeTruthy();
        expect(
            await waitFor(() => queryByText("SUBJ3 Subject 3")),
        ).toBeTruthy();
        expect(
            await waitFor(() => queryByText("SUBJ4 Subject 4")),
        ).toBeTruthy();

        //Since we dont conditionally render Topic Filters but add a class called show to its wrapper instead,
        //we here assert that the wrapper does not have the class "show".
        expect(
            await waitFor(() => getByTestId("topicFilterWrapper")),
        ).not.toHaveClass("show");

        //Check that questions cards have been rendered. They each contain a text string with their
        //topic name. If topic filters would have rendered the length of below querys would have been 2.
        expect(await waitFor(() => queryAllByText("Topic 2"))).to.toHaveLength(
            1,
        );
        expect(await waitFor(() => queryAllByText("Topic 3"))).to.toHaveLength(
            1,
        );
        expect(await waitFor(() => queryAllByText("Topic 4"))).to.toHaveLength(
            1,
        );
    });

    it("when clicking a Subject Filter, Topic Filters and questions for that subject is shown", async () => {
        const {
            getByText,
            queryAllByText,
            queryByTestId,
            getByTestId,
            queryAllByTestId,
        } = render(
            <MockedContexts>
                <QuestionFinder />
            </MockedContexts>,
        );
        expect(await waitFor(() => mockAPI)).to.toHaveBeenCalledTimes(1);
        const firstSubjectFilter = await waitFor(() =>
            getByText("SUBJ1 Subject 1"),
        );

        expect(firstSubjectFilter).not.toHaveClass("active");

        await waitFor(() =>
            fireEvent(
                firstSubjectFilter,
                new MouseEvent("click", { bubbles: true, cancelable: true }),
            ),
        );

        expect(await waitFor(() => mockAPI)).to.toHaveBeenCalledWith(
            "subject-1",
        );

        //Check that the correct styling have been applied
        expect(firstSubjectFilter).toHaveClass("active");

        //Since we only mock 10 questions (each with their own unique subject codes, topic names etc.),
        //then when clicking firstSubjectFilter, then only one questioncard will be shown. Hence only
        //one topic filter will be rendered. We check here that topic filters are shown, ,that there is only one Topic filter, and that
        //that one is "Topic 1".
        expect(
            await waitFor(() => getByTestId("topicFilterWrapper")),
        ).to.toHaveClass("show");
        //We attached a testId to each filter button which is its filterbutton-{title}. We query all of them here
        //and expect there to be only 1
        expect(
            await waitFor(() =>
                queryAllByTestId("filterButton-Topic", { exact: false }),
            ),
        ).toHaveLength(1);

        expect(
            await waitFor(() => queryByTestId("filterButton-Topic 1")),
        ).toHaveTextContent("Topic 1");

        //Assert that the belonging question is rendered: "Topic 1" will be shown once as a topic filter and once in the question card
        expect(await waitFor(() => queryAllByText("Topic 1"))).to.toHaveLength(
            2,
        );
    });

    it("When deselecting a previously selected Subject filter, Topic Filters are hidden, and all questions are shown again", async () => {
        const { getByText, queryAllByText, getByTestId } = render(
            <MockedContexts>
                <QuestionFinder />
            </MockedContexts>,
        );
        expect(await waitFor(() => mockAPI)).to.toHaveBeenCalledTimes(1);
        const firstSubjectFilter = await waitFor(() =>
            getByText("SUBJ1 Subject 1"),
        );
        //Selecting the Subject filter
        await waitFor(() =>
            fireEvent(
                firstSubjectFilter,
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                }),
            ),
        );
        expect(await waitFor(() => mockAPI)).to.toHaveBeenCalledWith(
            "subject-1",
        );

        expect(await waitFor(() => queryAllByText("Topic 1"))).toHaveLength(2);

        //Since we dont conditionally render Topic Filters but add a class called show to its wrapper instead,
        //we here assert that the wrapper have the class "show".
        expect(
            await waitFor(() => getByTestId("topicFilterWrapper")),
        ).to.toHaveClass("show");

        //Deselecting the Subject filter
        await waitFor(() =>
            fireEvent(
                firstSubjectFilter,
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                }),
            ),
        );

        expect(await waitFor(() => mockAPI)).toHaveBeenCalledTimes(3);

        //Check that topic filters are hidden
        expect(
            await waitFor(() => getByTestId("topicFilterWrapper")),
        ).not.toHaveClass("show");

        //Check all questions are shown again. If they are, queryAll on Topic X will have length 2
        //one for the (hidden) Topic filters and one for the question
        expect(await waitFor(() => queryAllByText("Topic 3"))).toHaveLength(2);
        expect(await waitFor(() => queryAllByText("Topic 4"))).toHaveLength(2);
        expect(await waitFor(() => queryAllByText("Topic 5"))).toHaveLength(2);
    });
});
