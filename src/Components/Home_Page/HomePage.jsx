import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./HomePage.module.css"

const HomePage = (props) => {

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const openMenu = (value) => {
        setIsOpenMenu(value)
    }

    if (props.isAuth === false) {
        return <Navigate to={"/login"}></Navigate>
    }

    return (
        <div className={styles.container_1440}>
            <header className={styles.header}>
                <div className={styles.burger_menu}>
                    <div className={styles.burger_line}></div>
                    <div className={styles.burger_line}></div>
                    <div className={styles.burger_line}></div>
                </div>
                <h6 className={styles.title_logo}>Voypost</h6>
                <div className={styles.avatar} onClick={() => openMenu(!isOpenMenu)}>
                    <span>{props.firstNameChar}</span>
                    <span>{props.firstSurnameChar}</span>
                    <button className={isOpenMenu ? styles.btn : styles.noBtn}
                        onClick={() => props.onChangeAuth(false)}
                    >Logout</button>
                </div>
            </header>
        </div>
    )
}

export default HomePage;