import { useState, useEffect, FormEvent, useContext } from "react";
import Button from "../shared/Button";
import PasswordInputs from "../shared/passwords/PasswordInputs";
import { useNavigate, useParams } from "react-router-dom";
import { setNewPasswordRequest } from "../../api/userRequests";
import CryptoJS from "crypto-js";
import { AxiosError, AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { ActiveLinkContext } from "../../providers/ActiveLinkProvider";
import axios from "../../axios";

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [isExpired, setIsExpired] = useState(false);

    const activeLinkContext = useContext(ActiveLinkContext);
    const { user_id, resetToken } = useParams();
    const navigate = useNavigate();

    const onSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();

        if (newPassword) {
            const hashedPassword = CryptoJS.AES.encrypt(
                JSON.stringify(newPassword!),
                import.meta.env.VITE_CRYPTO_PASSWORD_HASHER!
            ).toString();
            if (user_id && resetToken) {
                const response = (await setNewPasswordRequest(
                    user_id,
                    encodeURIComponent(resetToken),
                    hashedPassword
                )) as AxiosResponse;
                if (response.status == 204) {
                    Swal.fire({
                        icon: "success",
                        title: "New Password Set",
                    });
                    activeLinkContext.setActiveLink("/login");
                    return navigate("/login");
                }
                if (response.status == 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Nope. You Can't Hack This.",
                    });
                    return window.close();
                }
                if (response.data == "jwt expired") {
                    return Swal.fire({
                        icon: "error",
                        title: "Link Expired",
                        text: "Please request for a new reset password link.",
                    });
                }
                if (response.data == "Unexpected end of JSON input") {
                    return Swal.fire({
                        icon: "error",
                        title: "Tampered Tokens",
                    });
                }
            }
        }
    };

    const checkIfLinkHasExpired = async () => {
        try {
            const response = await axios.get(
                `/user/reset-token-check/${encodeURIComponent(resetToken!)}`
            );
            if (response.data == "jwt expired") {
                setIsExpired(true);
                return Swal.fire({
                    icon: "error",
                    title: "Link Expired",
                    text: "Please request for a new reset password link.",
                });
            }
            setIsExpired(false);
        } catch (error) {
            if (error instanceof AxiosError) return error.message;
        }
    };

    useEffect(() => {
        checkIfLinkHasExpired();
    }, []);

    useEffect(() => {
        if (newPassword) {
            return setIsDisabled(false);
        }
        return setIsDisabled(true);
    }, [newPassword]);

    return (
        <div className="flex place-content-center items-center min-h-[80vh]">
            {!isExpired ? (
                <div className="border rounded shadow-md p-6 min-h-[12em] min-w-[20em] ">
                    <form onSubmit={onSubmitHandler}>
                        <PasswordInputs
                            inputNew={"New Password"}
                            inputConfrim={"Confirm New Password"}
                            setNewPassword={setNewPassword}
                            setIsDisabled={setIsDisabled}
                        />
                        <div className="mt-3 border">
                            <Button
                                name="Submit"
                                type="submit"
                                disabled={isDisabled}
                                className="min-w-[100%] border rounded bg-gray-200 shadow-sm hover:bg-white hover:shadow-md disabled:hover:shadow-sm disabled:hover:bg-gray-200 disabled:text-gray-500"
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <div>Reset Password Link Expired</div>
            )}
        </div>
    );
}
