import { useState } from "react";
import { Link } from "react-router";
import styles from "./NavMenu.module.css";
import { useTranslation } from "react-i18next";
import { useRoles } from "../../hooks/useRoles";

export function NavMenu() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { isAdmin, isGuest, isOnlyAdmin, isTeacher, isUser } = useRoles();
    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };
    return (
        <nav className={styles.container}>
            <div className={`${styles.menuLinks} ${isOpen ? "open" : ""}`}>
                <ul>
                    <li>
                        <Link to="/"></Link>
                    </li>

                    <li>
                        <Link to="/">{t("qa")}</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    {/* Add more links as needed */}
                </ul>
            </div>
        </nav>
    );
}
