import { useState, FormEvent, useEffect } from "react";
import PasswordInputs from "./shared/passwords/PasswordInputs";
import Button from "./shared/Button";
import { changePasswordRequest } from "../api/userRequests";

// TRY TO MAKE THIS A SEPARATE COMPONENT TO BE REUSABLE FOR BOTH CHANGE PASSWORD
// AND REGISTER
// STILL HAS NO OLD PASSWORD, NEW PASSWORD, CONFIRM NEW PASSWORD,  SUBMIT HANDLER

interface IChangePassword {
    email: string;
    user_id: string;
    setChangePasswordShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChangePassword(props: IChangePassword) {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        const passwords = {
            oldPassword: oldPassword,
            newPassword: newPassword,
        };
        const response = await changePasswordRequest(props.email, props.user_id, passwords);
        console.log(response);
    };

    useEffect(() => {
        if (oldPassword && newPassword) {
            return setIsDisabled(false);
        }
        return setIsDisabled(true);
    }, [oldPassword, newPassword]);

    return (
        <div>
            <form onSubmit={submitHandler}>
                <PasswordInputs
                    inputOld={"Old Password"}
                    inputNew={"New Password"}
                    inputConfrim={"Confirm New Password"}
                    setOldPassword={setOldPassword}
                    setNewPassword={setNewPassword}
                    setIsDisabled={setIsDisabled}
                />
                <Button
                    name="Submit"
                    type="submit"
                    disabled={isDisabled}
                    className="border rounded px-2 bg-blue-200 disabled:bg-gray-400"
                />
                <Button
                    name="Cancel"
                    type="button"
                    className="border rounded px-2 bg-blue-200 disabled:bg-gray-400"
                    clickEvent={() => props.setChangePasswordShown(false)}
                />
            </form>
        </div>
    );
}
