import React, { useState, useEffect, useContext } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { userLogin } from "../../api/loginRequest";
import { UserContext } from "../../providers/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";

const INPUT_CLASSNAME = "border w-full px-3 py-[0.2em] rounded";
const SIGN_UP_LINK = "http://localhost:5173/sign-up";
const SHOW_EYE_ICON = "/images/png/showEyeIcon.png";
const NOT_SHOW_EYE_ICON = "/images/png/notShowEyeIcon.png";

// Regex for email validation
const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [password, setPassword] = useState<string>("");
    const [formIsValid, setFormIsValid] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);
    const [showPassword, setShowPassword] = useState("password");

    const userContext = useContext(UserContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (EMAIL_REGEX.test(email)) {
            setIsEmailValid(true);
            return;
        }
        return setIsEmailValid(false);
    }, [email]);

    useEffect(() => {
        if (email && isEmailValid && password) {
            setFormIsValid(true);
            return;
        }
        setFormIsValid(false);
    }, [email, isEmailValid, password]);

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const userCredentials = {
            email: email,
            password: password,
        };
        const userDetails = await userLogin(userCredentials);
    
        if (localStorage.getItem("token")) {
            const accessToken = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            userContext.setAccessToken(accessToken);
            userContext.setRefreshToken(refreshToken);
            userContext.setUserProfileDetails(userDetails);

            setFailedLogin(false);
            if (userContext.loginFrom == "login") return navigate("/");
            if (userContext.loginFrom == "shop") return window.history.go(-1);
        }
        return setFailedLogin(true);
    };

    const showPasswordHandler = () => {
        if (showPassword == "password") return setShowPassword("text");
        return setShowPassword("password");
    };

    return (
        <div className="flex place-content-center py-20">
            <div className="border min-w-[24em] min-h-[17.5em] py-3 px-12 text-center">
                <div className="font-bold text-lg">Login</div>
                {failedLogin && (
                    <div className="text-red-500  text-sm">
                        Invalid Email or Password. Please Try Again.
                    </div>
                )}
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
                        </div>
                        <div>
                            <div>Password:</div>
                            <div className="flex">
                                <Input
                                    type={showPassword}
                                    value={password}
                                    className={INPUT_CLASSNAME}
                                    setStateString={setPassword}
                                />
                                <Button
                                    type="button"
                                    className="inline-flex flex-shrink-0 justify-center items-center rounded-r-md border-r border-t border-b px-1"
                                    image={
                                        showPassword == "text" ? NOT_SHOW_EYE_ICON : SHOW_EYE_ICON
                                    }
                                    imageProps="object-contain h-[1.2em] mr-1"
                                    clickEvent={showPasswordHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            name="Login"
                            className="px-5 py-2 border bg-blue-400 border-gray-100 rounded hover:bg-gray-300 hover:border-gray-200 disabled:bg-slate-200 w-full"
                            disabled={!formIsValid}
                        />
                        <div className="text-sm mt-2">
                            <div>Forgot Password?</div>
                            <Link
                                to={"/sign-up"}
                                onClick={() => activeLinkContext.setActiveLink(SIGN_UP_LINK)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
