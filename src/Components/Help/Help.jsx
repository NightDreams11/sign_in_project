import React from "react";
import style from './Help.module.css'

const Help = (props) => {
    return (
        <div className={props.openHelp ? style.container : style.container_hidden}>
            <div className={style.text}>
                email: example@example.com
            </div>
            <div className={style.text}>
                pass: 12345
            </div>
        </div>
    )
}

export default Help;