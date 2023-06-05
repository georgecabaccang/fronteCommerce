import React, { useState, useEffect, useContext } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { UserContext } from "../../providers/UserProvider";
import { Link } from "react-router-dom";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";
import Inputs from "../shared/passwords/Inputs";

const INPUT_CLASSNAME = "border w-full px-3 py-[0.2em] rounded";
const SIGN_UP = "sign-up";

// Regex for email validation
const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [password, setPassword] = useState<string>("");
    const [formIsValid, setFormIsValid] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);

    const userContext = useContext(UserContext);
    const activeLinkContext = useContext(ActiveLinkContext);

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
        const response = await userContext.login(userCredentials);
        if (response == "something's not right") {
            return setFailedLogin(true);
        }
        return setFailedLogin(false);
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

                        <Inputs label={"Password"} setterPassword={setPassword} />
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
                                onClick={() => activeLinkContext.setActiveLink(SIGN_UP)}
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
