import { useMemo } from "react";

import { TopicItem } from "../topicItem";
import { useTeacherDashboardContext } from "../context";

export function TopicList() {
    const context = useTeacherDashboardContext();

    const sortedTopics = useMemo(() => {
        if (context.selectedSubject?.topics == null) {
            return [];
        }
        return [
            ...context.selectedSubject.topics
        ].sort((a, b) => a.name.localeCompare(b.name));
    }, [context.selectedSubject?.topics]);

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
