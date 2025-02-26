import { useState } from "react";
import { usePUT, useQAContext } from "../../../hooks";
import styles from "./AnswerCardVote.module.css";
import ThumpUpNeutral from "../../../assets/icons/thumb_up_neutral.svg";
import ThumpUpFilled from "../../../assets/icons/thumb_up_filled.svg";
import ThumpDownNeutral from "../../../assets/icons/thumb_down_neutral.svg";
import ThumpDownFilled from "../../../assets/icons/thumb_down_filled.svg";
import { BASE_URL, QUESTION_DETAILS_ROUTE } from "../../../data";

interface IAnswerCardVoteProps {
    answerId: string;
    voteCount: number;
    myVote: string;
}

export function AnswerCardVote({
    answerId,
    voteCount: initialVoteCount, // Rename the prop to avoid conflicts
    myVote,
}: IAnswerCardVoteProps) {
    const [currentVote, setCurrentVote] = useState<string>(myVote);
    const [voteCount, setVoteCount] = useState<number>(initialVoteCount);
    const { isLoading, putRequest } = usePUT();

    const { isLoggedIn } = useQAContext().authContext;

    const upvoteToShow =
        currentVote === "like" ? ThumpUpFilled : ThumpUpNeutral;
    const downvoteToShow =
        currentVote === "dislike" ? ThumpDownFilled : ThumpDownNeutral;

    const sendVote = async (newVote: string) => {
        try {
            await putRequest(
                `${BASE_URL}${QUESTION_DETAILS_ROUTE}${answerId}/rating?vote=${newVote}`,
            );
        } catch (err) {
            console.error("Failed to submit vote:", err);
        }
    };

    const toggleLike = () => {
        if (!isLoggedIn) {
            return;
        }
        const newVote = currentVote === "like" ? "neutral" : "like";
        setVoteCount(prevCount => {
            if (currentVote === "neutral") return prevCount + 1;
            if (currentVote === "like") return prevCount - 1;
            if (currentVote === "dislike") return prevCount + 2;
            return prevCount;
        });

        setCurrentVote(newVote);
        void sendVote(newVote);
    };

    const toggleDislike = () => {
        if (!isLoggedIn) {
            return;
        }
        const newVote = currentVote === "dislike" ? "neutral" : "dislike";
        setVoteCount(prevCount => {
            if (currentVote === "neutral") return prevCount - 1;
            if (currentVote === "dislike") return prevCount + 1;
            if (currentVote === "like") return prevCount - 2;
            return prevCount;
        });

        setCurrentVote(newVote);
        void sendVote(newVote);
    };

    const getVoteButtonClass = () => {
        return `${styles.voteButton} 
                ${isLoading ? styles.loading : ""} 
                ${!isLoggedIn ? styles.disabled : ""}`;
    };

    return (
        <div className={styles.container}>
            <img
                src={upvoteToShow}
                alt=""
                onClick={toggleLike}
                className={getVoteButtonClass()}
            />

            <span className={styles.voteCount}>{voteCount}</span>
            <img
                src={downvoteToShow}
                alt=""
                onClick={toggleDislike}
                className={getVoteButtonClass()}
            />
        </div>
    );
}
