import React, { useState, useEffect, useContext } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { registerUser } from "../../api/registerUser";
import { IUserDetails } from "../../types/userRequestTypes";
import { userLogin } from "../../api/loginRequest";
import { UserContext } from "../../providers/UserProvider";
import { Link } from "react-router-dom";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";

const INPUT_CLASSNAME = "border w-full px-3 py-[0.2em]";
const LOGIN_LINK = "http://localhost:5173/login";

// Regex for at least one special character, min length of 9
const PASSWORD_REGEX = /^(?=.{8,})(?=.*[a-z])(?=.*[!@#$%^()&+=*]).*$/;
// Regex for email validation
const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isEmailValid, setIsEmailIsValid] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [emailDupe, setEmailDupe] = useState(false);

    const userContext = useContext(UserContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    // Check regex for email
    useEffect(() => {
        if (email === "") return;
        if (EMAIL_REGEX.test(email)) {
            return setIsEmailIsValid(true);
        }
        return setIsEmailIsValid(false);
    }, [email]);

    // Check regex for password
    useEffect(() => {
        if (password === "") return;
        if (PASSWORD_REGEX.test(password)) {
            return setIsValidPassword(true);
        }
        return setIsValidPassword(false);
    }, [password, confirmPassword]);

    // Check if passwords match
    useEffect(() => {
        if (confirmPassword === "") return;
        if (password == confirmPassword) {
            return setPasswordsMatch(true);
        }
        return setPasswordsMatch(false);
    }, [password, confirmPassword]);

    // Check form validation
    useEffect(() => {
        if (
            email &&
            password &&
            confirmPassword &&
            isEmailValid &&
            isValidPassword &&
            passwordsMatch
        ) {
            return setFormIsValid(true);
        }
        return setFormIsValid(false);
    }, [isEmailValid, isValidPassword, passwordsMatch]);

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const userDetails: IUserDetails = { email: email, password: password };
        const response = await registerUser(userDetails);

        if (response === "email is taken") return setEmailDupe(true);

        if (response === "user created") {
            const userCredentials: IUserDetails = {
                email: email,
                password: password,
            };
            const response = await userLogin(userCredentials);
            if (response == "no tokens") {
                return console.log("Something went wrong on our side. Please try again");
            }
            const accessToken = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            userContext.setAccessToken(accessToken);
            userContext.setRefreshToken(refreshToken);
        }
    };
    return (
        <div className="flex place-content-center py-20">
            {emailDupe && <div>Email Already Taken</div>}
            <div className="border min-w-[24em] min-h-[21em] py-3 px-12 text-center">
                <div className="font-bold text-lg">Register</div>
                <form onSubmit={submitHandler} className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-1 gap-3 text-left">
                        <div>
                            <div>Email:</div>
                            <Input
                                type="email"
                                value={email}
                                className={INPUT_CLASSNAME}
                                setStateString={setEmail}
                            />
                            {!isEmailValid && (
                                <span className="text-red-500 text-xs">
                                    Please enter a valid email address.
                                </span>
                            )}
                        </div>
                        <div>
                            <div>Password:</div>
                            <Input
                                type="password"
                                value={password}
                                className={INPUT_CLASSNAME}
                                setStateString={setPassword}
                            />
                            {!isValidPassword && (
                                <span className="text-red-500 text-xs">
                                    Password must be at least 8 characters long and contain at least
                                    one special character.
                                </span>
                            )}
                        </div>
                        <div>
                            <div>Confirm Password:</div>
                            <Input
                                type="password"
                                value={confirmPassword}
                                className={INPUT_CLASSNAME}
                                setStateString={setConfirmPassword}
                            />
                            {!passwordsMatch && (
                                <span className="text-red-500 text-xs">Passwords must match.</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            name="Sign Up!"
                            className="px-5 py-2 border bg-blue-400 border-gray-100 rounded hover:bg-gray-300 hover:border-gray-200 disabled:bg-slate-200 w-full"
                            disabled={!formIsValid}
                        />
                        <div className="text-sm mt-2">
                            <Link
                                to={"/login"}
                                onClick={() => activeLinkContext.setActiveLink(LOGIN_LINK)}
                            >
                                Already Registered?
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
