import React, { useState, useEffect, useContext } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { userLogin } from "../../api/loginRequest";
import { UserContext } from "../../providers/UserProvider";
import { Link, redirect, useParams } from "react-router-dom";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";

const INPUT_CLASSNAME = "border w-full px-3 py-[0.2em]";
const SIGN_UP_LINK = "http://localhost:5173/sign-up";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [formIsValid, setFormIsValid] = useState(false);

    const userContext = useContext(UserContext);
    const activeLinkContext = useContext(ActiveLinkContext);

    const { id } = useParams();

    useEffect(() => {
        if (email.toString().includes(".co") && email.toString().includes("@") && password) {
            setFormIsValid(true);
            return;
        }
        setFormIsValid(false);
    }, [email, password]);

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const userCredentials = {
            email: email,
            password: password,
        };
        const response = await userLogin(userCredentials);
        if (response == "no tokens") {
            return console.log("Something went wrong on our side. Please try again");
        }
        const userEmail = localStorage.getItem("userEmail");
        const accessToken = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        userContext.setUserEmail(userEmail);
        userContext.setAccessToken(accessToken);
        userContext.setRefreshToken(refreshToken);

        if (userContext.loginFrom == "login") return redirect("/");
        if (userContext.loginFrom == "shop") return window.history.go(-1);

        console.log(id);
    };

    return (
        <div className="flex place-content-center py-20">
            <div className="border w-[24em] h-[17.5em] py-3 px-12 text-center">
                <div>Login</div>
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
                            <Input
                                type="password"
                                value={password}
                                className={INPUT_CLASSNAME}
                                setStateString={setPassword}
                            />
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
