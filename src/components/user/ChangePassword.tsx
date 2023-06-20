import { useState, FormEvent, useEffect } from "react";
import PasswordInputs from "../shared/passwords/PasswordInputs";
import Button from "../shared/Button";
import { changePasswordRequest } from "../../api/userRequests";
import Swal from "sweetalert2";

// TRY TO MAKE THIS A SEPARATE COMPONENT TO BE REUSABLE FOR BOTH CHANGE PASSWORD
// AND REGISTER
// STILL HAS NO OLD PASSWORD, NEW PASSWORD, CONFIRM NEW PASSWORD,  SUBMIT HANDLER

interface IChangePassword {
    email: string;
    user_id: string;
    setForm: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChangePassword(props: IChangePassword) {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [correctOldPasasword, setCorrectOldPassword] = useState(true);

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        const passwords = {
            oldPassword: oldPassword,
            newPassword: newPassword,
        };
        const response = await changePasswordRequest(props.email, props.user_id, passwords);
        if (response == "incorrect password") {
            return setCorrectOldPassword(false);
        }
        if (response == "password changed") {
            props.setForm("");
            Swal.fire({
                icon: "success",
                title: "Password Changed",
            });
            setCorrectOldPassword(true);
        }
        return setCorrectOldPassword(true);
    };

    useEffect(() => {
        if (oldPassword && newPassword) {
            return setIsDisabled(false);
        }
        return setIsDisabled(true);
    }, [oldPassword, newPassword]);

    return (
        <div>
            <div className="text-center mb-2 font-bold">Change Password</div>
            {!correctOldPasasword && (
                <div className="text-red-500 text-center">Incorrect Old Password</div>
            )}

            <form onSubmit={submitHandler}>
                <PasswordInputs
                    inputOld={"Old Password"}
                    inputNew={"New Password"}
                    inputConfrim={"Confirm New Password"}
                    setOldPassword={setOldPassword}
                    setNewPassword={setNewPassword}
                    setIsDisabled={setIsDisabled}
                />
                <div className="grid grid-cols-2 gap-3 mt-3">
                    <Button
                        name="Submit"
                        type="submit"
                        disabled={isDisabled}
                        className="border rounded bg-gray-200 shadow-sm hover:bg-white hover:shadow-md disabled:hover:shadow-sm disabled:hover:bg-gray-200 disabled:text-gray-500"
                    />
                    <Button
                        name="Cancel"
                        type="button"
                        className="border rounded bg-gray-200 disabled:bg-gray-400"
                        clickEvent={() => props.setForm("")}
                    />
                </div>
            </form>
        </div>
    );
}
