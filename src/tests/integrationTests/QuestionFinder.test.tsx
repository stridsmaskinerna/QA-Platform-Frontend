import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { QuestionFinder } from "../../components";
import MockedContexts from "../../mocks/contexts/MockedContexts";
import { mockAPI } from "../testUtils";

describe("QuestionFinder", () => {
    it("renders questions initially and then also subject filters after typing in the SearchBar", async () => {
        const { queryByText, queryAllByText, getByPlaceholderText } = render(
            <MockedContexts>
                <QuestionFinder />
            </MockedContexts>,
        );
        //Fetches 10 most recent questions by default
        await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1));

        //Check that questions cards have been rendered. They each contain a text string with their
        //topic name.
        expect(queryAllByText("Topic 2")).toHaveLength(1);
        expect(queryAllByText("Topic 3")).toHaveLength(1);
        expect(queryAllByText("Topic 4")).toHaveLength(1);

        //We expect no subject filters to be present when the searchbar is empty
        expect(queryByText("SUBJ2 Subject 2")).toBeFalsy();
        expect(queryByText("SUBJ3 Subject 3")).toBeFalsy();
        expect(queryByText("SUBJ4 Subject 4")).toBeFalsy();

        const searchBar = getByPlaceholderText(
            "Search questions by title, course code, course name, tag, or topic",
        );

        await waitFor(() =>
            fireEvent.change(searchBar, { target: { value: "subj" } }),
        );

        await waitFor(() => expect(mockAPI).toHaveBeenCalledWith("subj"));

        //Check that subject filters have been rendered
        expect(queryByText("SUBJ2 Subject 2")).toBeTruthy();
        expect(queryByText("SUBJ3 Subject 3")).toBeTruthy();
        expect(queryByText("SUBJ4 Subject 4")).toBeTruthy();
    });

    it("when clicking a Subject Filter, Topic Filters and questions for that subject is shown", async () => {
        const {
            getByText,
            queryAllByText,
            queryByTestId,
            getByTestId,
            queryAllByTestId,
            getByPlaceholderText,
        } = render(
            <MockedContexts>
                <QuestionFinder />
            </MockedContexts>,
        );
        await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1));

        const searchBar = getByPlaceholderText(
            "Search questions by title, course code, course name, tag, or topic",
        );

        await waitFor(() =>
            fireEvent.change(searchBar, { target: { value: "subj" } }),
        );

        await waitFor(() => expect(mockAPI).toHaveBeenCalledWith("subj"));

        const firstSubjectFilter = await waitFor(() =>
            getByText("SUBJ1 Subject 1"),
        );

        await waitFor(() =>
            fireEvent(
                firstSubjectFilter,
                new MouseEvent("click", { bubbles: true, cancelable: true }),
            ),
        );

        //Check that the correct styling have been applied
        expect(firstSubjectFilter).toHaveClass("active");

        await waitFor(() => expect(mockAPI).toHaveBeenCalledWith("subject-1"));

        //Since we only mock 10 questions (each with their own unique subject codes, topic names etc.),
        //then when clicking firstSubjectFilter, then only one questioncard will be shown. Hence only
        //one topic filter will be also rendered. We check here that topic filters are shown, ,that there is only one Topic filter, and that
        //that one is "Topic 1".
        await waitFor(() =>
            expect(getByTestId("topicFilterWrapper")).toHaveClass("show"),
        );
        //We attached a testId to each filter button which is its filterbutton-{title}. We query all of them here
        //and expect there to be only 1 since each of the mock questions have a unique topic
        expect(
            queryAllByTestId("filterButton-Topic", { exact: false }),
        ).toHaveLength(1);

        expect(queryByTestId("filterButton-Topic 1")).toHaveTextContent(
            "Topic 1",
        );

        //Assert that the belonging question is rendered: "Topic 1" will be shown
        //once as a topic filter and once in the question card
        expect(queryAllByText("Topic 1")).toHaveLength(2);
    });

    it("When deselecting a previously selected Subject filter, Topic Filters are hidden, and all questions are shown again", async () => {
        const {
            getByText,
            queryAllByText,
            getByTestId,
            getByPlaceholderText,
            queryByText,
        } = render(
            <MockedContexts>
                <QuestionFinder />
            </MockedContexts>,
        );
        expect(await waitFor(() => mockAPI)).to.toHaveBeenCalledTimes(1);

        const searchBar = getByPlaceholderText(
            "Search questions by title, course code, course name, tag, or topic",
        );

        await waitFor(() =>
            fireEvent.change(searchBar, { target: { value: "subj" } }),
        );

        await waitFor(() => expect(mockAPI).toHaveBeenCalledWith("subj"));

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

        await waitFor(() => expect(mockAPI).toHaveBeenCalledWith("subject-1"));

        // Check that the topic filter and question for Topic 1 have been rendered
        await waitFor(() => expect(queryAllByText("Topic 1")).toHaveLength(2));

        //Chcek that no other questions or topics are shown
        expect(queryByText("Topic 3")).toBeFalsy();
        expect(queryByText("Topic 4")).toBeFalsy();
        expect(queryByText("Topic 5")).toBeFalsy();

        //Since we dont conditionally render Topic Filters but add a class called show to its wrapper instead,
        //we here assert that the wrapper have the class "show".
        await waitFor(() =>
            expect(getByTestId("topicFilterWrapper")).toHaveClass("show"),
        );

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

        await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(4));

        //Check that topic filters are hidden
        await waitFor(() =>
            expect(getByTestId("topicFilterWrapper")).not.toHaveClass("show"),
        );

        //Check that the previously shown Topic 1 filter button is hidden. On queryAll
        // we expect the length one since all questions have now been rendered again
        //and one of them have the Topic 1 badge.
        await waitFor(() => expect(queryAllByText("Topic 1")).toHaveLength(1));

        //Check all other questions are shown again. If they are, queryAll on Topic X will have length 1
        expect(queryAllByText("Topic 3")).toHaveLength(1);
        expect(queryAllByText("Topic 4")).toHaveLength(1);
        expect(queryAllByText("Topic 5")).toHaveLength(1);
    });
});
