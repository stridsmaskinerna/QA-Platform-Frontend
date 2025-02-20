import { useState } from "react";
import { usePostData } from "../../../hooks/usePostData";
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
    voteCount,
    myVote,
}: IAnswerCardVoteProps) {
    const [currentVote, setCurrentVote] = useState<string>(myVote);
    const { isLoading, error, postHandler } = usePostData();

    const upvoteToShow =
        currentVote === "like" ? ThumpUpFilled : ThumpUpNeutral;
    const downvoteToShow =
        currentVote === "dislike" ? ThumpDownFilled : ThumpDownNeutral;

    const sendVote = async (vote: string) => {
        try {
            await postHandler(`${BASE_URL}${QUESTION_DETAILS_ROUTE}/${answerId}/${currentVote}`, {
                vote,
            });
            setCurrentVote(vote);
        } catch (err) {
            console.error("Failed to submit vote:", err);
        }
    };

    const toggleLike = () => {
        const newVote = currentVote === "like" ? "neutral" : "like";
        setCurrentVote(newVote);
        sendVote(newVote).catch(console.error);
    };

    const toggleDislike = () => {
        const newVote = currentVote === "dislike" ? "neutral" : "dislike";
        setCurrentVote(newVote);
        sendVote(newVote).catch(console.error);
    };

    return (
        <div className={styles.container}>
            <img
                src={upvoteToShow}
                alt=""
                onClick={toggleLike}
                style={{ cursor: "pointer", opacity: isLoading ? 0.5 : 1 }}
            />
            <span className={styles.voteCount}>{voteCount}</span>
            <img
                src={downvoteToShow}
                alt=""
                onClick={toggleDislike}
                style={{ cursor: "pointer", opacity: isLoading ? 0.5 : 1 }}
            />
            {currentVote}
        </div>
    );
}
