import React, { useState, useEffect, useContext } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { registerUser } from "../../api/registerUser";
import { UserContext } from "../../providers/UserProvider";
import { Link } from "react-router-dom";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";
import PasswordInputs from "../shared/passwords/PasswordInputs";

const INPUT_CLASSNAME =
    "border-l border-t border-b w-full px-3 py-[0.2em] focus:z-10 block rounded ";
const LOGIN_LINK = "http://localhost:5173/login";

// Regex for email validation
const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isEmailValid, setIsEmailIsValid] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
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

    // Check form validation
    useEffect(() => {
        if (email && password && isEmailValid) {
            return setIsDisabled(false);
        }
        return setIsDisabled(true);
    }, [isEmailValid, password, email]);

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const userDetails = { email: email, password: password };
        const response = await registerUser(userDetails);

        if (response === "user created") {
            const userCredentials = {
                email: email,
                password: password,
            };
            const response = await userContext.login(userCredentials);
            if (response === "OK") {
                setEmailDupe(false);
            }
        }
        return setEmailDupe(true);
    };

    return (
        <div className="flex place-content-center py-20">
            <div className="border min-w-[24em] min-h-[21em] py-3 px-12 text-center">
                <div className="font-bold text-lg">Register</div>
                {emailDupe && <div className="text-red-500 text-sm">Email Already Taken</div>}
                <form onSubmit={submitHandler} className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-1 gap-3 text-left max-w-[17.8em]">
                        <div className="max-w-full">
                            <div>Email:</div>
                            <Input
                                type="email"
                                value={email}
                                className={`${INPUT_CLASSNAME} border rounded`}
                                setStateString={setEmail}
                            />
                            {!isEmailValid && (
                                <span className="text-red-500 text-xs border">
                                    Please enter a valid email address.
                                </span>
                            )}
                        </div>
                        <PasswordInputs
                            inputNew="New Password"
                            inputConfrim="Confirm New Password"
                            setNewPassword={setPassword}
                            setIsDisabled={setIsDisabled}
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            name="Sign Up!"
                            className="px-5 py-2 border bg-blue-400 border-gray-100 rounded hover:bg-gray-300 hover:border-gray-200 disabled:bg-slate-200 w-full"
                            disabled={isDisabled}
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
