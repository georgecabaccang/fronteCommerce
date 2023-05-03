import React, { useState, useEffect } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";

const INPUT_CLASSNAME = "border w-full px-3 py-[0.2em]";

export default function Register() {
    const [email, setEmail] = useState<string | number>("");
    const [password, setPassword] = useState<string | number>("");
    const [confirmPassword, setConfirmPassword] = useState<string | number>("");
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        if (
            email.toString().includes(".co") &&
            email.toString().includes("@") &&
            password &&
            confirmPassword == password
        ) {
            setFormIsValid(true);
            return;
        }
        setFormIsValid(false);
    }, [email, password, confirmPassword]);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("?");
    };
    return (
        <div className="border flex place-content-center py-20 h-[100vh]">
            <div className="border w-[24em] h-[21em] py-3 px-12 text-center">
                <div>Register</div>
                <form
                    onSubmit={submitHandler}
                    className="grid grid-cols-1 gap-3"
                >
                    <div className="grid grid-cols-1 gap-3 text-left">
                        <div>
                            <div>Email:</div>
                            <Input
                                type="email"
                                value={email}
                                className={INPUT_CLASSNAME}
                                setState={setEmail}
                            />
                        </div>
                        <div>
                            <div>Password:</div>
                            <Input
                                type="password"
                                value={password}
                                className={INPUT_CLASSNAME}
                                setState={setPassword}
                            />
                        </div>
                        <div>
                            <div>Confirm Password:</div>
                            <Input
                                type="password"
                                value={confirmPassword}
                                className={INPUT_CLASSNAME}
                                setState={setConfirmPassword}
                            />
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
                            <div>Already Registered?</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
