interface IFilterButtonProps {
    title: string;
    onClick: () => void;
    isActive: boolean;
}

export function FilterButton({ title, onClick, isActive }: IFilterButtonProps) {
    return (
        <div
            style={isActive ? { backgroundColor: "red" } : {}}
            onClick={onClick}
        >
            {title}
        </div>
    );
}
