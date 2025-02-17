import { ITopic } from "../../../utils";
import { TopicItem } from "../topicItem";

interface ITopicListProps {
    topics: ITopic[];
}

export function TopicList({ topics }: ITopicListProps) {
    return (
        <>
            {topics.map((topic, i) => (
                <div key={i}>
                    <TopicItem topic={topic} />
                </div>
            ))}
        </>
    );
}
