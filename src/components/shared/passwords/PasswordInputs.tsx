import React, { useEffect, useState } from "react";
import Inputs from "./Inputs";

interface IPasswords {
    inputOld?: string;
    inputNew: string;
    inputConfrim: string;
    setOldPassword?: React.Dispatch<React.SetStateAction<string>>;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PasswordInputs(props: IPasswords) {
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    // Check if passwords match
    useEffect(() => {
        if (newPassword === confirmNewPassword) {
            return setPasswordsMatch(true);
        }
        return setPasswordsMatch(false);
    }, [newPassword, confirmNewPassword]);

    // Pass password back to parent component when passwords match
    useEffect(() => {
        if (passwordsMatch && isValidPassword) {
            props.setNewPassword(newPassword);
            props.setIsDisabled(false);
            return;
        }
        return props.setIsDisabled(true);
    }, [passwordsMatch, isValidPassword]);
    return (
        <div>
            {props.inputOld && (
                <Inputs label={props.inputOld} setterPassword={props.setOldPassword!} />
            )}
            {props.inputNew && (
                <Inputs
                    label={props.inputNew}
                    setterPassword={setNewPassword}
                    isValidPassword={isValidPassword}
                    setIsValidPassword={setIsValidPassword}
                />
            )}

            {props.inputConfrim && (
                <Inputs
                    label={props.inputConfrim}
                    setterPassword={setConfirmNewPassword}
                    passwordsMatch={passwordsMatch}
                />
            )}
        </div>
    );
}
