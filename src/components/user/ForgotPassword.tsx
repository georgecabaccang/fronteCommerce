import { useState, useEffect, FormEvent } from "react";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { resetPasswordRequest } from "../../api/userRequests";
import { AxiosResponse } from "axios";
import Swal from "sweetalert2";

// Regex for email validation
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z]+\.[a-z]{2,3}/;

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (EMAIL_REGEX.test(email)) {
            return setIsDisabled(false);
        }
        return setIsDisabled(true);
    }, [email]);

    const onSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();

        const response = (await resetPasswordRequest(email)) as AxiosResponse;

        if (response.status == 200 && response.data != "user not found") {
            console.log(response.data);
            return Swal.fire({
                icon: "info",
                title: "A Link To Reset Your Password Has Been Sent To Your Email",
                text: "Also Appears in the console in case you didn't use a real email since this is not a legit app. Expires In 5 mins. (For Development Testing Purposes.)",
            });
        }
        if (response.data == "user not found") {
            return Swal.fire({
                icon: "info",
                title: 'A Link To Reset Your Password Has Been Sent To Your "Email"',
                text: "This is just a dummy response in case someone is trying out emails to hack. There is no link Provided.",
            });
        }
    };

    return (
        <div className="flex place-content-center min-h-[80vh]">
            <div className="border rounded shadow-md min-w-[20em] p-10 mt-10">
                <div className="text-center mb-8 font-bold">Fogot Password?</div>
                <form onSubmit={onSubmitHandler}>
                    <div>Enter Email:</div>
                    <Input
                        type="email"
                        value={email}
                        setStateString={setEmail}
                        className="border rounded min-w-full text-sm p-2"
                    />
                    <Button
                        type="submit"
                        name="Submit"
                        className="px-5 py-2 border bg-gray-200 shadow-sm rounded hover:bg-white hover:shadow-md disabled:hover:bg-gray-200 disabled:hover:shadow-sm disabled:text-gray-400 w-full"
                        disabled={isDisabled}
                    />
                </form>
            </div>
        </div>
    );
}
