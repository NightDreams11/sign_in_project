import React, { useState } from "react";
import style from "./SignIn.module.css"
import picture from "../../images/SignInMainPhoto.svg"
import logo from "../../images/Vector.svg"
import icon from "../../images/icon.svg"
import icon_slash from "../../images/icon_slash.svg"
import { emailIsValid, passwordIsValid } from "../../validators/validators";
import { Navigate } from 'react-router-dom';
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const SignIn = (props) => {

    const user = {
        name: "Ross",
        surname: "Max",
        age: 26
    }

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [email, setEmail] = useState('');
    const [isDirtyEmail, setIsDirtyEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [isDirtyPassword, setIsDirtyPassword] = useState(false);

    const firstNameChar = user.name.substring(0, 1).toUpperCase();
    const firstSurnameChar = user.surname.substring(0, 1).toUpperCase();

    let isEmailError = emailIsValid(email)
    let isPasswordError = passwordIsValid(password)

    let isDisabledButton = true;
    if ((isEmailError || isPasswordError) === false) {
        isDisabledButton = false;
    }

    const onSubmit = (data) => {
        data.preventDefault();
        //Чтобы данный метод отработал, полям нужно указать параметр name
        const formData = new FormData(data.target);
        let newData = Object.fromEntries(formData.entries());
        console.log(Object.fromEntries(formData.entries()))

        if (newData.email === "rost090909@gmail.com" && newData.password === "12345") {
            props.onChangeAuth(true);
        }

        setEmail('');
        setIsDirtyEmail(false);

        setPassword('');
        setIsDirtyPassword(false);
    }

    const [open, setOpen] = React.useState(false);


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


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
                            <span>{isDirtyEmail ? isEmailError : ''}</span>
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
                            onClick={handleClick}
                        >LOGIN</button>
                    </div>
                    <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
                action={action}
            />
                </form>
            </div>
        </div>
    )
}

export default SignIn;