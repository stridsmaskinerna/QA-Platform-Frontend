import { useMemo } from "react";

import { ITopic } from "../../../utils";
import { TopicItem } from "../topicItem";

interface ITopicListProps {
    topics: ITopic[];
}

export function TopicList({ topics }: ITopicListProps) {
    const sortedTopics = useMemo(() => {
        return [...topics].sort((a, b) => a.name.localeCompare(b.name));
    }, [topics]);

    return (
        <>
            {sortedTopics.map(topic => (
                <div key={topic.id}>
                    <TopicItem topic={topic} />
                </div>
            ))}
        </>
    );
}
