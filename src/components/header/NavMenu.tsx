import { useRef, useState } from "react";
import { Link } from "react-router";
import styles from "./NavMenu.module.css";
import { useTranslation } from "react-i18next";
import { useRoles } from "../../hooks/useRoles";
import { useAuthContext } from "../../hooks";
import { useOnClickOutside } from "usehooks-ts";

export function NavMenu() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { isAdmin, isGuest, isOnlyAdmin } = useRoles();
    const { logout } = useAuthContext();
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
                            <Link
                                onClick={closeMenu}
                                to="/admin"
                            >
                                {t("admin")}
                            </Link>
                        </li>
                    )}

                    <li>
                        <Link
                            onClick={closeMenu}
                            to={isGuest || isOnlyAdmin ? "/public" : "/"}
                        >
                            {t("qa")}
                        </Link>
                    </li>
                    {isGuest ? (
                        <li>
                            <Link
                                onClick={closeMenu}
                                to="/login"
                            >
                                {t("loginRegister")}
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link
                                to="/public"
                                onClick={() => {
                                    logout();
                                    closeMenu();
                                }}
                            >
                                {t("logout")}
                            </Link>
                        </li>
                    )}
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
