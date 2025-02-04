import { useRef, useState } from "react";
import styles from "./NavMenu.module.css";
import { useTranslation } from "react-i18next";
import { useRoles } from "../../hooks/useRoles";
import { useQAContext } from "../../hooks";
import { useOnClickOutside } from "usehooks-ts";
import { NavLink, LanguagePicker } from ".";
import {
    ADMIN_ROUTE,
    GUEST_HOME_ROUTE,
    HOME_ROUTE,
    LOGIN_REGISTER_ROUTE
} from "../../data";

export function NavMenu() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { isAdmin, isGuest, isUser } = useRoles();
    const {
        authContext: { logout }
    } = useQAContext();
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    useOnClickOutside(menuRef, () => {
        if (isOpen) {
            toggleMenu();
        }
    });
    return (
        <nav className={styles.container}>
            <div
                ref={menuRef}
                className={`${styles.menuLinks} ${isOpen ? styles.menuOpen : ""}`}
            >
                <ul>
                    {isAdmin && (
                        <li>
                            <NavLink
                                to={ADMIN_ROUTE}
                                onClickSideEffect={closeMenu}
                                title={t("admin")}
                            />
                        </li>
                    )}

                    <li>
                        <NavLink
                            to={isUser ? HOME_ROUTE : GUEST_HOME_ROUTE}
                            onClickSideEffect={closeMenu}
                            title={t("qa")}
                        />
                    </li>
                    {isGuest ? (
                        <li>
                            <NavLink
                                to={LOGIN_REGISTER_ROUTE}
                                onClickSideEffect={closeMenu}
                                title={t("loginRegister")}
                            />
                        </li>
                    ) : (
                        <li>
                            <NavLink
                                to={GUEST_HOME_ROUTE}
                                onClickSideEffect={() => {
                                    logout();
                                    closeMenu();
                                }}
                                title={t("logout")}
                            />
                        </li>
                    )}
                    <li className={styles.langPickerItem}>
                        <LanguagePicker />
                    </li>
                </ul>
            </div>

            <button
                className={`${styles.burgerIcon}  ${isOpen ? styles.menuOpen : ""}`}
                onClick={toggleMenu}
            >
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
            </button>
        </nav>
    );
}
