import React, { useState, useEffect } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";

const INPUT_CLASSNAME = "border w-full px-3 py-[0.2em]";

export default function Login() {
    const [username, setUsername] = useState<string | number>("");
    const [password, setPassword] = useState<string | number>("");
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        if (username && password) {
            setFormIsValid(true);
            return;
        }
        setFormIsValid(false);
    }, [username, password]);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("?");
    };
    return (
        <div className="border flex place-content-center py-20 h-[100vh]">
            <div className="border w-[24em] h-[17.5em] py-3 px-12 text-center">
                <div>Login</div>
                <form
                    onSubmit={submitHandler}
                    className="grid grid-cols-1 gap-3"
                >
                    <div className="grid grid-cols-1 gap-3 text-left">
                        <div>
                            <div>Username:</div>
                            <Input
                                type="text"
                                className={INPUT_CLASSNAME}
                                setState={setUsername}
                            />
                        </div>
                        <div>
                            <div>Password:</div>
                            <Input
                                type="text"
                                className={INPUT_CLASSNAME}
                                setState={setPassword}
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
                            <div>Register</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
