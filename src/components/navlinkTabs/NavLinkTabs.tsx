import { useId } from "react";
import { NavLink, NavLinkRenderProps } from "react-router";
import styles from "./NavLinkTabs.module.css";

interface INavLinkTab {
    title: string;
    to: string;
}

interface INavLinkTabsProps {
    navTabs: INavLinkTab[];
    containerClass?: string;
    btnClass?: string;
}

export function NavLinkTabs({
    navTabs,
    containerClass,
    btnClass,
}: INavLinkTabsProps) {
    const id = useId();
    const getDerivedContainerClass = () => {
        return containerClass ? containerClass : styles.btnsContainer;
    };
    const getDerivedBtnClass = ({ isActive }: NavLinkRenderProps) => {
        return `${btnClass ? btnClass : styles.tabButton} ${isActive ? styles.btnActive : ""}`;
    };
    return (
        <nav className={getDerivedContainerClass()}>
            {navTabs.map(n => (
                <NavLink
                    className={getDerivedBtnClass}
                    key={`${id}-${n.title}`}
                    to={n.to}
                >
                    {n.title}
                </NavLink>
            ))}
        </nav>
    );
}
