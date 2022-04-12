import React, { useState } from "react";
import style from "./SignIn.module.css"
import picture from "../../images/SignInMainPhoto.svg"
import logo from "../../images/Vector.svg"
import icon from "../../images/icon.svg"
import icon_slash from "../../images/icon_slash.svg"
import { emailIsValid, passwordIsValid } from "../../validators/validators";
import { Navigate } from 'react-router-dom';
import SimpleSnackbar from '../Snackbar_MUI/Snackbar'
import Help from "../Help/Help";


const SignIn = (props) => {

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [email, setEmail] = useState('');
    const [isDirtyEmail, setIsDirtyEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [isDirtyPassword, setIsDirtyPassword] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [openHelp, setOpenHelp] = useState(false);


    let isEmailError = emailIsValid(email)
    let isPasswordError = passwordIsValid(password)

    let isDisabledButton = true;

    if ((isEmailError || isPasswordError) === false) {
        isDisabledButton = false;
    }

    const isHelp = (value) => {
        setOpenHelp(value)
    }

    const onSubmit = (data) => {
        data.preventDefault();
        //Чтобы данный метод отработал, полям нужно указать параметр name
        const formData = new FormData(data.target);
        let newData = Object.fromEntries(formData.entries());
        // console.log(Object.fromEntries(formData.entries()))

        if (newData.email === "example@example.com" && newData.password === "12345") {
            props.onChangeAuth(true);
        }

        setEmail('');
        setIsDirtyEmail(false);

        setPassword('');
        setIsDirtyPassword(false);
    }


    if (props.isAuth === true) {
        return <Navigate to={"/home"}></Navigate>
    }

    return (
        <div className={style.container_1440}>
            <div className={style.picture}>
                <img src={picture} alt="main_picture" />
            </div>
            <div className={style.login_block}>
                <div className={style.logo}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={style.title}>
                    Login
                </div>
                {/* isEmailError && isDirtyEmail решают проблему правильности присвоения класса */}
                <form onSubmit={onSubmit}>
                    <div className={isEmailError && isDirtyEmail ? (style.email + ' ' + style.error) : style.email}>
                        <div className={style.email_container}>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setIsDirtyEmail(true)}
                            />
                            <label>Email</label>
                            <span className={style.email_error}>{isDirtyEmail ? isEmailError : ''}</span>
                            <span className={style.email_help}
                                onClick={() => isHelp(!openHelp)}
                            >?</span>
                            <Help openHelp={openHelp}></Help>
                        </div>
                    </div>
                    {/* Класс не применялся, т.к. в CSS файле класс error был объявлен выше, чем класс password. Перенес error в конец CSS файла */}
                    <div className={isPasswordError && isDirtyPassword ? (style.password + ' ' + style.error) : style.password}>
                        <div className={style.password_container}>
                            <input
                                type={isPasswordHidden ? "password" : "text"}
                                name="password"
                                value={password}
                                autoComplete="new-password" // autocomplete="off" не работает для input, только для form
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setIsDirtyPassword(true)}
                            />
                            <label>Password</label>
                            <span>{isDirtyPassword ? isPasswordError : ''}</span>
                            <img
                                src={isPasswordHidden ? icon : icon_slash}
                                alt="eye"
                                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                            />
                        </div>
                    </div>
                    <div className={isDisabledButton ? (style.button + ' ' + style.disabledButton) : style.button}>
                        <button
                            type="submit"
                            disabled={isDisabledButton}
                            onClick={() => setOpen(true)}
                        >LOGIN</button>
                    </div>
                    <SimpleSnackbar open={open} setOpen={setOpen}></SimpleSnackbar>
                </form>
            </div>
        </div>
    )
}

export default SignIn;