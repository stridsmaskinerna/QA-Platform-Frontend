import styles from "./DynamicTooltip.module.css";

interface TooltipProps {
    content: string;
    position: { top: number; left: number };
}

export function DynamicTooltip({ content, position }: TooltipProps) {
    return (
        <div
            className={styles.tooltip}
            style={{ top: position.top, left: position.left }}
        >
            {content}
        </div>
    );
}
