import { useState, useEffect } from "react";
import Input from "./shared/Input";
import Button from "./shared/Button";

const INPUT_CLASSNAME =
    "border-l border-t border-b w-full px-3 py-[0.2em] focus:z-10 block rounded ";

const SHOW_EYE_ICON = "/images/png/showEyeIcon.png";
const NOT_SHOW_EYE_ICON = "/images/png/notShowEyeIcon.png";

const PASSWORD_REGEX = /^(?=.{8,})(?=.*[a-z])(?=.*[!@#$%^()&+=*]).*$/;

// TRY TO MAKE THIS A SEPARATE COMPONENT TO BE REUSABLE FOR BOTH CHANGE PASSWORD
// AND REGISTER
// STILL HAS NO OLD PASSWORD, NEW PASSWORD, CONFIRM NEW PASSWORD,  SUBMIT HANDLER

export default function ChangePassword() {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [showConfirmPassword, setShowConfirmPassword] = useState("password");
    const [showPassword, setShowPassword] = useState("password");

    const showPasswordHandler = () => {
        if (showPassword == "password") return setShowPassword("text");
        return setShowPassword("password");
    };

    const showConfirmPasswordHandler = () => {
        if (showConfirmPassword == "password") return setShowConfirmPassword("text");
        return setShowConfirmPassword("password");
    };

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

    return (
        <div>
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
                        image={showPassword == "text" ? NOT_SHOW_EYE_ICON : SHOW_EYE_ICON}
                        imageProps="object-contain h-[1.2em] mr-1"
                        clickEvent={showPasswordHandler}
                    />
                </div>

                {!isValidPassword && (
                    <span className="text-red-500 text-xs break-normal">
                        Password must be at least 8 characters long and contain at least one special
                        character.
                    </span>
                )}
            </div>
            <div>
                <div>Confirm Password:</div>
                <div className="flex ">
                    <Input
                        type={showConfirmPassword}
                        value={confirmPassword}
                        className={INPUT_CLASSNAME}
                        setStateString={setConfirmPassword}
                    />
                    <Button
                        type="button"
                        className="inline-flex flex-shrink-0 justify-center items-center rounded-r-md border-r border-t border-b px-1"
                        image={showConfirmPassword == "text" ? NOT_SHOW_EYE_ICON : SHOW_EYE_ICON}
                        imageProps="object-contain h-[1.2em] mr-1"
                        clickEvent={showConfirmPasswordHandler}
                    />
                </div>

                {!passwordsMatch && (
                    <span className="text-red-500 text-xs">Passwords must match.</span>
                )}
            </div>
        </div>
    );
}
