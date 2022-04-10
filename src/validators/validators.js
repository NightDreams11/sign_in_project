export const emailIsValid = (email) => {
    const regex = /^[^.\-\/_+\s][a-zA-Z0-9+]*(((\.|-|_|\/)[a-zA-Z0-9])|[a-zA-Z0-9])*@([a-zA-Z0-9]|[a-zA-Z0-9]-)+\.[a-zA-Z0-9-]+((\.([a-zA-Z]+)$|([a-zA-Z])+$))/
    if (regex.test(email)) {
        return false;
    } else {
        return "Please use numbers and latin characters. Format х@х.хх";
    }
}

export const passwordIsValid = (password) => {
    const regex = /^[a-zA-Z0-9]+[a-zA-Z0-9]$/
    if (regex.test(password)) {
        return false;
    } else {
        return 'Use only numbers and latin characters'
    }
}