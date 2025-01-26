import { Link } from "react-router";

interface INavLink {
    to: string;
    onClickSideEffect: () => void;
    title: string;
}

export function NavLink({ to, onClickSideEffect, title }: INavLink) {
    return (
        <Link
            to={to}
            onClick={onClickSideEffect}
        >
            {title}
        </Link>
    );
}
