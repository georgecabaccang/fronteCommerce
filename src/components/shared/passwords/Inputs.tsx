import React, { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";

interface IInputs {
    label: string;
    setterPassword: React.Dispatch<React.SetStateAction<string>>;
    isValidPassword?: boolean;
    setIsValidPassword?: React.Dispatch<React.SetStateAction<boolean>>;
    passwordsMatch?: boolean;
}

const PASSWORD_REGEX = /^(?=.{8,})(?=.*[a-z])(?=.*[!@#$%^()&+=*]).*$/;

const INPUT_CLASSNAME =
    "border-l border-t border-b w-full px-3 py-[0.2em] focus:z-10 block rounded ";

const SHOW_EYE_ICON = "/images/png/showEyeIcon.png";
const NOT_SHOW_EYE_ICON = "/images/png/notShowEyeIcon.png";

export default function Inputs(props: IInputs) {
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState("password");

    const showPasswordHandler = () => {
        if (showPassword == "password") return setShowPassword("text");
        return setShowPassword("password");
    };

    // Check regex for password
    useEffect(() => {
        props.setterPassword(password);
        if (password === "") return;
        if (props.label === "New Password") {
            if (PASSWORD_REGEX.test(password)) {
                return props.setIsValidPassword!(true);
            }
            return props.setIsValidPassword!(false);
        }
    }, [password]);

    return (
        <div>
            <div>{props.label}:</div>
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
                    image={showPassword == "text" ? NOT_SHOW_EYE_ICON : SHOW_EYE_ICON}
                    imageProps="object-contain h-[1.2em] mr-1"
                    clickEvent={showPasswordHandler}
                />
            </div>

            {props.label != "Password" && (
                <div>
                    {props.label === "Confirm New Password"
                        ? !props.passwordsMatch &&
                          password && (
                              <span className="text-red-500 text-xs">Passwords must match.</span>
                          )
                        : !props.isValidPassword &&
                          password &&
                          props.label !== "Old Password" && (
                              <span className="text-red-500 text-xs break-normal">
                                  Password must be at least 8 characters long and contain at least
                                  one special character.
                              </span>
                          )}
                </div>
            )}
        </div>
    );
}
